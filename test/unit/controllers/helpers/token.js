require("rootpath")();
var expect = require("chai").expect;
var mockery = require("mockery");

describe("Token helper", function() {
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

	it("Fetch A-stad token successfully", function(done) {
		mockery.registerMock("request", module.exports = function(options, callback) {
			var err = null;
			var data = {
				statusCode: 200,
			};
			var body = {
				access_token: "abc", // eslint-disable-line camelcase
			};

			callback(err, data, body);
		});
		var RequestHelper = require("app/controllers/helpers/token");
		var data = {
			variables: {
				searchApiDomain: "APIdomain",
				currentDomain: "domain/",
				consumerKey: "key",
				consumerSecret: "secret",
			},
		};

		RequestHelper(data)
			.then(function onSuccess(response) {
				expect(response).to.be.an("object");
				expect(response).to.have.property("accessToken");
				expect(response.accessToken).to.be.equal("abc");
				done();
			}, function onError(responseError) {
				expect(responseError).to.be.undefined;
				done();
			});
	});

	it("Fetch A-stad token with errors", function(done) {
		mockery.registerMock("request", module.exports = function(options, callback) {
			var err = null;
			var data = {
				statusCode: 400,
			};
			var body = {};

			callback(err, data, body);
		});
		var RequestHelper = require("app/controllers/helpers/token");
		var data = {
			variables: {
				searchApiDomain: "APIdomain",
				currentDomain: "domain/",
				consumerKey: "key",
				consumerSecret: "secret",
			},
		};

		RequestHelper(data)
			.then(function onSuccess(response) {
				expect(response).to.be.undefined;
				done();
			}, function onError(responseError) {
				expect(responseError).to.be.a("string");
				expect(responseError).to.be.equal("Unable to obtain an access token");
				done();
			});
	});
});
