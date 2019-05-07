const mongoose = require("mongoose");
const { Schema } = mongoose;

const educationSchema = new Schema(
	{
		school: {
			type: String,
			required: true,
		},
		degree: {
			type: String,
			required: true,
		},
		fieldOfStudy: {
			type: String,
			required: true,
		},
		from: {
			type: Date,
			required: true,
		},
		to: {
			type: Date,
		},
		current: {
			type: Boolean,
			default: false,
		},
		description: {
			type: String,
		},
	},
	{ _id: false },
);
const experienceSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
		},
		company: {
			type: String,
			required: true,
		},
		location: {
			type: String,
		},
		from: {
			type: Date,
			required: true,
		},
		to: {
			type: Date,
		},
		current: {
			type: Boolean,
			default: false,
		},
		description: {
			type: String,
		},
	},
	{ _id: false },
);
module.exports = {
	educationSchema,
	experienceSchema,
};
