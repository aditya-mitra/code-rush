const { Router } = require('express');
const router = Router();

const countRoute = require('./count');
const infoRoute = require('./info');

router.use('/count', countRoute);
router.use('/info', infoRoute);

module.exports = router;