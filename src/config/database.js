const mongoose = require("mongoose");
require("dotenv").config();

mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGO_CONNECT, (err, db) => {
  if (!err) {
    console.log("Successfully connected to MongoDB :)");
  } else {
    console.log("Error in connection " + err);
  }
});

require("../models/User.model");
require("../models/Post.model");
