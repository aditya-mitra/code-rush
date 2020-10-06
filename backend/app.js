require("dotenv/config");
var express = require("express");
var app = express();
var cors = require("cors");
var bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var QuestionRoute = require("./routes/Questions");
var CodeRoutes = require("./routes/CodeRoutes");
var LeaderboardRoutes = require("./routes/Leaderboard");
var AdminRoutes = require("./routes/AdminRoutes");
var CommentRoute = require("./routes/Comment");
var CategoryRoute = require("./routes/Category");


app.get("/", (req, res) => {
  res.send("Goto to the following route -> '/api/question' ");
});

app.use("/api/comments", CommentRoute);
app.use("/api/questions", QuestionRoute);
app.use("/api/category", CategoryRoute);


app.use("/api/code", CodeRoutes);
app.use("/api/leaderboard", LeaderboardRoutes);
app.use("/admin", AdminRoutes);

app.use(function (err, req, res, next) {
  console.error("Hit last route -----> ", err);
  res.json({ message: err });
});

//SERVER PORT
var port = process.env.PORT || 9000;
app.listen(port, () => {
  console.log("Server started");
});
