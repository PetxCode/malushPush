const mongoose = require("mongoose");

const voter = mongoose.Schema({
  who: {
    type: String
  },
  toggle: {
    type: Boolean
  }
});

const presidentModel = mongoose.Schema(
  {
    name: {
      type: String
    },
    position: {
      type: String,
      default: "President"
    },
    avatar: {
      type: String
    },
    voteCount: [voter]
  },
  { timestamps: true }
);

module.exports = mongoose.model("presidents", presidentModel);
