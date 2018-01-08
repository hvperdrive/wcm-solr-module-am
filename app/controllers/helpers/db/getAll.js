const R = require("ramda");
const path = require("path");

const ContentModel = require(path.join(process.cwd(), "app/models/content"));

module.exports = () => {
	return ContentModel.find({
		"meta.deleted": false,
		"meta.published": true,
	})
	.populate("meta.contentType")
	.lean()
	.exec()
	.then(R.filter(R.pathEq(["meta", "contentType", "meta", "safeLabel"], "projecten")));
};
