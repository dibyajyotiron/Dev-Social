const express = require("express");
const router = express.Router();
const { validateReqBody } = require("../middlewares/generic");
const { validateUser, auth } = require("../middlewares/userMiddleware");
const {
  validateUserSchema,
  validateUserFollowSchema,
} = require("../models/joiSchema");
const {
  loginOrRegisterUser,
  followUser,
} = require("../controllers/userController");

// @route    POST api/users
// @desc     Register user
// @access   Public
router.post(
  "/register",
  validateReqBody(validateUserSchema),
  validateUser,
  loginOrRegisterUser
);
router.post(
  "/login",
  validateReqBody(validateUserSchema),
  validateUser,
  loginOrRegisterUser
);
router.post(
  "/follow",
  validateReqBody(validateUserFollowSchema),
  auth,
  followUser
);
module.exports = router;
