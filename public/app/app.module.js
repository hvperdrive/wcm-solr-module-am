"use strict";

angular.module("solr-am_1.1.0.directives", []);
angular.module("solr-am_1.1.0.factories", []);
angular.module("solr-am_1.1.0.services", ["solr-am_1.1.0.factories"]);
angular.module("solr-am_1.1.0.controllers", ["solr-am_1.1.0.services"]);

angular
	.module("solr-am_1.1.0", [
		"pelorus.services",

		"solr-am_1.1.0.directives",
		"solr-am_1.1.0.factories",
		"solr-am_1.1.0.services",
		"solr-am_1.1.0.controllers",
	])
	.run([function() {
		console.log("solr AM module is available!"); // eslint-disable-line no-console
	}]);
