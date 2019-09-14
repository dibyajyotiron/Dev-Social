const express = require("express"),
	router = express.Router();

const { validateComment } = require("../models/joiSchema");

const { findPostsWithReactions, findPostById, findCommentById, findPostByIdWithReactions } = require("../middlewares/post");
const { auth } = require("../middlewares/userMiddleware");
const { validateReqBody, validateAccess } = require("../middlewares/generic");

const {
	createOrUpdatePost,
	getPostById,
	getAllPosts,
	deletePost,
	addOrUpdateOrDeleteCommentToPost,
	getCommentOnPost,
} = require("../controllers/postController");
const { reactToPost } = require("../controllers/reactController");

router.use(auth);
// @route POST /posts/
// @desc Create POST route
// @access Private

router.post("/", createOrUpdatePost);

// @route PUT /posts/
// @desc Create POST route
// @access Private

router.put("/:post_id", findPostByIdWithReactions, createOrUpdatePost);

// @route GET /posts/
// @desc GET all Posts route
// @access Private

router.get("/", findPostsWithReactions, getAllPosts);

// @route GET /posts/:post_id
// @desc GET Singular Post route
// @access Private

router.get("/:post_id", findPostByIdWithReactions, getPostById);

// @route DELETE /posts/:post_id
// @desc DELETE Singular Post route
// @access Private

router.delete("/:post_id", findPostById, deletePost);

// @route POST /posts/react/:post_id
// @desc React to a Post route
// @access Private

router.post("/react/:post_id", findPostByIdWithReactions, reactToPost);

// @route GET /posts/comment
// @desc Get Comments for a Post route
// @access Private

router.get("/:post_id/comment", findPostById, getCommentOnPost);

// @route POST /posts/comment/:post_id
// @desc Comment to a Post route
// @access Private

router.post("/comment/:post_id", findPostById, validateReqBody(validateComment), addOrUpdateOrDeleteCommentToPost);

// @route PUT /posts/:post_id/update/comment/:comment_id
// @desc Update comment to a Post route
// @access Private

router.put("/:post_id/update/comment/:comment_id", findPostById, findCommentById, validateReqBody(validateComment), addOrUpdateOrDeleteCommentToPost);

// @route DELETE /posts/:post_id/update/comment/:comment_id
// @desc Delete comment from a Post route
// @access Private

router.delete("/:post_id/update/comment/:comment_id", findPostById, findCommentById, validateAccess("comment"), addOrUpdateOrDeleteCommentToPost);

module.exports = router;
