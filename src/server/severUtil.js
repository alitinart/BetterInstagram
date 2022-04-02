const express = require("express");
const app = express();

const cors = require("cors");

const fileUpload = require("express-fileupload");
const cloudinary = require("cloudinary").v2;

app.use(express.json());
app.use(cors());

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

cloudinary.config({
  cloud_name: "alitinart",
  api_key: "415315537237665",
  api_secret: "lBZqqZZ2AU0bV16WjheUHLRsu0s",
});

app.use("/api/v2/", require("../routes/index"));

const PORT = process.env.PORT || 8000;
app.listen(PORT, console.log("App listening on port " + PORT));
