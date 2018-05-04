require("rootpath")();
var expect = require("chai").expect;

var ValidateHelper = require("app/controllers/helpers/validate");

describe("Validate helper", function() {
	it("Check for valid content type", function(done) {
		var data = {
			meta: {
				contentType: {
					meta: {
						safeLabel: "projecten",
					},
				},
			},
		};
		var result = ValidateHelper(data);

		expect(result).to.be.a("boolean");
		expect(result).to.be.true;

		done();
	});

	it("Check for invalid content type", function(done) {
		var data = {
			meta: {
				contentType: {
					meta: {
						safeLabel: "visions",
					},
				},
			},
		};
		var result = ValidateHelper(data);

		expect(result).to.be.a("boolean");
		expect(result).to.be.false;

		done();
	});

	it("Check for non existing path to safeLabel", function(done) {
		var data = {
			meta: {
				contentType: "",
			},
		};
		var result = ValidateHelper(data);

		expect(result).to.be.undefined;

		done();
	});
});
