require("rootpath")();
var expect = require("chai").expect;
var Q = require("q");
var rewire = require("rewire");
var mockery = require("mockery");

describe("Variables helper", function() {
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

	it("Check for valid solr config", function(done) {
		mockery.registerMock("@wcm/module-helper", module.exports = {
			variables: {
				getAll: function() {
					return Q.when({
						solr: {
							variables: {
								searchApiDomain: "APIdomain",
								currentDomain: "domain/",
								consumerKey: "key",
								consumerSecret: "secret",
							},
						},
					});
				},
			},
		});
		var VariableHelper = require("app/helpers/variables");

		VariableHelper.set({});

		VariableHelper()
			.then(function onSuccess(response) {
				expect(response).to.be.an("object");
				expect(response).to.have.property("searchApiDomain");
				expect(response.searchApiDomain).to.be.equal("APIdomain/");
				expect(response).to.have.property("currentDomain");
				expect(response.currentDomain).to.be.equal("domain/");
				expect(response).to.have.property("consumerKey");
				expect(response.consumerKey).to.be.equal("key");
				expect(response).to.have.property("consumerSecret");
				expect(response.consumerSecret).to.be.equal("secret");
				done();
			}, function onError(responseError) {
				expect(responseError).to.be.undefined;
				done();
			});
	});

	it("Check when no variables are returned", function(done) {
		mockery.registerMock("@wcm/module-helper", module.exports = {
			variables: {
				getAll: function() {
					return Q.when({
						solr: {},
					});
				},
			},
		});
		var VariableHelper = require("app/helpers/variables");

		VariableHelper.set({});

		VariableHelper()
			.then(function onSuccess(response) {
				expect(response).to.be.undefined;
				done();
			}, function onError(responseError) {
				expect(responseError).to.be.equal("Unable to get variables");
				done();
			});
	});

	it("Check url with trailing slash", function(done) {
		mockery.registerMock("@wcm/module-helper", module.exports = {
			variables: {
				getAll: function() {
					return Q.when({
						solr: {},
					});
				},
			},
		});
		var VariableHelper = rewire("app/helpers/variables");
		var checkUrl = VariableHelper.__get__("checkUrl");
		var url = "http://www.google.com/";
		var result = checkUrl(url);

		expect(result).to.be.a("string");
		expect(result.slice(-1)).to.be.equal("/");
		done();
	});

	it("Check url without trailing slash", function(done) {
		mockery.registerMock("@wcm/module-helper", module.exports = {
			variables: {
				getAll: function() {
					return Q.when({
						solr: {},
					});
				},
			},
		});
		var VariableHelper = rewire("app/helpers/variables");
		var checkUrl = VariableHelper.__get__("checkUrl");
		var url = "http://www.google.com";
		var result = checkUrl(url);

		expect(result).to.be.a("string");
		expect(result.slice(-1)).to.be.equal("/");
		done();
	});

	it("Successfully validate all fields", function(done) {
		mockery.registerMock("@wcm/module-helper", module.exports = {
			variables: {
				getAll: function() {
					return Q.when({
						solr: {},
					});
				},
			},
		});
		var VariableHelper = rewire("app/helpers/variables");
		var validateFields = VariableHelper.__get__("validateFields");
		var data = {
			searchApiDomain: "APIdomain",
			currentDomain: "domain/",
			consumerKey: "key",
			consumerSecret: "secret",
		};
		var result = validateFields(data);

		expect(result).to.be.a("boolean");
		expect(result).to.be.true;
		done();
	});

	it("Validate all fields with error when `searchApiDomain` is missing", function(done) {
		mockery.registerMock("@wcm/module-helper", module.exports = {
			variables: {
				getAll: function() {
					return Q.when({
						solr: {},
					});
				},
			},
		});
		var VariableHelper = rewire("app/helpers/variables");
		var validateFields = VariableHelper.__get__("validateFields");
		var data = {
			currentDomain: "domain/",
			consumerKey: "key",
			consumerSecret: "secret",
		};
		var result = validateFields(data);

		expect(result).to.be.a("boolean");
		expect(result).to.be.false;
		done();
	});

	it("Validate all fields with error when `currentDomain` is missing", function(done) {
		mockery.registerMock("@wcm/module-helper", module.exports = {
			variables: {
				getAll: function() {
					return Q.when({
						solr: {},
					});
				},
			},
		});
		var VariableHelper = rewire("app/helpers/variables");
		var validateFields = VariableHelper.__get__("validateFields");
		var data = {
			searchApiDomain: "APIdomain",
			consumerKey: "key",
			consumerSecret: "secret",
		};
		var result = validateFields(data);

		expect(result).to.be.a("boolean");
		expect(result).to.be.false;
		done();
	});

	it("Validate all fields with error when `consumerKey` is missing", function(done) {
		mockery.registerMock("@wcm/module-helper", module.exports = {
			variables: {
				getAll: function() {
					return Q.when({
						solr: {},
					});
				},
			},
		});
		var VariableHelper = rewire("app/helpers/variables");
		var validateFields = VariableHelper.__get__("validateFields");
		var data = {
			searchApiDomain: "APIdomain",
			currentDomain: "domain/",
			consumerSecret: "secret",
		};
		var result = validateFields(data);

		expect(result).to.be.a("boolean");
		expect(result).to.be.false;
		done();
	});

	it("Validate all fields with error when `consumerSecret` is missing", function(done) {
		mockery.registerMock("@wcm/module-helper", module.exports = {
			variables: {
				getAll: function() {
					return Q.when({
						solr: {},
					});
				},
			},
		});
		var VariableHelper = rewire("app/helpers/variables");
		var validateFields = VariableHelper.__get__("validateFields");
		var data = {
			searchApiDomain: "APIdomain",
			currentDomain: "domain/",
			consumerKey: "key",
		};
		var result = validateFields(data);

		expect(result).to.be.a("boolean");
		expect(result).to.be.false;
		done();
	});

	it("Check existing variables", function(done) {
		mockery.registerMock("@wcm/module-helper", module.exports = {
			variables: {
				getAll: function() {
					return Q.when({
						solr: {
							variables: {
								searchApiDomain: "APIdomain",
								currentDomain: "domain/",
								consumerKey: "key",
								consumerSecret: "secret",
							},
						},
					});
				},
			},
		});
		var VariableHelper = rewire("app/helpers/variables");
		var checkVariables = VariableHelper.__get__("checkVariables");
		var data = {
			solr: {
				variables: {
					searchApiDomain: "APIdomain",
					currentDomain: "domain/",
					consumerKey: "key",
					consumerSecret: "secret",
				},
			},
		};

		checkVariables(data)
			.then(function onSuccess(response) {
				expect(response).to.be.an("object");
				expect(response).to.have.property("searchApiDomain");
				expect(response.searchApiDomain).to.be.equal("APIdomain/");
				expect(response).to.have.property("currentDomain");
				expect(response.currentDomain).to.be.equal("domain/");
				expect(response).to.have.property("consumerKey");
				expect(response.consumerKey).to.be.equal("key");
				expect(response).to.have.property("consumerSecret");
				expect(response.consumerSecret).to.be.equal("secret");
				done();
			}, function onError(responseError) {
				expect(responseError).to.be.undefined;
				done();
			});
	});

	it("Check non-existing variables", function(done) {
		mockery.registerMock("@wcm/module-helper", module.exports = {
			variables: {
				getAll: function() {
					return Q.when({
						solr: {},
					});
				},
			},
		});
		var VariableHelper = rewire("app/helpers/variables");
		var checkVariables = VariableHelper.__get__("checkVariables");
		var data = {
			features: {},
		};

		checkVariables(data)
			.then(function onSuccess(response) {
				expect(response).to.be.undefined;
				done();
			}, function onError(responseError) {
				expect(responseError).to.be.equal("Unable to get variables");
				done();
			});
	});

	after(function() {
		// Remove our mocked nodemailer and disable mockery
		mockery.deregisterAll();
		mockery.disable();
	});
});
