const { isObject } = require("lodash");
const request = require("request");

module.exports = (data) => new Promise((resolve, reject) => {
	const options = {
		method: "POST",
		url: data.variables.searchApiDomain + "astad/search/v1/oauth2/token",
		form: {
			client_id: data.variables.consumerKey, // eslint-disable-line camelcase
			client_secret: data.variables.consumerSecret, // eslint-disable-line camelcase
			grant_type: "client_credentials", // eslint-disable-line camelcase
		},
		json: true,
	};

	request(options, (err, resp, body) => {
		if (resp.statusCode === 200 && isObject(body) && body.hasOwnProperty("access_token") && body.access_token !== "") {
			data.accessToken = body.access_token;
			return resolve(data);
		}

		reject("Unable to obtain an access token");
	});
});
