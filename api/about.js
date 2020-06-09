const router = require('express').Router();
const models = require('./../models');
const { auth } = require('./../modules');

router.get('/about', auth(false), (req, res, next) => {
    const user = req.user;
    models.AboutMe.findOne({ creatorId: user._id }).then(info => res.send(info)).catch(next);
});

router.post('/about', auth(false), (req, res, next) => {
    const { description, courses } = req.body;
    const user = req.user;
    models.AboutMe.create({ description, courses, creatorId: user._id }).then(info => res.send(info)).catch(next);
})

router.put('/about', auth(false), (req, res, next) => {
    const { id, description, courses, creatorId } = req.body;
    const user = req.user;
    if (user._id.toString() === creatorId) {
        models.AboutMe.updateOne({ _id: id }, { description, courses, creatorId }).then(info => res.send(info)).catch(next);
    } else {
        res.sendStatus(401);
    }
});

module.exports = router;