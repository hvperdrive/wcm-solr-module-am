require("rootpath")();
var expect = require("chai").expect;
var mockery = require("mockery");

describe("Map prepare helper", function() {
    beforeEach(function() {
        mockery.enable({
            warnOnUnregistered: false,
            useCleanCache: true
        });

        mockery.registerMock("app/models/taxonomy", module.exports = {});
    });

    afterEach(function() {
        mockery.deregisterAll();
        mockery.resetCache();
    });

    it("Prepare data for POST/PUT request", function(done) {
        var MapHelper = require("app/controllers/helpers/map");
        var data = {
            accessToken: "accessToken",
            method: "upsert",
            variables: {
                searchApiDomain: "APIdomain/",
                currentDomain: "domain/",
                consumerKey: "key",
                consumerSecret: "secret"
            },
            project: {
                uuid: "uuid",
                meta: {
                    slug: {
                        nl: "slug"
                    },
                    taxonomy: {
                        tags: [{
                            label: {
                                nl: "TAG1"
                            }
                        }, {
                            label: {
                                nl: "tag2"
                            }
                        }]
                    }
                },
                fields: {
                    title: {
                        nl: "title"
                    },
                    intro: {
                        nl: "intro"
                    },
                    body: {
                        nl: "body"
                    }
                }
            }
        };
        var result = MapHelper.prepare(data);

        expect(result).to.be.an("object");
        expect(result).to.have.property("options");
        expect(result.options).to.have.property("method");
        expect(result.options.method).to.be.equal("PUT");
        expect(result.options).to.have.property("url");
        expect(result.options.url).to.be.equal(data.variables.searchApiDomain + "astad/search/v1/documents");
        expect(result.options).to.have.property("json");
        expect(result.options.json).to.be.true;

        expect(result.options).to.have.property("body");
        expect(result.options.body).to.be.an("object");
        expect(result.options.body).to.have.property("app");
        expect(result.options.body.app).to.be.equal("antwerpenmorgen");
        expect(result.options.body).to.have.property("summary");
        expect(result.options.body.summary).to.be.equal(data.project.fields.intro.nl);
        expect(result.options.body).to.have.property("thumbnail");
        expect(result.options.body.thumbnail).to.be.equal("");
        expect(result.options.body).to.have.property("languages");
        expect(result.options.body.languages).to.be.equal("nl");
        expect(result.options.body).to.have.property("keywords");
        expect(result.options.body.keywords).to.be.equal("tag1,tag2");
        expect(result.options.body).to.have.property("groupfield");
        expect(result.options.body.groupfield).to.be.equal("antwerpen morgen");
        expect(result.options.body).to.have.property("id");
        expect(result.options.body.id).to.be.equal(data.project.uuid);
        expect(result.options.body).to.have.property("categories");
        expect(result.options.body.categories).to.be.an("array");
        expect(result.options.body.categories).to.have.lengthOf(0);
        expect(result.options.body).to.have.property("title");
        expect(result.options.body.title).to.be.equal(data.project.fields.title.nl);
        expect(result.options.body).to.have.property("body");
        expect(result.options.body.body).to.be.equal(data.project.fields.body.nl);
        expect(result.options.body).to.have.property("url");
        expect(result.options.body.url).to.be.equal(data.variables.currentDomain + "projects/" + data.project.meta.slug.nl);

        expect(result.options).to.have.property("headers");
        expect(result.options.headers).to.be.an("object");
        expect(result.options.headers).to.have.property("Accept");
        expect(result.options.headers.Accept).to.be.equal("application/json");
        expect(result.options.headers).to.have.property("Content-Type");
        expect(result.options.headers["Content-Type"]).to.be.equal("application/json");
        expect(result.options.headers).to.have.property("authorization");
        expect(result.options.headers.authorization).to.be.equal("Bearer " + data.accessToken);

        done();
    });

    it("Prepare data for DELETE request", function(done) {
        var MapHelper = require("app/controllers/helpers/map");
        var data = {
            accessToken: "accessToken",
            method: "remove",
            variables: {
                searchApiDomain: "APIdomain/",
                currentDomain: "domain/",
                consumerKey: "key",
                consumerSecret: "secret"
            },
            project: {
                uuid: "uuid",
                meta: {
                    slug: {
                        nl: "slug"
                    },
                    taxonomy: {
                        tags: [{
                            label: {
                                nl: "TAG1"
                            }
                        }, {
                            label: {
                                nl: "tag2"
                            }
                        }]
                    }
                },
                fields: {
                    title: {
                        nl: "title"
                    },
                    intro: {
                        nl: "intro"
                    },
                    body: {
                        nl: "body"
                    }
                }
            }
        };
        var result = MapHelper.prepare(data);

        expect(result).to.be.an("object");
        expect(result).to.have.property("options");
        expect(result.options).to.have.property("method");
        expect(result.options.method).to.be.equal("DELETE");
        expect(result.options).to.have.property("url");
        expect(result.options.url).to.be.equal(data.variables.searchApiDomain + "astad/search/v1/documents/" + data.project.uuid);

        done();
    });
});
