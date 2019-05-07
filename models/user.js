const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const { Schema } = mongoose;
const jwt = require("jsonwebtoken");

const { secretOrKey } = require("../config/keys");

const userSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		avatar: {
			type: String,
		},
	},
	{ timestamps: true },
);

userSchema.pre("save", async function(next, { password }) {
	if (this.isNew) {
		const salt = await bcrypt.genSalt(10);
		this.password = await bcrypt.hash(password, salt);
	}
	return next();
});

userSchema.methods.generateAuthToken = function() {
	return jwt.sign(
		{
			_id: this._id,
			name: this.name,
			email: this.email,
		},
		secretOrKey,
	);
};

module.exports.User = mongoose.model("User", userSchema);
