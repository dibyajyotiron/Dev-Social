const { User } = require("../models/user");
const config = require("config");
const jwt = require("jsonwebtoken");

const { Profile } = require("../models/profile");
module.exports = {
	async validateUser(req, res, next) {
		const email = req.body.email;
		const user = await User.findOne({ email });
		if (user) res.locals.user = user;
		return next();
	},
	async auth(req, res, next) {
		const token = req.header("x-auth-token");
		if (!token)
			return res.status(401).json({
				error: true,
				message: "You've to login to access this route!",
			});

		try {
			const decoded = jwt.verify(token, config.get("secretOrKey"));
			req.user = decoded;
			return next();
		} catch (error) {
			return res.status(400).json({ error: true, message: "Invalid token provided." });
		}
	},
	async getLoggedInUser(req, res, next) {
		const user = await Profile.findOne({ user: req.user._id });
		res.locals.me = user;
		return next();
	},
};
