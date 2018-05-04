require("rootpath")();
var _ = require("lodash");
var htmlToText = require("html-to-text");

var methods = {
	upsert: "PUT",
	remove: "DELETE",
};

var htmlToTextOptions = {
	ignoreHref: true,
	ignoreImage: true,
	preserveNewlines: true,
};

module.exports = function(data) {
	// Set request options
	data.options = {
		method: methods[data.method],
		// Do not add trailing id, request will fail
		url: data.variables.searchApiDomain + "astad/search/v1/documents", // id can/should be added here
		headers: {
			"Accept": "application/json",
			"Content-Type": "application/json",
			authorization: "Bearer " + data.accessToken,
		},
		json: true,
		body: {
			app: "antwerpenmorgen",
			summary: htmlToText.fromString(data.project.fields.intro.nl, htmlToTextOptions),
			thumbnail: "",
			languages: "nl",
			keywords: _.map(data.project.meta.taxonomy.tags, function(tag) {
				return tag.label.nl.toLowerCase();
			}).join(","),
			groupfield: "antwerpen morgen",
			id: data.project.uuid,
			categories: [],
			title: data.project.fields.title.nl,
			body: htmlToText.fromString(data.project.fields.body.nl || "", htmlToTextOptions),
			url: data.variables.currentDomain + "projecten/" + data.project.meta.slug.nl,
		},
	};

	// Add ID if we want to remove the document
	if (data.method === "remove") {
		data.options.url += "/" + data.project.uuid;
	}

	return data;
};
