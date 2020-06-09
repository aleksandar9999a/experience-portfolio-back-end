const router = require('express').Router();
const models = require('./../models/');
const config = require('./../environments/environments');

router.get('/', (req, res, next) => {
    models.User.findById(config.mainUserId).then(user => res.send(user)).catch(next);
});

router.get('/about', (req, res, next) => {
    models.AboutMe.findById(config.defaultAbout).then(info => res.send(info)).catch(next);
});

router.get('/skills', (req, res, next) => {
    models.Skills.findById(config.defaultSkills).then(info => res.send(info)).catch(next);
});

router.get('/projects', (req, res, next) => {
    models.Projects.find({ creatorId: config.mainUserId}).then(projects => res.send(projects)).catch(next);
});

router.get('/projects/:id', (req, res, next) => {
    const { id } = req.params;
    models.Projects.findById(id).then(projects => res.send(projects)).catch(next);
});

module.exports = router;