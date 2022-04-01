const mongoose = require("mongoose");

const Post = new mongoose.Schema({
  files: {
    type: Array,
    required: "This field is required",
  },
  caption: {
    type: String,
    required: "This field is required",
  },
  location: {
    type: String,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

mongoose.model("Post", Post);
