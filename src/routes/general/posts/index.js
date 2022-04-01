const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");
const Post = mongoose.model("Post");

require("dotenv").config();

module.exports = router;
