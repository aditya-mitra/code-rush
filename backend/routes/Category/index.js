var express = require("express");
var router = express.Router();
var db = require("../../models");
var getQuestionsByCategory = require('./get');

router.use('/get', getQuestionsByCategory);

router.get("/", function (req, res, next) {
    db.Category.find()
        .lean()
        .then((category) => res.json(category))
        .catch((err) => next(err));
});

// //POST ROUTE
// router.post("/:questionId/category", function (req, res, next) {
//     db.Question.findById(req.params.questionId, function (err, questions) {
//         if (err) {
//             next(err);
//         } else {
//             db.Category.create(req.body, function (err1, newCategory) {
//                 if (err1) {
//                     next(err1);
//                 } else {
//                     res.json(newCategory);
//                     questions.category.push(newCategory._id);
//                     questions.save();
//                 }
//             });
//         }
//     });
// });

module.exports = router;
