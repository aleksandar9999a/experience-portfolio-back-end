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
    models.User.updateOne({ _id: id }, { description, courses }).then(info => res.send(info)).catch(next);
});

module.exports = router;