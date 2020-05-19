const { get } = require("lodash");

module.exports = (data, variables, options = { isRemove: false }) => {
	// Check if we need to call the solr API based on safeLabel of CT
	return (
		(options.isRemove || get(data, "meta.published") === true) &&
		(options.isRemove || get(data, "fields.medium.website")) &&
		((get(data, "meta.contentType.meta.safeLabel") || "").toLowerCase() === "projecten" ||
			get(data, "meta.contentType") === variables.projectCT)
	);
};
