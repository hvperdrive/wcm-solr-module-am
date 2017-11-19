require("rootpath")();
var _ = require("lodash");
var Q = require("q");
var TaxonomyModel = require("app/models/taxonomy");

var findTags = function(taxonomy, selected) {
	return _.remove(taxonomy, function(tax) {
		return ~selected.indexOf(tax._id.toString());
	});
};

var flattenTags = function(taxonomy) {
	return _.flatten(_.map(taxonomy, function(tax) {
		return tax.tags;
	}));
};

module.exports = function(data) {
	var prom = Q.defer();

	TaxonomyModel
		.find({
			"tags._id": {
				$in: data.project.meta.taxonomy.tags,
			},
		})
		.lean()
		.exec()
		.then(function onSuccess(response) {
			data.project.meta.taxonomy.tags = findTags(flattenTags(response), data.project.meta.taxonomy.tags);
			prom.resolve(data);
		}, function onError() {
			data.project.meta.taxonomy.tags = [];
			prom.resolve(data);
		});

	return prom.promise;
};
