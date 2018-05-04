var _ = require("lodash");

module.exports = function(data) {
	// Check if we need to call the solr API based on safeLabel of CT
	return (_.get(data, "meta.contentType.meta.safeLabel") && data.meta.contentType.meta.safeLabel.toLowerCase() === "projecten");
};
