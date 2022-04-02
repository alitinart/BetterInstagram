const mongoose = require("mongoose");

const User = new mongoose.Schema({
  profileImage: {
    type: String,
    default:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png",
  },
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
  followers: {
    type: Array,
  },
  following: {
    type: Array,
  },
  bio: {
    type: String,
  },
});

mongoose.model("User", User);
