const mongoose = require("mongoose");
const { Schema } = mongoose;

const postSchema = new Schema(
	{
		user: {
			type: Schema.Types.ObjectId,
			ref: "User",
		},
		text: {
			type: String,
			required: true,
		},
		name: {
			type: String,
		},
		avatar: {
			type: String,
		},
	},
	{ timestamps: true },
);

module.exports.Post = mongoose.model("Post", postSchema);
