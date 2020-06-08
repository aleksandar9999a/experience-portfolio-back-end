const router = require('express').Router();
const models = require('./../models');
const { auth } = require('./../modules');

router.get('/about', auth, (req, res, next) => {
    const user = req.user;
    models.AboutMe.findOne({ creatorId: user._id }).then(info => res.send(info)).catch(next);
});

router.get('/skills', auth, (req, res, next) => {
    const user = req.user;
    models.Skills.findOne({ creatorId: user._id }).then(info => res.send(info)).catch(next);
});

router.get('/projects', auth, (req, res, next) => {
    const user = req.user;
    models.Projects.find({ creatorId: user._id }).then(projects => res.send(projects)).catch(next);
});

router.post('/about', auth, (req, res, next) => {
    const { description, courses } = req.body;
    const user = req.user;
    models.AboutMe.create({ description, courses, creatorId: user._id }).then(info => res.send(info)).catch(next);
})

router.post('/skills', auth, (req, res, next) => {
    const { description, experience } = req.body;
    const user = req.user;
    models.Skills.create({ description, experience, creatorId: user._id }).then(info => res.send(info)).catch(next);
})

router.post('/projects', auth, (req, res, next) => {
    const { title, description, images, link } = req.body;
    const user = req.user;
    models.Projects.create({ title, description, images, link, creatorId: user.id }).then(project => res.send(project)).catch(next);
})

router.put('/about', auth, (req, res, next) => {
    const { id, description, courses, creatorId } = req.body;
    const user = req.user;
    if (user._id.toString() === creatorId) {
        models.AboutMe.updateOne({ _id: id }, { description, courses, creatorId }).then(info => res.send(info)).catch(next);
    } else {
        res.sendStatus(401);
    }
});

router.put('/skills', auth, (req, res, next) => {
    const { id, description, experience, creatorId } = req.body;
    const user = req.user;
    if (user._id.toString() === creatorId) {
        models.Skills.updateOne({ _id: id }, { description, experience, creatorId }).then(info => res.send(info)).catch(next);
    } else {
        res.sendStatus(401);
    }
});

router.put('/projects', auth, (req, res, next) => {
    const { _id, title, description, images, creatorId } = req.body;
    const user = req.user;
    if (user._id.toString() === creatorId) {
        models.Projects.updateOne({ _id }, { title, description, images, creatorId }).then(project => res.send(project)).catch(next);
    } else {
        res.sendStatus(401);
    }
});

router.delete('/projects', auth, (req, res, next) => {
    const id = req.body.id;
    const user = req.user;
    models.Projects.deleteOne({ _id: id, creatorId: user._id}).then(project => {
        res.send(project)
    }).catch(next)
})

module.exports = router;