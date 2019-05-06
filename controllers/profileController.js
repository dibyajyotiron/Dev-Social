const { Profile } = require("../models/profile");
module.exports = {
	getMe(req, res) {
		const { me } = res.locals;
		return res.json(me);
	},
};
