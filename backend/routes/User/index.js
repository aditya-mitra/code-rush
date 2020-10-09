const { Router } = require('express');
const router = Router();

const countRoute = require('./count');

router.get('/count', countRoute);

module.exports = router;