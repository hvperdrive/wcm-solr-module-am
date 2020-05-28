const { get, cloneDeep } = require("lodash");

const helpers = require("./helpers");
const variableHelper = require("../helpers/variables");
const { remove } = require("./remove");

module.exports = (data) => {
	const content = get(data, "toJSON", false) ? data.toJSON() : cloneDeep(data);

	// Get the latest variables
	variableHelper()
		.then((variables) => {
			const validated = helpers.validate(content, variables);

			if (!validated.isValidProject) {
				throw { log: false };
			}

			if (validated.isToBeRemoved && validated.isToBeRemovedDGV) {
				remove(content).catch(() => console.log("remove of updated item failed", get(content, "id")));  // eslint-disable-line
				throw { log: false };
			}

			if (validated.isToBeRemoved) {
				remove(content, 'am').catch(() => console.log("remove of updated item failed", get(content, "id")));  // eslint-disable-line
			}

			if (validated.isToBeRemovedDGV) {
				remove(content, 'dgv').catch(() => console.log("remove of updated item failed", get(content, "id")));  // eslint-disable-line
			}

			return variables;
		})
		.then((variables) => {
			const media = helpers.validate(content, variables).context;

			return {
				variables: variables,
				context: media["dgv-website"] ? "dgv" : "am",
			};
		})
		.then((vars) => helpers.map.init(content, vars.variables, vars.context, "upsert")) // Set start object
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
