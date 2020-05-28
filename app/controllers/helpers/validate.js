const { get } = require("lodash");

module.exports = (data, variables, options = { isRemove: false }) => {
	const dgvContext = {
		"dgv-website": true,
	};

	const isRingpark = (
		(get(data, "meta.contentType.meta.safeLabel") || "").toLowerCase() === "ringparken" ||
		get(data, "meta.contentType") === variables.ringparkCT
	);

	// Check if we need to call the solr API based on safeLabel of CT
	return {
		context: isRingpark ? dgvContext : get(data, "fields.medium"),
		isValidProject: (
			(options.isRemove || get(data, "meta.published") === true) &&
			(
				(get(data, "meta.contentType.meta.safeLabel") || "").toLowerCase() === "projecten" ||
				get(data, "meta.contentType") === variables.projectCT ||
				isRingpark
			)
		),
		isToBeRemoved: (
			!isRingpark &&
			(
				get(data, "fields.medium.dgv-website") ||
				!get(data, "fields.medium.website") ||
				get(data, "meta.published") === false
			)
		),
		isToBeRemovedDGV: (
			!isRingpark &&
			(
				!get(data, "fields.medium.dgv-website") ||
				get(data, "meta.published") === false
			)
		),
	};
};
