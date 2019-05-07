const express = require("express"),
	router = express.Router();

const { getMe, createOrUpdate } = require("../controllers/profileController");
const { auth, getLoggedInUser } = require("../middlewares/userMiddleware");
const { validateProfileSchema } = require("../models/joiSchema");

const { validateReqBody } = require("../middlewares/generic");

// @route GET /profile/me
// @desc Get Logged in user PROFILE route
// @access Private

router.get("/me", auth, getLoggedInUser, getMe);

// @route POST /profile/
// @desc Create USER PROFILE route
// @access Private

router.post("/", auth, getLoggedInUser, validateReqBody(validateProfileSchema), createOrUpdate);

// @route PUT /profile/
// @desc Update USER PROFILE route
// @access Private

router.put("/", auth, getLoggedInUser, validateReqBody(validateProfileSchema), createOrUpdate);

module.exports = router;
