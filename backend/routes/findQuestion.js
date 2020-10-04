var express = require("express");
var router = express.Router();
var db = require("../models");

var cppArr = new Array();
var javaArr = new Array();
var jsArr = new Array();

router.get("/cpp", function (req, res, next) {
  db.Question.find()
    .then((question) => {
      if (question.category === "C++") {
        cppArr.push(question);
      }
    })
    .catch((err) => next(err));
});

router.get("/java", function (req, res, next) {
  db.Question.find()
    .then((question) => {
      if (question.category === "Java") {
        javaArr.push(question);
      }
    })
    .catch((err) => next(err));
});

router.get("/javaScript", function (req, res, next) {
  db.Question.find()
    .then((question) => {
      if (question.category === "JavaScript") {
        jsArr.push(question);
      }
    })
    .catch((err) => next(err));
});

module.exports = router;
