const express = require("express");
const router = express.Router();

const bcrypt = require("bcrypt");

const mongoose = require("mongoose");
const User = mongoose.model("User");

const checkAPIKey = require("../../../middleware/checkAPIKey");
const tokenProvider = require("../../../services/tokenProvider");

require("dotenv").config();

/**
 *
 * Register User
 * Method: POST
 *
 */

router.post("/register", checkAPIKey, async (req, res) => {
  const { email, username, name, lastName, password } = req.body;
  const isUserWithEmail = await User.findOne({ email });
  const isUserWithUsername = await User.findOne({ username });

  if (isUserWithEmail) {
    return res.json({
      error: true,
      message: "There is already a user with that email",
      data: {},
    });
  }

  if (isUserWithUsername) {
    return res.json({
      error: true,
      message: "There is already a user with that username",
      data: {},
    });
  }

  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = new User({
    email,
    name,
    username,
    lastName,
    password: hashedPassword,
  });

  newUser.save();

  res.json({
    error: false,
    message: "Account successfully created",
    data: {},
  });
});

/**
 *
 * Login User
 * Method: POST
 *
 */

router.post("/login", checkAPIKey, async (req, res) => {
  const { username, password } = req.body;
  let user = await User.findOne({ username });

  if (!user) {
    return res.json({
      error: true,
      message: "No user found with that username",
      data: {},
    });
  }

  if (!(await bcrypt.compare(password, user.password))) {
    return res.json({
      error: true,
      message: "That password doesn't belong to this account",
      data: {},
    });
  }

  const accessToken = tokenProvider(user);

  res.json({
    error: false,
    data: { token: accessToken, userObject: user },
    message: "Successfully logged in user",
  });
});

module.exports = router;
