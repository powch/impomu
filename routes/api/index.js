const router = require('express').Router();
const userRoutes = require('./users');

router.use('/image', userRoutes);

module.exports = router;
