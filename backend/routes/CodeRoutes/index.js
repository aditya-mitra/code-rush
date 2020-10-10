const { Router } = require("express");
const router = Router();

var db = require("../../models");
const submitRoute = require("./submit");
const runRoute = require("./run");

router.use((req, res, next) => {

    const useremail = req.body.useremail;
    console.log("the authorization headers are", req.headers.authorization, "and the headers are", req.headers, "these are");
    db.User.findOne({ email: useremail })
        .then(user => {
            if (!user) {
                res.json({ message: "You are not registered.\n Please sigin to save your points" }); // won't be needed because authentication has already been checked
            } else {
                next();
            }
        })
        .catch((e) => next(e));
    
});

router.use("/submit", submitRoute);
router.use("/run", runRoute);

module.exports = router;