const _ = require("lodash");
const config = require("config");

const { Profile } = require("../models/profile");
const { User } = require("../models/user");

const { getJSON } = require("../utils/lib");

function careerParser(type, id) {
	if (type.map(t => String(t._id)).indexOf(id) === -1) {
		return "The resource you're looking for is not there anymore!";
	}
	type.splice(type.map(t => String(t._id)).indexOf(id), 1);
	return type;
}

module.exports = {
	getMe(req, res) {
		const { me } = res.locals;
		if (!me)
			return res.status(400).json({
				error: true,
				message: "No profiles exist for the given user!",
			});
		return res.json(me);
	},
	async createOrUpdate(req, res) {
		let { me: profile } = res.locals;

		const { body } = req;
		let newProfile = false;

		if (!profile) {
			newProfile = true;
			profile = await new Profile();
		}

		const prefixUri = {
			youtube: "https://www.youtube.com/",
			facebook: "https://www.facebook.com/",
			twitter: "https://www.twitter.com/",
			linkedin: "https://www.linkedin.com/",
			instagram: "https://www.instagram.com/",
		};

		profile.company = body.company ? body.company : profile.company;
		profile.website = body.website ? body.website : profile.website;
		profile.location = body.location ? body.location : profile.location;
		profile.status = body.status ? body.status : profile.status;
		profile.bio = body.bio ? body.bio : profile.bio;
		profile.githubUsername = body.githubUsername ? body.githubUsername : profile.githubUsername;
		profile.social.youtube = body.social && body.social.youtube ? `${prefixUri.youtube}${body.social.youtube}` : profile.social.youtube;
		profile.social.twitter = body.social && body.social.twitter ? `${prefixUri.twitter}${body.social.twitter}` : profile.social.twitter;
		profile.social.facebook = body.social && body.social.facebook ? `${prefixUri.facebook}${body.social.facebook}` : profile.social.facebook;
		profile.social.linkedin = body.social && body.social.linkedin ? `${prefixUri.linkedin}${body.social.linkedin}` : profile.social.linkedin;
		profile.social.instagram = body.social && body.social.instagram ? `${prefixUri.instagram}${body.social.instagram}` : profile.social.instagram;

		const { skills, education = [], experience = [] } = req.body;

		switch (true) {
			case req.method === "POST" && newProfile === true:
				profile.skills = [...new Set([...skills.split(",")])];
				// profile.education = [...education];
				// profile.experience = [...experience];
				break;
			case req.method === "PUT" && !newProfile:
				profile.skills = body.skills ? [...new Set([...body.skills.split(",")])] : profile.skills;
				// profile.education = body.education ? [...profile.education, ...body.education] : profile.education;
				// profile.experience = body.experience ? [...profile.experience, ...body.experience] : profile.experience;
				break;
			default:
				return res.status(400).json({ error: true, message: "Coming from default" });
		}
		const savedProfile = await profile.save(req.user);

		return res.json(savedProfile);
	},
	async addCareerToProfile(req, res) {
		const { me: userProfile } = res.locals;
		const { experience = [], education = [] } = userProfile;

		const urlArr = req.url.split("/");

		switch (true) {
			case urlArr.includes("experience"):
				experience.unshift(req.body);
				break;
			case urlArr.includes("education"):
				education.unshift(req.body);
				break;
			default:
				break;
		}

		await userProfile.save();
		return res.json(userProfile);
	},
	async deleteCareerFromProfile(req, res) {
		const { exp_id = "", edu_id = "" } = req.params;

		const urlArr = req.url.split("/");

		let { me: userProfile } = res.locals;

		let { experience = [], education = [] } = userProfile;

		switch (true) {
			case urlArr.includes("experience"):
				experience = careerParser(experience, exp_id);
				break;
			case urlArr.includes("education"):
				education = careerParser(education, edu_id);
				break;
		}
		await userProfile.save();
		return res.json(typeof (experience || education) === "string" ? { error: true, message: experience || education } : userProfile);
	},
	async getUsers(req, res) {
		let usersProfiles = res.locals.profiles;
		return res.json(usersProfiles);
	},
	async getUsersExceptMe(req, res) {
		let usersProfiles = res.locals.profiles;
		const { email } = req.user;
		const getUsersExceptMe = _.chain(usersProfiles)
			.intersectionBy(user => user.email !== email)
			.value();
		return res.json(getUsersExceptMe);
	},
	async getUserById(req, res) {
		const { user } = res.locals;
		return res.json(user);
	},
	async getGithubProfile(req, res) {
		const options = {
			hostname: "api.github.com",
			path: `/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id=${config.get("github.clientId")}&client_secret=${config.get(
				"github.clientSecret",
			)}`,
			method: "GET",
			port: 443,
			headers: { "User-Agent": "node.js" },
		};
		getJSON(options, res, (sCode, data) => {
			if (sCode !== 200) return res.json({ error: true, message: `Github profile for ${req.params.username} was ${data.message}!` });
			return res.json(data);
		});
	},
	async removeProfileDetails(req, res) {
		const me = res.locals.me;
		await me.deleteOne();
		await User.findOneAndDelete({ _id: req.user._id });
		return res.json({ success: true, message: "Deleted user!" });
	},
};
