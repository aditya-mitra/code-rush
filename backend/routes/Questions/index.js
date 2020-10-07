var express = require("express");
var router = express.Router();
var db = require("../../models");

//GET ROUTE(TO GET ALL QUESTION api's)
router.get("/", function (req, res, next) {
    db.Question.find()
        .populate('category')
        .lean()
        .then(function (questions) {
            for (const question of questions) {
                delete question["answer"];
                delete question["Q_input"];
            }
            res.json(questions);
        })
        .catch(function (err) {
            next(err);
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

router.get("/answers", function (req, res) {
    db.Answer.find()
        .then((answers) => res.json(answers))
        .catch((err) => console.error(err));
});

router.get("/:questionId", function (req, res, next) {
    db.Question.findOne({ Q_id: req.params.questionId })
        .populate("comments")
        .lean()
        .exec(function (err, foundQuestion) {
            if (err) {
                next(err);
            } else {
                delete foundQuestion["answer"];
                delete foundQuestion["Q_input"];
                res.json(foundQuestion);
            }
        });
});

//TO POST A ANSWER
router.post("/:questionId/answer", function (req, res, next) {
    db.Question.findById(req.params.questionId, function (err, question) {
        if (err) {
            next(err);
        } else {
            db.Answer.create(req.body, function (err1, newAnswer, next) {
                if (err1) {
                    next(err1);
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