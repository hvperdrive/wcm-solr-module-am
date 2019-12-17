const request = require("request");
const { isObject } = require("lodash");
const ErrorHandler = require("./error");

module.exports = (data) => new Promise((resolve, reject) => {
	request(data.options, (err, resp, body) => {
		if (!(resp.hasOwnProperty("statusCode") && resp.statusCode === 200 && isObject(body) && body.hasOwnProperty("success") && body.success)) {
			// This is not good, save error
			ErrorHandler(body, resp.statusCode, data.options);

			return reject(err || body || resp);
		}

		data.request = body.success;

		resolve(data);
	});
});
