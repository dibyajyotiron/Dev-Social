const Joi = require("joi");

module.exports = {
	validateReqBody(joiSchema) {
		return (req, res, next) => {
			const { error } = joiSchema(req.body, req);
			if (error)
				return res.status(400).json({
					error: true,
					message: error.details ? error.details[0].message : error.message,
				});
			return next();
		};
	},
};
