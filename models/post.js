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

postSchema.pre("save", function(next, req) {
	if (this.isNew) {
		this.user = req.user._id;
		this.name = req.user.name;
		this.avatar = req.user.avatar;
	}
	next();
});

module.exports.Post = mongoose.model("Post", postSchema);
