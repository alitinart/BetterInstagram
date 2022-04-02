const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");
const authenticateToken = require("../../../middleware/authenticateToken");
const checkAPIKey = require("../../../middleware/checkAPIKey");
const tokenProvider = require("../../../services/tokenProvider");
const User = mongoose.model("User");

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

module.exports = router;
