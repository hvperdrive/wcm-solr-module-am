const { get } = require("lodash");

module.exports = (data, variables) => {
	// Check if we need to call the solr API based on safeLabel of CT
	return get(data, "meta.published") === true ||
		get(data, "meta.contentType") === variables.projectCT;
};
