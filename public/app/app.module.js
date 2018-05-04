"use strict";

angular.module("solr-am_1.0.5.directives", []);
angular.module("solr-am_1.0.5.factories", []);
angular.module("solr-am_1.0.5.services", ["solr-am_1.0.5.factories"]);
angular.module("solr-am_1.0.5.controllers", ["solr-am_1.0.5.services"]);

angular
	.module("solr-am_1.0.5", [
		"pelorus.services",

		"solr-am_1.0.5.directives",
		"solr-am_1.0.5.factories",
		"solr-am_1.0.5.services",
		"solr-am_1.0.5.controllers",
	])
	.run([function() {
		console.log("solr AM module is available!"); // eslint-disable-line no-console
	}]);
