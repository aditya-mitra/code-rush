const { Router } = require("express");
var db = require("../../models");
const router = Router();

router.get("/", function (req, res, next){

    db.Solved.find()
    .sort({ points: -1 })
    .limit(10)
    .populate('userid')
    .then(function(solutions){

        let leads = [];  // creating a new array to store the values of points and emails in descending order
        
        solutions.forEach(function(x){
            var obj = new Object();    
            let lead = JSON.stringify(x);
            lead = JSON.parse(lead);
            obj.points = lead.points;     //storing points in object
            obj.email = lead.userid.email;   //storing emails in object. 
            leads.push(obj);    //pushing the object into the array.
           
        });
       // console.log(leads);     
        //console.log(solutions);
      res.json({leaderboard: leads});
    //res.send('done');
    })
    .catch(function (err) {
        next(err);
    });
});

module.exports = router;