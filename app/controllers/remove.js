const helpers = require("./helpers");
const VariableHelper = require("../helpers/variables");
const { emitter } = require("@wcm/module-helper");

emitter.on("content.removed", (data) => {
	if (helpers.validate(data)) { // Check the CT
		return;
	}

	// Get the latest variables
	VariableHelper()
		.then((variables) => helpers.map.init(data, variables, "remove")) // Set start object
		.then(helpers.token)
		.then(helpers.map.taxonomy)
		.then(helpers.map.prepare)
		.then(helpers.request)
		.catch((err) => console.log("Oh ooh...", err)); // eslint-disable-line no-console
});
