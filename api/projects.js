const router = require('express').Router();
const models = require('./../models');
const { auth } = require('./../modules');

router.get('/projects', auth(false), (req, res, next) => {
    const user = req.user;
    models.Projects.find({ creatorId: user._id }).then(projects => res.send(projects)).catch(next);
});

router.post('/projects', auth(false), (req, res, next) => {
    const { title, description, images, link } = req.body;
    const user = req.user;
    models.Projects.create({ title, description, images, link, creatorId: user.id }).then(project => res.send(project)).catch(next);
})

router.put('/projects', auth(false), (req, res, next) => {
    const { _id, title, description, images, link, creatorId } = req.body;
    const user = req.user;
    if (user._id.toString() === creatorId) {
        models.Projects.updateOne({ _id }, { title, description, images, link, creatorId }).then(project => res.send(project)).catch(next);
    } else {
        res.sendStatus(401);
    }
});

router.delete('/projects', auth(false), (req, res, next) => {
    const id = req.body.id;
    const user = req.user;
    models.Projects.deleteOne({ _id: id, creatorId: user._id }).then(project => {
        res.send(project)
    }).catch(next)
})

module.exports = router;