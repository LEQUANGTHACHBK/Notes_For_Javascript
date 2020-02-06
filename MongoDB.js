const express = require("express");

const app = express();

app.set("view engine", "ejs");
app.set("views", "./views");
app.set(express.static, "publicMongodb");

//Set Up For mongoodb

const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://LeQuangThach:lequangthach95@clustersthachhaclong-3t8fn.mongodb.net/test?retryWrites=true&w=majority",
  { useUnifiedTopology: true, useNewUrlParser: true },
  function(error) {
    if (!error) {
      console.log("Connect MongoDB Successfully");
    } else {
      console.log("Connection Error " + error);
    }
  }
);

//Views

app.get("/", (req, res) => {
  res.send("Thach");
});
app.listen(3000, "localhost", () => {
  console.log("Running on port " + 3000);
});
