var variablesHelper = require("./helpers/variables");

module.exports = function(app, hooks, info) {
	variablesHelper.set(info);

	// Require controllers to start listeners
	require("./controllers");

	// Setup routes
	require("./routes")(app);
};
