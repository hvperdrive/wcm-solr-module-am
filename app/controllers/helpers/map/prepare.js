require("rootpath")();
var _ = require("lodash");

var methods = {
    upsert: "PUT",
    remove: "DELETE"
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
            authorization: "Bearer " + data.accessToken
        },
        json: true,
        body: {
            app: "antwerpenmorgen",
            summary: data.project.fields.intro.nl,
            thumbnail: "",
            languages: "nl",
            keywords: _.map(data.project.meta.taxonomy.tags, function(tag) {
                return tag.label.nl.toLowerCase();
            }).join(","),
            groupfield: "antwerpen morgen",
            id: data.project.uuid,
            categories: [],
            title: data.project.fields.title.nl,
            body: data.project.fields.body.nl,
            url: data.variables.currentDomain + "projects/" + data.project.meta.slug.nl
        }
    };

    // Add ID if we want to remove the document
    if (data.method === "remove") {
        data.options.url += "/" + data.project.uuid;
    }

    return data;
};
