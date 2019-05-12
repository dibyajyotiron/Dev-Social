const { PostReaction } = require("../models/postReact");

module.exports = {
	async reactToPost(req, res) {
		const post = res.locals.post;

		const reactors = post.reactions.map(re => String(re.user));

		if (reactors.includes(String(req.user._id))) {
			if (post.reactions.map(re => re.value).includes(String(req.body.reaction))) {
				const reactionId = post.reactions.filter(r => String(r.value) === req.body.reaction && String(r.user) === String(req.user._id)).map(el => el._id)[0];
				await PostReaction.findByIdAndRemove(reactionId, { new: true });

				return res.status(400).json({
					success: true,
					message: "Removed reaction from post!",
				});
			}
			const filteredReaction = post.reactions.filter(r => r.user.equals(req.user._id))[0];
			const updatedReaction = await PostReaction.findByIdAndUpdate(filteredReaction._id, { value: req.body.reaction }, { new: true });
			return res.json(updatedReaction);
		}
		const reaction = new PostReaction({ value: req.body.reaction });
		await reaction.save(req);
		return res.json(post);
	},
};
