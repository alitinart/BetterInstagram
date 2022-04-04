const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");
const authenticateToken = require("../../../middleware/authenticateToken");
const checkAPIKey = require("../../../middleware/checkAPIKey");

const Post = mongoose.model("Post");
const User = mongoose.model("User");

const cloudinary = require("cloudinary").v2;
const fs = require("fs");

require("dotenv").config();

/**
 *
 * Create Post
 * Method: POST
 *
 */

router.post("/", checkAPIKey, authenticateToken, (req, res) => {
  cloudinary.uploader.upload(
    req.files.file.tempFilePath,
    {
      public_id: req.files.file.name,
    },
    async (error, result) => {
      if (error)
        res.json({ error: true, data: { ...error }, message: error.message });
      fs.unlinkSync(req.files.file.tempFilePath);
      let files = [];
      files.push(result.url);
      const newPost = new Post({
        caption: req.body.caption,
        location: req.body.location,
        files,
        userId: req.user._id,
      });

      newPost.save();

      const user = await User.findOne({ _id: req.user._id });
      let posts = user.posts;
      posts.unshift({
        _id: newPost._id,
        imageUrl: result.url,
        caption: newPost.caption,
      });
      User.findOneAndUpdate(
        { _id: req.user._id },
        { $set: { posts: [...posts] } }
      )
        .then(() => {
          res.json({
            error: false,
            data: { ...newPost },
            message: "Created post successfully",
          });
        })
        .catch((err) => {
          res.json({
            error: true,
            message: err.message,
            data: { ...err },
          });
        });
    }
  );
});

/**
 *
 * Get Post by ID
 * Method: GET
 *
 */

router.get("/:id", checkAPIKey, (req, res) => {
  Post.findOne({ _id: req.params.id }).then((post) => {
    if (!post) {
      return res.json({
        error: true,
        message: "No Post found with that ID",
        data: {},
      });
    }

    res.json({ error: false, message: "Post found", data: { post } });
  });
});

module.exports = router;
