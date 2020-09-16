const R = require("ramda");
const Q = require("q");
const path = require("path");

const ContentModel = require(path.join(process.cwd(), "app/models/content"));
const MetaPopulator = require(path.join(process.cwd(), "app/helpers/populate/fields/types/meta"));

module.exports = () => {
	const settings = {};

	return ContentModel.find({
		"fields.medium.website": true,
		"meta.deleted": false,
		"meta.published": true,
	})
		.populate("meta.contentType")
		.lean()
		.exec()
		.then(R.filter(R.pathEq(["meta", "contentType", "meta", "safeLabel"], "projecten")))
		.then((projects) => {
			return Q.all(R.map(
				R.curry(MetaPopulator.taxonomy)(R.__, settings),
				projects
			)).then(() => Q.when(projects))
		});
};
