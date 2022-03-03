const mongoose = require("mongoose");

const voter = mongoose.Schema({
  who: {
    type: String
  },
  toggle: {
    type: Boolean
  }
});

const secretaryModel = mongoose.Schema(
  {
    name: {
      type: String
    },
    position: {
      type: String,
      default: "Secretary"
    },
    avatar: {
      type: String
    },
    voteCount: [voter]
  },
  { timestamps: true }
);

module.exports = mongoose.model("secretaries", secretaryModel);
