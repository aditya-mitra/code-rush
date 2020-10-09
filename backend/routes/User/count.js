const { Router } = require('express');
const router = Router();
const  db = require('../../models');

router.get('/', function (req, res, next) {

    db.User.countDocuments({})
        .then(count => {
            res.json({ count });
        })
        .catch(e => {
            next(e);
        });

})


module.exports = router;