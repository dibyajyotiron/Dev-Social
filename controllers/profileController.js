const { Profile } = require("../models/profile");
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
				profile.education = [...education];
				profile.experience = [...experience];
				break;
			case req.method === "PUT" && !newProfile:
				profile.skills = body.skills ? [...new Set([...body.skills.split(",")])] : profile.skills;
				profile.education = body.education ? [...profile.education, ...body.education] : profile.education;
				profile.experience = body.experience ? [...profile.experience, ...body.experience] : profile.experience;
				break;
			default:
				return res.status(400).json({ error: true, message: "Coming from default" });
		}
		await profile.save(req.user);

		return res.json({
			profile: "xyz",
		});
	},
};
