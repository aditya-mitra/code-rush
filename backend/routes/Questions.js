var express = require("express");
var router = express.Router();
var db = require("../models");

//GET ROUTE(TO GET ALL QUESTION api's)
router.get("/", function (req, res) {
  db.Question.find()
    .then(function (questions) {
      res.json(questions);
    })
    .catch(function (err) {
      console.log(err);
    });
});

//POST ROUTE(TO POST A QUESTION)
router.post("/", function (req, res) {
  db.Question.create(req.body)
    .then(function (newQuestion) {
      res.json(newQuestion);
    })
    .catch(function (err) {
      console.log(err);
    });
});

//GET PERTICULAR TOPIC ROUTE
//this route will have questions of the perticular topic (not implemented in V1.0)
router.get("/:questionId", function (req, res) {
  db.Question.findById(req.params.questionId)
    .populate("answers")
    .exec(function (err, foundQuestion) {
      if (err) {
        console.log(err);
      } else {
        res.json(foundQuestion);
      }
    });
});

//ANSWERS

// router.get("/answer", function (req, res) {
//   db.Answer.find()
//     .then(function (answer) {
//       res.json(answer);
//     })
//     .catch(function (err) {
//       console.log(err);
//     });
// });

//TO POST A ANSWER
router.post("/:questionId/answer", function (req, res) {
  db.Question.findById(req.params.questionId, function (err, question) {
    if (err) {
      console.log(err);
    } else {
      db.Answer.create(req.body, function (err1, newAnswer) {
        if (err1) {
          console.log(err1);
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
