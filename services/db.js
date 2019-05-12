const logger = require("./logger");
const mongoose = require("mongoose");
const config = require("config");

module.exports = () => {
	mongoose
		.connect(config.get("mongoURI"), {
			useNewUrlParser: true,
			useCreateIndex: true,
			useFindAndModify: false,
		})
		.then(() => {
			if (process.env.NODE_ENV !== "production") return logger.info("Connected database: " + `${config.get("mongoURI")}...`.green);
			return logger.info("connected to production environment of mongodb...".blue);
		})
		.catch(ex => logger.error(`${ex.message}`));
};
