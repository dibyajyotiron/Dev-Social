const { PostReaction } = require("../../models/postReact");
const { Post } = require("../../models/post");

module.exports = {
	async getPostWithReactions(post_id = null) {
		let result;

		if (post_id) {
			const post = await Post.findById(post_id).lean();
			const reactions = await PostReaction.find({ _post: post_id }).lean();

			result = { ...post, reactions };
		} else {
			const posts = await Post.find({})
				.sort({ createdAt: -1 })
				.lean();
			const postIds = posts.map(post => post._id);
			const reactions = await PostReaction.find({ _post: { $in: postIds } }).lean();

			for (let post of posts) {
				post.reactions = reactions.filter(r => r._post.equals(post._id));
			}
			result = posts;
		}

		return result;
	},
};
