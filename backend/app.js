require("dotenv/config");
var express = require("express");
var app = express();
var port = process.env.PORT || 3000;
var bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var QuestionRoute = require("./routes/Questions");

app.get("/", (req, res) => {
  res.send("Goto to the following route -> '/api/question' ");
});

app.use("/api/question", QuestionRoute);
app.use('/api/code',CodeRoutes);

//SERVER PORT
app.listen(port, () => {
  console.log("Server started");
});
