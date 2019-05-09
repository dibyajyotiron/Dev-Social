const https = require("https");
const http = require("http");

module.exports.getJSON = (options, res, onResult) => {
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
		console.log(err);
		return res.status(500).json({ error: true, message: err.message });
	});

	req.end();
};
