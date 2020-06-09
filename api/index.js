const router = require('express').Router();
const authRouter = require('./auth');
const defaultRouter = require('./defaults');
const contactRouter = require('./contact');
const projectsRouter = require('./projects');
const skillsRouter = require('./skills');
const aboutRouter = require('./about');

router.use('/defaults', defaultRouter);
router.use('/auth', authRouter);
router.use('/', contactRouter);
router.use('/', projectsRouter);
router.use('/', skillsRouter);
router.use('/', aboutRouter);
module.exports = router;