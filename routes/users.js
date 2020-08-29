const express = require("express");
const router = express.Router();
const { validateReqBody } = require("../middlewares/generic");
const { validateUser, auth, validFollowRequest } = require("../middlewares/userMiddleware");
const { validateUserSchema, validateUserFollowSchema } = require("../models/joiSchema");
const { loginOrRegisterUser, followUser } = require("../controllers/userController");

router.post("/register", validateReqBody(validateUserSchema), validateUser, loginOrRegisterUser);
router.post("/login", validateReqBody(validateUserSchema), validateUser, loginOrRegisterUser);
router.put("/follow", validateReqBody(validateUserFollowSchema), auth, validFollowRequest, followUser);
module.exports = router;
