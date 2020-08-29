const { User } = require("../models/user");
const { BAD_REQUEST } = require("../lib/errorLib");
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
	async validFollowRequest(req, res, next) {
		const { _follows } = req.body;
		const { user } = req;
		if (_follows === user._id) {
			return next(
				BAD_REQUEST({
					message: "You can't follow yourself!",
				})
			);
		}
		const userExists = await User.findOne({
			_id: _follows,
		});
		if (!userExists)
			return next(
				BAD_REQUEST({
					message: "User with provided id doesn't exist!",
				})
			);
		return next();
	},
};
