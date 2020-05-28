const { get, cloneDeep } = require("lodash");
const helpers = require("./helpers");
const VariableHelper = require("../helpers/variables");
const { emitter } = require("@wcm/module-helper");

const remove = module.exports.remove = (data, medium) => {
	const content = get(data, "toJSON", false) ? data.toJSON() : cloneDeep(data);

	// Get the latest variables
	return VariableHelper()
		.then((variables) => {
			const validated = helpers.validate(data, variables, { isRemove: true });

			if (!validated.isValidProject) {
				throw { log: false };
			}

			return variables;
		})
		.then((variables) => {
			const media = helpers.validate(content, variables).context;
			let context = medium;

			if (!medium) {
				context = media["dgv-website"] ? "dgv" : "am";
			}

			return {
				variables,
				context,
			};
		})
		.then((vars) => helpers.map.init(content, vars.variables, vars.context, "remove")) // Set start object
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
