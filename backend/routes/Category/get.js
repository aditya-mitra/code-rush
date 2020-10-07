var express = require("express");
var router = express.Router();
var db = require("../../models");


router.get('/:cname', function (req, res, next) {
    var filteredQuestions = [];
    db.Question.find()
        .populate('category')
        .lean()
        .then(questions => {
            questions.forEach(question => {
                question.category.forEach(c => {
                    if (c.name === req.params.cname)
                        filteredQuestions.push(question);
                })
            })
        })
        .then(() => {
            res.json({ questions: filteredQuestions });
        })
        .catch(e => next(e));
})

module.exports = router;