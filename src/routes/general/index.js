const express = require("express");
const router = express.Router();
require("dotenv").config();

router.use("/users", require("./users/index"));
router.use("/posts", require("./posts/index"));

module.exports = router;
