const router = require('express').Router();
const models = require('./../models');
const { auth } = require('./../modules');

router.get('/skills', auth(false), (req, res, next) => {
    const user = req.user;
    models.Skills.findOne({ creatorId: user._id }).then(info => res.send(info)).catch(next);
});

router.post('/skills', auth(false), (req, res, next) => {
    const { description, experience } = req.body;
    const user = req.user;
    models.Skills.create({ description, experience, creatorId: user._id }).then(info => res.send(info)).catch(next);
})

router.put('/skills', auth(false), (req, res, next) => {
    const { id, description, experience, creatorId } = req.body;
    const user = req.user;
    if (user._id.toString() === creatorId) {
        models.Skills.updateOne({ _id: id }, { description, experience, creatorId }).then(info => res.send(info)).catch(next);
    } else {
        res.sendStatus(401);
    }
});

module.exports = router;