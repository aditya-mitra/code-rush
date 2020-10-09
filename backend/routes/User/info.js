const { Router } = require('express');
const router = Router();
const db = require('../../models');

router.get("/", async function (req, res, next) {
    const useremail = req.query.email;

    const user = await db.User.findOne({ email: useremail }).lean().catch((e) => next(e));
    if (!user) {
        return res.json({ message: "no such user" });
    }
    const solved = await db.Solved.findOne({ userid: user._id }).lean().catch(e => next(e));

    const stats = {
        solved: solved.qid.length,
        points: solved.points,
    }

    res.json({ stats });

})

module.exports = router;