const mongoose = require("mongoose");
const { Schema } = mongoose;

const { educationSchema, experienceSchema } = require("./mixin");

const profileSchema = new Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
		company: {
			type: String,
			trim: true,
		},
		website: {
			type: String,
			trim: true,
		},
		location: {
			type: String,
			trim: true,
		},
		status: {
			type: String,
			trim: true,
			required: true,
		},
		skills: {
			type: [String],
			required: true,
		},
		bio: {
			type: String,
			trim: true,
		},
		githubUsername: {
			type: String,
			trim: true,
		},
		experience: [experienceSchema],
		education: [educationSchema],
		social: {
			youtube: {
				type: String,
			},
			twitter: {
				type: String,
			},
			facebook: {
				type: String,
			},
			linkedin: {
				type: String,
			},
			instagram: {
				type: String,
			},
		},
	},
	{ timestamps: true },
);

profileSchema.pre("find", function(next) {
	this.populate("user", ["name", "avatar"]);
	next();
});

profileSchema.pre("findOne", function(next) {
	this.populate("user", ["name", "avatar"]);
	next();
});

profileSchema.pre("save", function(next, user) {
	if (this.isNew) {
		this.user = user._id;
	}
	next();
});

module.exports.Profile = mongoose.model("Profile", profileSchema);
