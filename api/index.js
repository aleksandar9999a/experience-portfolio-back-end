const router = require('express').Router();
const pagesRouter = require('./pages');

router.use('/pages', pagesRouter);
module.exports = router;