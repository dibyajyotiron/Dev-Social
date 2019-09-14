const { getPostWithReactions, getComment, getPost } = require("../controllers/helpers/post");

module.exports = {
	async findPostsWithReactions(req, res, next) {
		const posts = await getPostWithReactions();
		res.locals.posts = posts;
		return next();
	},
	async findPostByIdWithReactions(req, res, next) {
		const message = verifyID(req.params.post_id);
		if (typeof message === "string") return res.status(422).json({ error: true, message: message });
		const post = await getPostWithReactions(req.params.post_id);
		if (!post) return res.status(404).json({ error: true, message: "The post you're looking for is not here anymore!" });
		res.locals.post = post;
		return next();
	},
	async findCommentById(req, res, next) {
		const message = verifyID(req.params.comment_id);
		if (typeof message === "string") return res.status(422).json({ error: true, message: message });
		const comment = await getComment(req.params.comment_id);
		if (!comment) return res.status(404).json({ error: true, message: "The comment you're looking for is not here anymore!" });
		res.locals.comment = comment;
		return next();
	},
	async findPostById(req, res, next) {
		const message = verifyID(req.params.post_id);
		if (typeof message === "string") return res.status(422).json({ error: true, message: message });
		const post = await getPost(req.params.post_id);
		if (!post) return res.status(404).json({ error: true, message: "The post you're looking for is not here anymore!" });
		res.locals.post = post;
		return next();
	},
};
