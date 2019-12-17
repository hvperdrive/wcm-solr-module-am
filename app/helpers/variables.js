const { get } = require("lodash");
const { variables: variablesHelper } = require("@wcm/module-helper");

let packageInfo;

const checkUrl = (url) => {
	// Check if last character is a /
	if (url.slice(-1) !== "/") {
		// Add / at the end
		url = url + "/";
	}

	return url;
};

const validateFields = (data) => {
	const fields = [
		"searchApiDomain",
		"currentDomain",
		"consumerKey",
		"consumerSecret",
		"projectCT",
	];
	let validFields = true;

	fields.forEach((field) => {
		if (!~Object.keys(data).indexOf(field) || data[field] === "") {
			validFields = false;
		}
	});

	return validFields;
};

const checkVariables = (response) => new Promise((resolve, reject) => {
	// Check if solr items are defined
	if (get(response, "solr.variables") && validateFields(response.solr.variables)) {
		response = response.solr.variables;
		// Validate url's
		response.currentDomain = checkUrl(response.currentDomain);
		response.searchApiDomain = checkUrl(response.searchApiDomain);

		return resolve(response);
	}

	return reject("Unable to get variables");
});

module.exports = () => new Promise((resolve, reject) => {
	if (!packageInfo) {
		throw "No package info available!";
	}

	// Get variables from cms
	variablesHelper
		.getAll(packageInfo.name, packageInfo.version)
		.then((response) => checkVariables(response))
		.then(resolve)
		.catch(reject);
});

module.exports.set = (info) => packageInfo = info;

module.exports.get = () => packageInfo;
