require("rootpath")();

const { get } = require("lodash");
const uuid = require("node-uuid");
const ErrorModel = require("app/models/errorLog");

module.exports = (body, code, options) => {
	if (get(body, "msgs[0]")) {
		body = body.msgs[0];
	}

	return ErrorModel
		.create({
			type: "module-solr",
			title: "Indexing item in Solr",
			code: code,
			error: body,
			requestData: options,
			identifier: uuid.v1(),
		});
};
