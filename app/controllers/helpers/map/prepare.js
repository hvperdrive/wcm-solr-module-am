const { map, get } = require("lodash");
const htmlToText = require("html-to-text");

const methods = {
	upsert: "PUT",
	remove: "DELETE",
};

const htmlToTextOptions = {
	ignoreHref: true,
	ignoreImage: true,
	preserveNewlines: true,
};

module.exports = (data) => {
	// Set request options
	data.options = {
		method: methods[data.method],
		// Do not add trailing id, request will fail
		url: data.variables.searchApiDomain + "astad/search/v1/documents", // id can/should be added here
		headers: {
			"Accept": "application/json",
			"Content-Type": "application/json",
			authorization: "Bearer " + get(data, "accessToken"),
		},
		json: true,
		body: {
			app: "antwerpenmorgen",
			summary: htmlToText.fromString(get(data, "project.fields.intro.nl", ""), htmlToTextOptions),
			thumbnail: "",
			languages: "nl",
			keywords: map(get(data, "project.meta.taxonomy.tags", []), (tag) => {
				return tag.label.nl.toLowerCase();
			}).join(","),
			groupfield: "antwerpen morgen",
			id: get(data, "project.uuid"),
			categories: [],
			title: get(data, "project.fields.title.nl", ""),
			body: htmlToText.fromString(get(data, "project.fields.body.nl", ""), htmlToTextOptions),
			url: data.variables.currentDomain + "projecten/" + get(data, "project.meta.slug.nl", ""),
		},
	};

	// Add ID if we want to remove the document
	if (data.method === "remove") {
		data.options.url += "/" + get(data, "project.uuid", "");
	}

	return data;
};
