const mongoose = require("mongoose");
const { Schema } = mongoose;

const likeSchema = new Schema(
	{
		user: {
			type: Schema.Types.ObjectId,
			ref: "Comment",
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
module.exports.Like = mongoose.model("Like", likeSchema);
