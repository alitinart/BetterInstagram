const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");
const authenticateToken = require("../../../middleware/authenticateToken");
const checkAPIKey = require("../../../middleware/checkAPIKey");
const tokenProvider = require("../../../services/tokenProvider");
const User = mongoose.model("User");

const cloudinary = require("cloudinary").v2;
const fs = require("fs");

require("dotenv").config();

router.use("/auth", require("./auth"));

/**
 *
 * Get Users
 * Method: GET
 *
 */

router.get("/", checkAPIKey, async (req, res) => {
  User.find({}).then((users) => {
    res.json({ error: false, data: [...users], message: "All users returned" });
  });
});

/**
 *
 * Sync User
 * Method: GET
 *
 */

router.get("/sync", checkAPIKey, authenticateToken, (req, res) => {
  User.findOne({ _id: req.user._id }).then((user) => {
    const newToken = tokenProvider(user);
    res.json({
      error: false,
      data: { user, token: newToken },
      message: "User Synced",
    });
  });
});

/**
 *
 * Search Users
 * Method: GET
 *
 */

router.get("/search/:query", checkAPIKey, (req, res) => {
  User.find({
    username: req.params.query,
  })
    .then((users) => {
      let results = [];
      users.forEach((user) => {
        results.push({
          email: user.email,
          username: user.username,
          profileImage: user.profileImage,
          name: user.name,
          lastName: user.lastName,
        });
      });
      res.json({
        error: false,
        message: "Users Returned",
        data: { results },
      });
    })
    .catch((err) => {
      res.json({
        error: true,
        message: err.message,
        data: { ...err },
      });
    });
});

/**
 *
 * Get User by id
 * Method: GET
 *
 */

router.get("/:id", checkAPIKey, (req, res) => {
  User.findOne({ _id: req.params.id }).then((user) => {
    if (!user) {
      return res.json({
        error: true,
        message: "No user found with that ID",
        data: {},
      });
    }

    res.json({ error: false, message: "User Found", data: { user } });
  });
});

// UPDATE USER INFO REQUESTS
// TODO: Add update user profile picture request, change info (email, username, first name etc...) requests

/**
 *
 * Change Profile Picture
 * Method: POST
 *
 */

router.post("/change/pfp", checkAPIKey, authenticateToken, (req, res) => {
  cloudinary.uploader.upload(
    req.files.file.tempFilePath,
    {
      public_id: req.files.file.name,
    },
    async (error, result) => {
      if (error)
        res.json({ error: true, data: { ...error }, message: error.message });
      fs.unlinkSync(req.files.file.tempFilePath);
      User.findOneAndUpdate(
        { _id: req.user._id },
        { $set: { profileImage: result.url } }
      )
        .then(() => {
          res.json({
            error: false,
            message: "Changed Profile Image Successfully",
            data: {},
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

module.exports = router;
