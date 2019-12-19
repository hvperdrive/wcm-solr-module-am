const variablesHelper = require("./helpers/variables");

module.exports = (app, hooks, info) => {
	variablesHelper.set(info);

	// Require controllers to start listeners
	require("./controllers");

	// Setup routes
	require("./routes")(app);
};
