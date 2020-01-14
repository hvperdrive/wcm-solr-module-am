const { get } = require("lodash");
const helpers = require("./helpers");
const VariableHelper = require("../helpers/variables");
const { emitter } = require("@wcm/module-helper");

const remove = (data) => {
	const content = get(data, "toJSON", false) ? data.toJSON() : data;
	// Get the latest variables

	VariableHelper()
		.then((variables) => {
			if (!helpers.validate(content, variables, { isRemove: true })) {
				console.log("validation failed");
				throw { log: false };
			}

			return variables;
		})
		.then((variables) => helpers.map.init(content, variables, "remove")) // Set start object
		.then(helpers.token)
		.then(helpers.map.taxonomy)
		.then(helpers.map.prepare)
		.then(helpers.request)
		.catch((err) => {
			if (err && err.log === false) {
				return;
			}

			console.log("Oh ooh...", err); // eslint-disable-line no-console
		});
};

emitter.on("content.unpublished", remove);
emitter.on("content.removed", remove);
