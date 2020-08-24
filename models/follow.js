const mongoose = require("mongoose");
const { Schema } = mongoose;

const userFollowSchema = new Schema(
  {
    _user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    _follows: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

userFollowSchema.pre("save", async function (next) {
  if (this.isNew) {
  }
  return next();
});

module.exports.Follow = mongoose.model("Follow", userFollowSchema);
