const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");
const checkAPIKey = require("../../../middleware/checkAPIKey");
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
  const users = User.find({});
  res.json({ error: false, data: [...users], message: "All users returned" });
});

module.exports = router;
