const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = function generateToken(user) {
  return jwt.sign(user.toJSON(), process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "12h",
  });
};
