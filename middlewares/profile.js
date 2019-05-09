const { Profile } = require("../models/profile");

module.exports = {
	async getLoggedInUserProfile(req, res, next) {
		const userProfile = await Profile.findOne({ user: req.user._id });
		res.locals.me = userProfile;
		return next();
	},
	async getAllUsers(req, res, next) {
		const usersProfile = await Profile.find({});
		res.locals.profiles = usersProfile;
		return next();
	},
	async findUserById(req, res, next) {
		const { user_id: userId } = req.params;

		const message = verifyID(userId);
		if (typeof message === "string") return res.status(422).json({ error: true, message: message });

		const user = await Profile.findOne({ user: userId });
		res.locals.user = user;
		if (!user) return res.status(404).json({ error: true, message: "User with given id doesn't exist!" });
		return next();
	},
};
