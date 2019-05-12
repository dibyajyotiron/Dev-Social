const mongoose = require("mongoose");
const { Schema } = mongoose;

const postReactionSchema = new Schema(
	{
		user: {
			type: Schema.Types.ObjectId,
			ref: "User",
		},
		value: {
			type: String,
			enum: ["-2", "-1", "0", "1", "2"],
			required: true,
		},
		_post: {
			type: Schema.Types.ObjectId,
			ref: "Post",
		},
	},
	{ timestamps: true },
);

postReactionSchema.pre("save", function(next, req) {
	if (this.isNew) {
		this.user = req.user._id;
		this._post = req.params.post_id;
	}
	return next();
});

module.exports.PostReaction = mongoose.model("PostReaction", postReactionSchema);
