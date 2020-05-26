const router = require('express').Router();
const models = require('./../models/');
const modules = require('./../modules');

router.get('/', (req, res, next) => {
    models.User.find().then(users => {
        if (!!users[0]) {
            res.send(users[0]);
            return;
        }
        res.send(404);
    }).catch(next);
});

router.post('/register', (req, res, next) => {
    const { email, password, firstName, lastName } = req.body;
    models.User.create({ email, password, firstName, lastName }).then(user => res.send(user)).catch(next);
})

router.post('/login', (req, res, next) => {
    const { email, password } = req.body;
    models.User.findOne({ email, password }).then(user => {
        if (!user) {
            res.send({ error: '[NOT_FOUND]' });
            return;
        }
        return Promise.all([user, modules.jwt.create({ id: user._id })]);
    }).then(([user, token]) => {
        res.cookie('auth_cookie', token, { httpOnly: true });
        res.send({ user });
    }).catch(next);
})

module.exports = router;