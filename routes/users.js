const express = require("express");
const router = express.Router();
const { validateReqBody } = require("../middlewares/generic");
const { validateUser } = require("../middlewares/userMiddleware");
const { validateUserSchema } = require("../models/joiSchema");
const { loginOrRegisterUser } = require("../controllers/userController");

// @route    POST api/users
// @desc     Register user
// @access   Public
router.post("/register", validateReqBody(validateUserSchema), validateUser, loginOrRegisterUser);
router.post("/login", validateReqBody(validateUserSchema), validateUser, loginOrRegisterUser);
module.exports = router;
