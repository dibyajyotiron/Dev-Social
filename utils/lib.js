const https = require("https");
const http = require("http");
const mongoose = require("mongoose");
const logger = require("../services/logger");

const verifyID = objectID => {
	const { ObjectId } = mongoose.Types;
	if (!ObjectId.isValid(objectID)) return "The resource you're looking for is not here anymore!";
	return true;
};

global.verifyID = verifyID;

module.exports = {
	getJSON(options, res, onResult) {
		const port = options.port == 443 ? https : http;

		let output = "";

		const req = port.request(options, res => {
			res.setEncoding("utf8");

			res.on("data", chunk => {
				output += chunk;
			});

			res.on("end", () => {
				let obj = JSON.parse(output);
				onResult(res.statusCode, obj);
			});
		});

		req.on("error", err => {
			logger.log(err);
			return res.status(500).json({ error: true, message: err.message });
		});

		req.end();
	},
};
