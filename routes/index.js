const express = require("express");

const post = require("./posts");
const users = require("./users");
const profiles = require("./profiles");

const { internalServerError, notFoundError } = require("../middlewares/error");

module.exports = app => {
	app.use(express.json());
	app.use("/posts", post);
	app.use("/users", users);
	app.use("/profiles", profiles);
	app.use(notFoundError);
	app.use(internalServerError);
};
