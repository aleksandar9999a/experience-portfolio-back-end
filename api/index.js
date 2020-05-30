const router = require('express').Router();
const pagesRouter = require('./pages');
const authRouter = require('./auth');
const defaultRouter = require('./defaults');

router.use('/defaults', defaultRouter);
router.use('/auth', authRouter);
router.use('/', pagesRouter);
module.exports = router;