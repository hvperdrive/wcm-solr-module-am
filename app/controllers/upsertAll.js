const R = require("ramda");

const VariableHelper = require("../helpers/variables");
const Helpers = require("./helpers");
const upsert = require("./upsert");

module.exports = (req, res) => {
	Helpers.db.getAll()
		.then((projects) => Q.all(R.map(upsert, projects)))
		.then(() => res.status(200).json({ msg: "All projects are updated" }))
		.catch((responseError) => res.status(503).json({ err: responseError }));
};
