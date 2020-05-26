const router = require('express').Router();
const models = require('./../models/');

router.get('/about', (req, res, next) => {
    models.AboutMe.find().then(info => {
        if (!!info[0]) {
            res.send(info[0]);
            return;
        }
        res.send(404);
    }).catch(next);
});

router.post('/about', (req, res, next) => {
    const { description, courses } = req.body;
    models.AboutMe.create({ description, courses }).then(info => res.send(info)).catch(next);
})

router.put('/about', (req, res, next) => {
    const { id, description, courses } = req.body;
    models.AboutMe.updateOne({ _id: id }, { description, courses }).then(info => res.send(info)).catch(next);
});

router.get('/skills', (req, res, next) => {
    models.Skills.find().then(info => {
        if (!!info[0]) {
            res.send(info[0]);
            return;
        }
        res.send(404);
    }).catch(next);
});

router.post('/Skills', (req, res, next) => {
    const { description, experience } = req.body;
    models.Skills.create({ description, experience }).then(info => res.send(info)).catch(next);
})

router.put('/Skills', (req, res, next) => {
    const { id, description, experience } = req.body;
    models.Skills.updateOne({ _id: id }, { description, experience }).then(info => res.send(info)).catch(next);
});

router.get('/projects', (req, res, next) => {
    models.Projects.find().then(projects => res.send(projects)).catch(next);
});

router.post('/projects', (req, res, next) => {
    const { title, description, images } = req.body;
    models.Projects.create({ title, description, images }).then(project => res.send(project)).catch(next);
})

router.put('/projects', (req, res, next) => {
    const { id, title, description, images } = req.body;
    models.Projects.updateOne({ _id: id }, { title, description, images }).then(project => res.send(project)).catch(next);
});

module.exports = router;