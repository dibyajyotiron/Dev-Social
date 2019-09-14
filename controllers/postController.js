const { Post } = require("../models/post");
const { Comment } = require("../models/comment");

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
	async addOrUpdateOrDeleteCommentToPost(req, res) {
		if (req.method === "DELETE") {
			await Comment.findByIdAndRemove(req.params.comment_id);
			return res.json({ success: true, message: "Successfully removed the comment!" });
		}
		let { text, name } = req.body;
		let comment;
		if (req.url.split("/").includes("update")) {
			comment = res.locals.comment;
		} else comment = new Comment();
		comment.text = text || comment.text;
		comment.name = name || comment.name;
		await comment.save(req);
		return res.json({ success: true, message: "Successfully submitted comment!" });
	},
	async getCommentOnPost(req, res, next) {
		let pageNumber = req.query.pageNumber || 1;
		let nPerPage = req.query.nPerPage || 10;
		const comments = await Comment.find({ _post: req.params.post_id })
			.skip(pageNumber > 0 ? (pageNumber - 1) * nPerPage : 0)
			.limit(nPerPage);
		return res.send(comments);
	},
};
