const router = require('express').Router();
const models = require('./../models/');
const config = require('./../environments/environments');

router.get('/', (req, res, next) => {
    models.User.findById(config.mainUserId).then(user => {
        if (!!user) {
            res.send({
                firstName: user.firstName,
                lastName: user.lastName,
                devType: user.devType
            });
            return;
        }
        res.sendStatus(404);
        return;
    }).catch(next);
});

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

module.exports = router;