const Joi = require("joi");

const getValidCareerSchema = (type, req) => {
	const commonProperties = {
		from: req.method === "POST" ? Joi.date().required() : Joi.date(),
		to: Joi.date(),
		current: Joi.bool(),
		description: Joi.string().max(150),
	};
	let validSchema;
	switch (type) {
		case "education":
			validSchema = {
				...commonProperties,
				school: req.method === "POST" ? Joi.string().required() : Joi.string(),
				degree: req.method === "POST" ? Joi.string().required() : Joi.string(),
				fieldOfStudy: req.method === "POST" ? Joi.string().required() : Joi.string(),
			};
			break;

		case "experience":
			validSchema = {
				...commonProperties,
				title: req.method === "POST" ? Joi.string().required() : Joi.string(),
				company: req.method === "POST" ? Joi.string().required() : Joi.string(),
				location: Joi.string(),
			};
			break;
		default:
			validSchema = { error: true, message: "Wrong career type provided!" };
	}
	return validSchema;
};
const validUsernameSchema = () => Joi.string().max(50);

const validCareerSchema = (type, req, maxAllowed) =>
	Joi.array()
		.items(getValidCareerSchema(type, req))
		.max(maxAllowed);

module.exports = {
	validateUserSchema(user, req) {
		const schema = {
			name: req.url.split("/").includes("register")
				? Joi.string()
						.min(2)
						.max(50)
						.required()
						.error(new Error('"Name" of at least 2 and at max 50 letters is required!'))
				: Joi.forbidden().error(new Error("Name is not allowed!")),
			email: Joi.string()
				.email()
				.required(),
			password: Joi.string()
				.regex(/^[a-zA-Z0-9]{8,16}$/)
				.min(8)
				.max(16)
				.required(),
			avatar: Joi.string().uri(),
		};
		return Joi.validate(user, schema);
	},
	validateProfileSchema(profile, req) {
		const schema = {
			company: Joi.string().max(50),
			website: Joi.string().max(75),
			location: Joi.string().max(100),
			status: req.method === "POST" ? Joi.string().required() : Joi.string(),
			skills: req.method === "POST" ? Joi.string().required() : Joi.string(),
			bio: Joi.string().max(150),
			githubUsername: validUsernameSchema(),
			experience: validCareerSchema("experience", req, 10),
			education: validCareerSchema("education", req, 10),
			social: Joi.object().keys({
				youtube: validUsernameSchema(),
				twitter: validUsernameSchema(),
				facebook: validUsernameSchema(),
				linkedin: validUsernameSchema(),
				instagram: validUsernameSchema(),
			}),
		};
		return Joi.validate(profile, schema);
	},
};
