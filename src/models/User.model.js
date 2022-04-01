const mongoose = require("mongoose");

const User = new mongoose.Schema({
  name: {
    type: String,
    required: "This field is required",
  },
  lastName: {
    type: String,
    required: "This field is required",
  },
  email: {
    type: String,
    required: "This field is required",
  },
  password: {
    type: String,
    required: "This field is required",
  },
  username: {
    type: String,
    required: "This field is required",
  },
  posts: {
    type: Array,
  },
  stories: {
    type: Array,
  },
});

mongoose.model("User", User);
