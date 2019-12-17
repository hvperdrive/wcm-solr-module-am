const helpers = require("./helpers");
const variableHelper = require("../helpers/variables");

module.exports = (data) => {
	// Check the CT
	if (!helpers.validate(data)) {
		return;
	}

	// Get the latest variables
	variableHelper()
		.then((variables) => helpers.map.init(data, variables, "upsert")) // Set start object
		.then(helpers.token)
		.then(helpers.map.taxonomy)
		.then(helpers.map.prepare)
		.then(helpers.request)
		.catch((err) => console.log("Oh ooh...", err)); // eslint-disable-line no-console
};
