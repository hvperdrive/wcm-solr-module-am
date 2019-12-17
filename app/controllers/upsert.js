require("rootpath")();
var Helpers = require("./helpers");
var VariableHelper = require("../helpers/variables");

module.exports = function(data) {
	if (Helpers.validate(data)) { // Check the CT
		// Get the latest variables
		VariableHelper()
			.then(function onSuccess(variables) {
				return Helpers.map.init(data, variables, "upsert"); // Set start object
			})
			.then(Helpers.token)
			.then(Helpers.map.taxonomy)
			.then(Helpers.map.prepare)
			.then(Helpers.request)
			.catch(function(err) {
				console.log("Oh ooh...", err); // eslint-disable-line no-console
			});
	}
};
