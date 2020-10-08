const { Router } = require("express");
var db = require("../../models");
const router = Router();

router.get("/", function (req, res, next) {
    db.Solved.find()
    .sort({ points: -1 })
    .limit(10)
        .populate('userid')
        .lean()
    .then(function(solutions){

        let leads = [];  // creating a new array to store the values of points and emails in descending order

        solutions.forEach(function(lead){
            var obj = new Object();
            obj.points = lead.points;     //storing points in object
            obj.name = lead.userid.name;   //storing names in object.
            leads.push(obj);    //pushing the object into the array.

        });
      res.json({leaderboard: leads});
    })
    .catch(function (err) {
        next(err);
    });
});

module.exports = router;
