require("rootpath")();

const _ = require("lodash");
const TaxonomyModel = require("app/models/taxonomy");

const findTags = (taxonomy, selected) => {
	return _.remove(taxonomy, (tax) => {
		return ~selected.indexOf(tax._id.toString());
	});
};

const flattenTags = (taxonomy) => {
	return _.flatten(_.map(taxonomy, (tax) => tax.tags));
};

module.exports = (data) => TaxonomyModel
	.find({
		"tags._id": {
			$in: data.project.meta.taxonomy.tags,
		},
	})
	.lean()
	.exec()
	.then((response) => {
		data.project.meta.taxonomy.tags = findTags(flattenTags(response), data.project.meta.taxonomy.tags);
		return data;
	})
	.catch(() => {
		data.project.meta.taxonomy.tags = [];
		return data;
	});
