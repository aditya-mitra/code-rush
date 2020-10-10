var express = require("express");
var router = express.Router();
var sanitizeHTML = require('sanitize-html');
var db = require("../../models");


router.get("/", function (req, res, next) {
    db.Comments.find()
        .then((comments) => res.json(comments))
        .catch((err) => next(err));
});

//POST ROUTE
router.post("/:questionId", function (req, res, next) {

    if (req.body.C_text) {
        req.body.C_text = sanitizeHTML(req.body.C_text);
    }

    db.Question.findOne({ Q_id: req.params.questionId }, function (err, questions) {
        if (err) {
            next(err);
        } else {
            db.Comments.create(req.body, function (err1, newComment) {
                // req.body expects C_author and C_text
                if (err1) {
                    next(err1);
                } else {
                    res.json(newComment);
                    questions.comments.push(newComment._id);
                    questions.save();
                }
            });
        }
    });
});

module.exports = router;
