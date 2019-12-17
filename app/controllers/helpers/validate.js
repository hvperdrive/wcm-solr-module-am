const { get } = require("lodash");

module.exports = (data) => {
	// Check if we need to call the solr API based on safeLabel of CT
	return get(data, "meta.contentType.meta.safeLabel") && data.meta.contentType.meta.safeLabel.toLowerCase() === "projecten";
};
