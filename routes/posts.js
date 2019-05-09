const express = require("express"),
	router = express.Router();

const { findPosts, findPostById } = require("../middlewares/post");
const { auth } = require("../middlewares/userMiddleware");

const { createOrUpdatePost, getPostById, getAllPosts, deletePost } = require("../controllers/postController");

// @route POST /posts/
// @desc Create POST route
// @access Private

router.post("/", auth, createOrUpdatePost);

// @route PUT /posts/
// @desc Create POST route
// @access Private

router.put("/:post_id", auth, findPostById, createOrUpdatePost);

// @route GET /posts/
// @desc GET all Posts route
// @access Private

router.get("/", auth, findPosts, getAllPosts);

// @route GET /posts/:post_id
// @desc GET Singular Post route
// @access Private

router.get("/:post_id", auth, findPostById, getPostById);

// @route DELETE /posts/:post_id
// @desc DELETE Singular Post route
// @access Private

router.delete("/:post_id", auth, findPostById, deletePost);

module.exports = router;
