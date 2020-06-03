"use strict";

angular
	.module("solr-am_1.2.0")
	.config([
		"$stateProvider",
		"solrAMConfigProvider",

		function(
			$stateProvider,
			acpaassearchConfigProvider
		) {

			var moduleFolder = acpaassearchConfigProvider.API.modulePath;

			$stateProvider
			.state("pelorus.solr-am.index", {
				url: "",
				access: {
					requiresLogin: true,
				},
				ncyBreadcrumb: {
					label: "{{breadcrumb}}",
				},
				templateUrl: moduleFolder + "views/overview.html",
				controller: "solrAMOverviewController",
			});
		},
	]
);
