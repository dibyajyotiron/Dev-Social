const mongoose = require("mongoose");
const { Schema } = mongoose;

const commentSchema = new Schema(
	{
		uid: String,
		text: { type: String, trim: true, required: true },
		_parentCommentId: {
			type: String,
		},
		user: {
			type: Schema.Types.ObjectId,
			ref: "User",
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

commentSchema.pre("find", function(next) {
	this.populate({
		path: "user",
	});
	next();
});
commentSchema.pre("findOne", function(next) {
	this.populate({
		path: "user",
	});
	next();
});

module.exports.Comment = mongoose.model("Comment", commentSchema);
