"use strict";

angular
	.module("solr-am_1.0.5.factories")
	.factory("solrAMFactory", [
		"$http",
		"configuration",

		function(
			$http,
			configuration
		) {
			var api = configuration.serverPath + configuration.apiPrefix + configuration.apiLevel;
			var factory = {};

			factory.reindexSearch = function() {
				return $http.put(api + "solr-am/upsertAll");
			};

			return factory;
		},
	]);
