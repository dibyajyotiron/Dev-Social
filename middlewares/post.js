const { Post } = require("../models/post");
// const { verifyID } = require("../utils/lib");
module.exports = {
	async findPosts(req, res, next) {
		const posts = await Post.find({}).sort({ createdAt: -1 });
		res.locals.posts = posts;
		return next();
	},
	async findPostById(req, res, next) {
		const message = verifyID(req.params.post_id);
		if (typeof message === "string") return res.status(422).json({ error: true, message: message });

		const post = await Post.findById(req.params.post_id);
		if (!post) return res.status(404).json({ error: true, message: "The resource you're looking for is not here anymore!" });
		res.locals.post = post;
		return next();
	},
};
