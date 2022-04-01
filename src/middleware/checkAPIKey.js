require("dotenv").config();

module.exports = function checkAPIKey(req, res, next) {
  const apiKey = req.headers["x-api-key"];

  if (!apiKey) {
    return res.json({ error: true, message: "No API Key Provided", data: {} });
  }

  if (apiKey !== process.env.API_KEY) {
    return res.json({ error: true, message: "Wrong API Key", data: {} });
  }

  next();
};
