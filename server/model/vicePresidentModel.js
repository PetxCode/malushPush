const mongoose = require("mongoose");

const voter = mongoose.Schema({
  who: {
    type: String
  },
  toggle: {
    type: Boolean
  }
});

const vicePresidentModel = mongoose.Schema(
  {
    name: {
      type: String
    },
    position: {
      type: String,
      default: "Vice President"
    },
    avatar: {
      type: String
    },
    voteCount: [voter]
  },
  { timestamps: true }
);

module.exports = mongoose.model("vicePresidents", vicePresidentModel);
