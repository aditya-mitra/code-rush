const { Router } = require('express');
const router = Router();
const  db = require('../../models');

router.get('/count', function (req, res, next) {

    db.User.count({})
        .then(count => {
            res.json({ count });
        })
        .catch(e => {
            next(e);
        });

})


module.exports = router;