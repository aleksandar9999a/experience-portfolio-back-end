const router = require('express').Router();
const pagesRouter = require('./pages');
const authRouter = require('./auth');
const defaultRouter = require('./defaults');
const contactRouter = require('./contact');

router.use('/defaults', defaultRouter);
router.use('/auth', authRouter);
router.use('/', contactRouter);
router.use('/', pagesRouter);
module.exports = router;