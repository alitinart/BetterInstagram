const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");
const checkAPIKey = require("../middleware/checkAPIKey");

require("dotenv").config();

router.use("/general", require("./general/index"));

router.get("/", checkAPIKey, (req, res) => {
  res.json({
    error: false,
    message: "Connected to Better Instagram API",
    data: {},
  });
});

module.exports = router;
