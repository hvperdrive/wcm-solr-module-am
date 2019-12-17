var _ = require("lodash");
var Q = require("q");
var VariableHelper = require("@wcm/module-helper").variables;

var packageInfo;

var checkUrl = function(url) {
	// Check if last character is a /
	if (url.slice(-1) !== "/") {
		// Add / at the end
		url = url + "/";
	}

	return url;
};

var validateFields = function(data) {
	var fields = [
		"searchApiDomain",
		"currentDomain",
		"consumerKey",
		"consumerSecret",
	];
	var validFields = true;

	fields.forEach(function(field) {
		if (!~Object.keys(data).indexOf(field) || data[field] === "") {
			validFields = false;
		}
	});

	return validFields;
};

var checkVariables = function(response) {
	var prom = Q.defer();

	// Check if solr items are defined
	if (_.get(response, "solr.variables") && validateFields(response.solr.variables)) {
		response = response.solr.variables;
		// Validate url's
		response.currentDomain = checkUrl(response.currentDomain);
		response.searchApiDomain = checkUrl(response.searchApiDomain);

		prom.resolve(response);
	} else {
		prom.reject("Unable to get variables");
	}

	return prom.promise;
};

module.exports = function() {
	if (!packageInfo) {
		throw "No package info available!";
	}

	var prom = Q.defer();

	// Get variables from cms
	VariableHelper
		.getAll(packageInfo.name, packageInfo.version)
		.then(function onSuccess(response) {
			return checkVariables(response);
		})
		.then(function onSuccess(response) {
			prom.resolve(response);
		})
		.catch(function onError(responseError) {
			prom.reject(responseError);
		});

	return prom.promise;
};

module.exports.set = function set(info) {
	packageInfo = info;
};

module.exports.get = function get() {
	return packageInfo;
};
