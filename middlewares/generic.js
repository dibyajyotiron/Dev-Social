const mongoose = require("mongoose");
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
	validateAccess(resource) {
		return (req, res, next) => {
			if (req.user._id !== String(res.locals[resource].user._id))
				return res.status(403).json({ error: true, message: "You're not authorized to perform this action!" });
			next();
		};
	},
};
