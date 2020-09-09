var express = require("express");
var app = express();
var port = process.env.PORT || 3000;
var bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv/config");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var QuestionRoute = require("./routes/Questions");

app.get("/", (req, res) => {
  res.send("Goto to the following route -> '/api/question' ");
});

app.use("/api/question", QuestionRoute);

//SERVER PORT

app.listen(port, () => {
  console.log("Server started");
});
