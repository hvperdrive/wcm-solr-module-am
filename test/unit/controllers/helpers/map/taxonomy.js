require("rootpath")();
var Q = require("q");
var expect = require("chai").expect;
var rewire = require("rewire");
var mockery = require("mockery");

describe("Map taxonomy helper", function() {
	before(function() {
		mockery.enable({
			warnOnUnregistered: false,
			useCleanCache: true,
		});
	});

	afterEach(function() {
		mockery.deregisterAll();
		mockery.resetCache();
	});

	it("Flatten tags", function(done) {
		mockery.registerMock("app/models/taxonomy", module.exports = {});
		var TaxonomyHelper = rewire("app/controllers/helpers/map/taxonomy");
		var flattenTags = TaxonomyHelper.__get__("flattenTags");
		var data = [{
			tags: [{
				_id: "id1",
				label: {
					nl: "Tag1",
				},
			}],
		}, {
			tags: [{
				_id: "id2",
				label: {
					nl: "Tag2",
				},
			}, {
				_id: "id3",
				label: {
					nl: "Tag3",
				},
			}],
		}];
		var result = flattenTags(data);

		expect(result).to.be.an("array");
		expect(result).to.have.lengthOf(3);

		expect(result[0]).to.have.property("_id");
		expect(result[0]._id).to.be.equal("id1");
		expect(result[0]).to.have.property("label");
		expect(result[0].label).to.be.an("object");
		expect(result[0].label).to.have.property("nl");
		expect(result[0].label.nl).to.be.an("string");
		expect(result[0].label.nl).to.be.equal("Tag1");
		expect(result[0]).to.have.property("_id");
		expect(result[0]).to.have.property("label");

		expect(result[1]).to.have.property("_id");
		expect(result[1]._id).to.be.equal("id2");
		expect(result[1]).to.have.property("label");
		expect(result[1].label).to.be.an("object");
		expect(result[1].label).to.have.property("nl");
		expect(result[1].label.nl).to.be.an("string");
		expect(result[1].label.nl).to.be.equal("Tag2");
		expect(result[1]).to.have.property("_id");
		expect(result[1]).to.have.property("label");

		expect(result[2]).to.have.property("_id");
		expect(result[2]._id).to.be.equal("id3");
		expect(result[2]).to.have.property("label");
		expect(result[2].label).to.be.an("object");
		expect(result[2].label).to.have.property("nl");
		expect(result[2].label.nl).to.be.an("string");
		expect(result[2].label.nl).to.be.equal("Tag3");
		expect(result[2]).to.have.property("_id");
		expect(result[2]).to.have.property("label");
		done();
	});

	it("Find tags based on _id's", function(done) {
		mockery.registerMock("app/models/taxonomy", module.exports = {});
		var TaxonomyHelper = rewire("app/controllers/helpers/map/taxonomy");
		var findTags = TaxonomyHelper.__get__("findTags");
		var data = [{
			_id: "id1",
			label: {
				nl: "Tag1",
			},
		}, {
			_id: "id2",
			label: {
				nl: "Tag2",
			},
		}, {
			_id: "id3",
			label: {
				nl: "Tag3",
			},
		}];
		var ids = [
			"id2",
			"id3",
		];
		var result = findTags(data, ids);

		expect(result).to.be.an("array");
		expect(result).to.have.lengthOf(2);

		expect(result[0]).to.have.property("_id");
		expect(result[0]._id).to.be.equal("id2");
		expect(result[0]).to.have.property("label");
		expect(result[0].label).to.be.an("object");
		expect(result[0].label).to.have.property("nl");
		expect(result[0].label.nl).to.be.an("string");
		expect(result[0].label.nl).to.be.equal("Tag2");
		expect(result[0]).to.have.property("_id");
		expect(result[0]).to.have.property("label");

		expect(result[1]).to.have.property("_id");
		expect(result[1]._id).to.be.equal("id3");
		expect(result[1]).to.have.property("label");
		expect(result[1].label).to.be.an("object");
		expect(result[1].label).to.have.property("nl");
		expect(result[1].label.nl).to.be.an("string");
		expect(result[1].label.nl).to.be.equal("Tag3");
		expect(result[1]).to.have.property("_id");
		expect(result[1]).to.have.property("label");
		done();
	});

	it("Find taxonomy items based on id's", function(done) {
		mockery.registerMock("app/models/taxonomy", module.exports = {
			find: function() {
				return {
					lean: function lean() {
						return {
							exec: function exec() {
								var prom = Q.defer();

								prom.resolve([{
									tags: [{
										_id: "id1",
										label: {
											nl: "Tag1",
										},
									}],
								}, {
									tags: [{
										_id: "id2",
										label: {
											nl: "Tag2",
										},
									}, {
										_id: "id3",
										label: {
											nl: "Tag3",
										},
									}],
								}]);

								return prom.promise;
							},
						};
					},
				};
			},
		});
		var MapHelper = require("app/controllers/helpers/map");
		var data = {
			project: {
				meta: {
					taxonomy: {
						tags: [
							"id1",
							"id2",
						],
					},
				},
			},
		};

		MapHelper
			.taxonomy(data)
			.then(function onSuccess(response) {
				expect(response).to.be.an("object");
				expect(response).to.have.property("project");
				expect(response.project).to.have.property("meta");
				expect(response.project.meta).to.have.property("taxonomy");
				expect(response.project.meta.taxonomy).to.have.property("tags");
				expect(response.project.meta.taxonomy.tags).to.be.an("array");
				expect(response.project.meta.taxonomy.tags).to.have.lengthOf(2);

				expect(response.project.meta.taxonomy.tags[0]).to.have.property("_id");
				expect(response.project.meta.taxonomy.tags[0]._id).to.be.equal("id1");
				expect(response.project.meta.taxonomy.tags[0]).to.have.property("label");
				expect(response.project.meta.taxonomy.tags[0].label).to.be.an("object");
				expect(response.project.meta.taxonomy.tags[0].label).to.have.property("nl");
				expect(response.project.meta.taxonomy.tags[0].label.nl).to.be.an("string");
				expect(response.project.meta.taxonomy.tags[0].label.nl).to.be.equal("Tag1");

				expect(response.project.meta.taxonomy.tags[1]).to.have.property("_id");
				expect(response.project.meta.taxonomy.tags[1]._id).to.be.equal("id2");
				expect(response.project.meta.taxonomy.tags[1]).to.have.property("label");
				expect(response.project.meta.taxonomy.tags[1].label).to.be.an("object");
				expect(response.project.meta.taxonomy.tags[1].label).to.have.property("nl");
				expect(response.project.meta.taxonomy.tags[1].label.nl).to.be.an("string");
				expect(response.project.meta.taxonomy.tags[1].label.nl).to.be.equal("Tag2");

				done();
			}, function onError(responseError) {
				expect(responseError).to.be.undefined;
				done();
			});
	});

	it("Error finding taxonomy items based on id's", function(done) {
		mockery.registerMock("app/models/taxonomy", module.exports = {
			find: function() {
				return {
					lean: function lean() {
						return {
							exec: function exec() {
								var prom = Q.defer();

								prom.reject("Some error.");

								return prom.promise;
							},
						};
					},
				};
			},
		});
		var MapHelper = require("app/controllers/helpers/map");
		var data = {
			project: {
				meta: {
					taxonomy: {
						tags: [
							"id1",
							"id2",
						],
					},
				},
			},
		};

		MapHelper
			.taxonomy(data)
			.then(function onSuccess(response) {
				expect(response).to.be.an("object");
				expect(response).to.have.property("project");
				expect(response.project).to.have.property("meta");
				expect(response.project.meta).to.have.property("taxonomy");
				expect(response.project.meta.taxonomy).to.have.property("tags");
				expect(response.project.meta.taxonomy.tags).to.be.an("array");
				expect(response.project.meta.taxonomy.tags).to.have.lengthOf(0);
				done();
			}, function onError(responseError) {
				expect(responseError).to.be.undefined;
				done();
			});
	});
});
