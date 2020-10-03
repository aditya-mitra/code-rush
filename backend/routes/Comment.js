var express = require("express");
var router = express.Router();
var db = require("../models");

//++++++++++++++++++
//COMMENT ROUTE
//++++++++++++++++++

router.get("/comments", function (req, res, next) {
  db.Comments.find()
    .then((comments) => res.json(comments))
    .catch((err) => next(err));
});

//POST ROUTE
router.post("/:questionId/comments", function (req, res, next) {
  db.Question.findById(req.params.questionId, function (err, questions) {
    if (err) {
      next(err);
    } else {
      db.Comments.create(req.body, function (err1, newComment) {
        if (err1) {
          console.log(err1);
        } else {
          res.json(newComment);
          questions.comments.push(newComment._id);
          questions.save();
        }
      });
    }
  });
});

//FIND ANY SPECIFIC COMMENT
router.get("/comments/:commentId", function (req, res, next) {
  db.Comments.findById(req.params.commentId)
    .then((foundComments) => res.json(foundComments))
    .catch((err) => next(err));
});

//UPDATE ROUTE

router.put("/:questionId/comments/:commentId", function (req, res, next) {
  db.Question.findById(req.params.questionId, function (err, questions) {
    if (err) {
      next(err);
    } else {
      db.Comments.findOneAndUpdate({ _id: req.params.commentId }, req.body, {
        new: true,
      })
        .then(function (updatedComment) {
          res.json(updatedComment);
        })
        .catch(function () {
          next(err);
        });
    }
  });
});

//DELETE ROUTE
router.delete("/comments/:commentId", function (req, res, next) {
  db.Comments.remove({ _id: req.params.commentId })
    .then(function () {
      res.json({ message: "we deleted it!" });
    })
    .catch(function (err) {
      next(err);
    });
});

// router.delete("/:questionId/comments/:commentId", function (req, res) {
//   db.Question.findById(req.params.questionId, function (err, questions) {
//     if (err) {
//       console.log(err);
//     } else {
//       db.Comments.findByIdAndRemove({ _id: req.params.commentId })
//         .then(function () {
//           res.json({ message: "we deleted it!" });
//         })
//         .catch(function (err) {
//           res.send(err);
//         });
//     }
//   });
// });

module.exports = router;
