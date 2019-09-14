const mongoose = require("mongoose");
const { Schema } = mongoose;

const commentSchema = new Schema(
	{
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
		_post: {
			type: Schema.Types.ObjectId,
			ref: "Post",
		},
	},
	{ timestamps: true },
);

commentSchema.pre("find", function(next) {
	this.populate({
		path: "_post",
	});
	next();
});
commentSchema.pre("findOne", function(next) {
	this.populate({
		path: "_post",
	});
	next();
});
commentSchema.pre("save", function(next, req) {
	if (this.isNew) {
		this.user = req.user._id;
		this._post = req.params.post_id;
	}
	next();
});
module.exports.Comment = mongoose.model("Comment", commentSchema);
