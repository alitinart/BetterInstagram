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
  userId: {
    type: String,
  },
  comments: {
    type: Array,
    required: "This field is Required",
  },
  // likes: {
  //   type: Number,
  //   required: "This field is required",
  // },
  // comments: {
  //   type: Number,
  //   required: "This field is required",
  // },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

mongoose.model("Post", Post);
