const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");

const { User } = require("../models/user");

module.exports = {
	async loginOrRegisterUser(req, res) {
		const { url } = req;
		let { name, email, password } = req.body;
		let user = res.locals.user;
		console.log(user);
		switch (true) {
			case user && url.split("/").includes("login"):
				const validPassword = await bcrypt.compare(password, user.password);
				if (!validPassword) return res.status(400).send("Invalid password!");
				const token = user.generateAuthToken();
				return res.header("x-auth-token", token).json({ success: true, message: "Logged in successfully logged in!" });

			case !user && url.split("/").includes("login"):
				return res.status(404).json({ error: true, message: "User is not registered!" });

			case user && url.split("/").includes("register"):
				return res.status(400).json({ error: true, message: "User with this email id is already registered!" });
		}

		let avatar = gravatar.url(email, { s: "200", r: "pg", d: "mm" });

		user = new User({ name, email, avatar, password });

		await user.save(req.body);
		const token = user.generateAuthToken();

		return res.header("x-auth-token", token).send(({ name, email, avatar } = user));
	},
};
