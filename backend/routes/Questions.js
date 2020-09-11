var express = require("express");
var router = express.Router();
var db = require("../models");

//GET ROUTE(TO GET ALL QUESTION api's)
router.get("/", function (req, res, next) {
  db.Question.find()
    .then(function (questions) {
      res.json(questions);
    })
    .catch(function (err) {
      next(err)
    });
});

//POST ROUTE(TO POST A QUESTION)
router.post("/", function (req, res, next) {
  db.Question.create(req.body)
    .then(function (newQuestion) {
      res.json(newQuestion);
    })
    .catch(function (err) {
      next(err);
    });
});

//GET PERTICULAR TOPIC ROUTE
//this route will have questions of the perticular topic (not implemented in V1.0)
router.get("/:questionId", function (req, res, next) {
  db.Question.findById(req.params.questionId)
    .populate("answers")
    .exec(function (err, foundQuestion) {
      if (err) {
        next(err)
      } else {
        res.json(foundQuestion);
      }
    });
});

//ANSWERS

//TO POST A ANSWER
router.post("/:questionId/answer", function (req, res, next) {
  db.Question.findById(req.params.questionId, function (err, question) {
    if (err) {
      next(err);
    } else {
      db.Answer.create(req.body, function (err1, newAnswer) {
        if (err1) {
          next(err1)
        } else {
          res.json(newAnswer);
          question.answer.push(newAnswer._id);
          question.save();
        }
      });
    }
  });
});

module.exports = router;
