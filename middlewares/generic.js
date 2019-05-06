const Joi = require("joi");

module.exports = {
	validateReqBody(joiSchema) {
		return (req, res, next) => {
			const { error } = joiSchema(req.body, req);

			if (error)
				return res.status(400).json({
					error: true,
					message: error.message,
				});
			res.locals.receivedEmail = req.body.email;
			return next();
		};
	},
};
