const {} = require("../models/post");
const { Post } = require("../models/post");

module.exports = {
	async createOrUpdatePost(req, res) {
		let post = res.locals.post;
		if (!post) post = new Post();
		post.text = req.body.text ? req.body.text : post.text;
		await post.save(req);
		return res.json(post);
	},
	getPostById(req, res) {
		const post = res.locals.post;
		return res.json(post);
	},
	getAllPosts(req, res) {
		const posts = res.locals.posts;
		return res.json(posts);
	},
	async deletePost(req, res) {
		const post = res.locals.post;
		if (String(post.user._id) === String(req.user._id)) {
			await post.deleteOne();
			return res.json({ success: true, message: "Post was successfully removed!" });
		}
		return res.status(403).json({ error: true, message: "You don't have the right permission to do this!" });
	},
};
