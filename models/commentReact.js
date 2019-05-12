const mongoose = require("mongoose");
const { Schema } = mongoose;

const commentReactionSchema = new Schema(
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
		_comment: {
			type: Schema.Types.ObjectId,
			ref: "Comment",
		},
	},
	{ timestamps: true },
);
module.exports.CommentReaction = mongoose.model("CommentReaction", commentReactionSchema);
