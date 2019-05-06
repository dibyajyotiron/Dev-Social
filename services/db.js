const logger = require("./logger");
const mongoose = require("mongoose");
const { mongoURI } = require("../config/keys");

module.exports = () => {
	mongoose
		.connect(mongoURI, {
			useNewUrlParser: true,
			useCreateIndex: true,
		})
		.then(() => {
			if (process.env.NODE_ENV !== "production") return logger.info("Connected database: " + `${mongoURI}...`.green);
			return logger.info("connected to production environment of mongodb...".blue);
		})
		.catch(ex => logger.error(`${ex.message}`));
};
