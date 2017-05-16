require("rootpath")();
var expect = require("chai").expect;
var mockery = require("mockery");

describe("Map init helper", function() {
    before(function() {
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

    it("Map init values to begin", function(done) {
        var MapHelper = require("app/controllers/helpers/map");
        var project = "project";
        var variables = "variables";
        var method = "method";
        var result = MapHelper.init(project, variables, method);

        expect(result).to.be.an("object");
        expect(result).to.have.property("project");
        expect(result.project).to.be.equal("project");
        expect(result).to.have.property("variables");
        expect(result.variables).to.be.equal("variables");
        expect(result).to.have.property("method");
        expect(result.method).to.be.equal("method");

        done();
    });
});
