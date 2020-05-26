const router = require('express').Router();
const pagesRouter = require('./pages');
const authRouter = require('./auth');

router.use('/auth', authRouter);
router.use('/pages', pagesRouter);
module.exports = router;