const express = require("express");
const app = express();

app.use(express.json());

app.use("/api/v2/", require("../routes/index"));

const PORT = process.env.PORT || 8000;
app.listen(PORT, console.log("App listening on port " + PORT));
