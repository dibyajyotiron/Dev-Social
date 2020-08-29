const express = require("express");

const post = require("./posts");
const users = require("./users");
const profiles = require("./profiles");

const { internalServerError, notFoundError, genericError } = require("../middlewares/error");

module.exports = (app) => {
	app.use(express.json());
	app.use("/posts", post);
	app.use("/users", users);
	app.use("/profiles", profiles);
	app.use(genericError);
	app.use(notFoundError);
	// most likely it shouldn't reach internalServerError as internal server error is already in generic
	app.use(internalServerError);
};
