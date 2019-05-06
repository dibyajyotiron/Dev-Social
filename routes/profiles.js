const express = require("express"),
	router = express.Router();

const { getMe } = require("../controllers/profileController");
const { auth, getLoggedInUser } = require("../middlewares/userMiddleware");
// @route GET api/profile/test
// @desc Tests PROFILE route
// @access Public

router.get("/me", auth, getLoggedInUser, getMe);

module.exports = router;
