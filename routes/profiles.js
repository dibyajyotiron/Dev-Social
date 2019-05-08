const express = require("express"),
	router = express.Router();

const { validateProfileSchema, validateCareerSchema } = require("../models/joiSchema");

const { auth } = require("../middlewares/userMiddleware");
const { getLoggedInUserProfile, getAllUsers, findUserById } = require("../middlewares/profile");
const { validateReqBody } = require("../middlewares/generic");

const {
	getMe,
	createOrUpdate,
	getUsersExceptMe,
	getUsers,
	getUserById,
	removeProfileDetails,
	addCareerToProfile,
	deleteCareerFromProfile,
} = require("../controllers/profileController");

// @route GET /profiles/me
// @desc Get Logged in user PROFILE route
// @access Private
router.get("/me", auth, getLoggedInUserProfile, getMe);

// @route POST /profiles/
// @desc Create USER PROFILE route
// @access Private
router.post("/", auth, getLoggedInUserProfile, validateReqBody(validateProfileSchema), createOrUpdate);

// @route GET /profiles/
// @desc Get USER PROFILES route
// @access Public
router.get("/", getAllUsers, getUsers);

// @route GET /profiles/
// @desc Get USER PROFILES route
// @access Private
router.get("/find_others", auth, getAllUsers, getUsersExceptMe);

// @route GET /profiles/user/:userId
// @desc Get USER PROFILES route
// @access Private
router.get("/users/:user_id", auth, findUserById, getUserById);

// @route PUT /profiles/
// @desc Update USER PROFILE route
// @access Private
router.put("/", auth, getLoggedInUserProfile, validateReqBody(validateProfileSchema), createOrUpdate);

// @route POST /profiles/experience
// @desc Append Experience to Profile route
// @access Private
router.post("/experience", auth, getLoggedInUserProfile, validateReqBody(validateCareerSchema), addCareerToProfile);

// @route DELETE /profiles/experience/:exp_id
// @desc Delete Experience from Profile route
// @access Private
router.delete("/experience/:exp_id", auth, getLoggedInUserProfile, deleteCareerFromProfile);

// @route POST /profiles/education
// @desc Append Experience to Profile route
// @access Private
router.post("/education", auth, getLoggedInUserProfile, validateReqBody(validateCareerSchema), addCareerToProfile);

// @route DELETE /profiles/education/:edu_id
// @desc Delete Education from Profile route
// @access Private
router.delete("/education/:edu_id", auth, getLoggedInUserProfile, deleteCareerFromProfile);

// @route DELETE /profiles/me
// @desc Delete user, profile, posts route
// @access Private
router.delete("/me", auth, getLoggedInUserProfile, removeProfileDetails);

module.exports = router;
