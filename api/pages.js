const router = require('express').Router();
const models = require('./../models/');
const config = require('./../environments/environments');
const { auth } = require('./../modules');

router.get('/about', (req, res, next) => {
    models.AboutMe.findById(config.defaultAbout)
        .then(info => {
            if (!!info) {
                res.send(info);
                return;
            }
            res.send(404);
        }).catch(next);
});

router.get('/skills', (req, res, next) => {
    models.Skills.findById(config.defaultSkills)
        .then(info => {
            if (!!info) {
                res.send(info);
                return;
            }
            res.send(404);
        }).catch(next);
});

router.get('/projects', (req, res, next) => {
    models.Projects.find().then(projects => res.send(projects)).catch(next);
});

router.post('/about', auth, (req, res, next) => {
    const { description, courses } = req.body;
    models.AboutMe.create({ description, courses }).then(info => res.send(info)).catch(next);
})

router.post('/Skills', auth, (req, res, next) => {
    const { description, experience } = req.body;
    models.Skills.create({ description, experience }).then(info => res.send(info)).catch(next);
})

router.post('/projects', auth, (req, res, next) => {
    const { title, description, images } = req.body;
    models.Projects.create({ title, description, images }).then(project => res.send(project)).catch(next);
})

router.put('/about', auth, (req, res, next) => {
    const { id, description, courses } = req.body;
    models.AboutMe.updateOne({ _id: id }, { description, courses }).then(info => res.send(info)).catch(next);
});

router.put('/Skills', auth, (req, res, next) => {
    const { id, description, experience } = req.body;
    models.Skills.updateOne({ _id: id }, { description, experience }).then(info => res.send(info)).catch(next);
});

router.put('/projects', auth, (req, res, next) => {
    const { id, title, description, images } = req.body;
    models.Projects.updateOne({ _id: id }, { title, description, images }).then(project => res.send(project)).catch(next);
});

module.exports = router;