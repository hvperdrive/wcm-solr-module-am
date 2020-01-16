"use strict";

angular.module("solr-am_1.1.1.directives", []);
angular.module("solr-am_1.1.1.factories", []);
angular.module("solr-am_1.1.1.services", ["solr-am_1.1.1.factories"]);
angular.module("solr-am_1.1.1.controllers", ["solr-am_1.1.1.services"]);

angular
	.module("solr-am_1.1.1", [
		"pelorus.services",

		"solr-am_1.1.1.directives",
		"solr-am_1.1.1.factories",
		"solr-am_1.1.1.services",
		"solr-am_1.1.1.controllers",
	])
	.run([function() {
		console.log("solr AM module is available!"); // eslint-disable-line no-console
	}]);
