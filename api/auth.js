const router = require('express').Router();
const config = require('./../environments/environments');
const models = require('./../models/');
const modules = require('./../modules');
const { auth } = require('./../modules');

router.get('/', auth(false), (req, res, next) => {
    const user = req.user;
    models.User.findById(user._id).then(u => res.send(u)).catch(next);
});

router.put('/', auth(false), (req, res, next) => {
    const user = req.user;
    const { firstName, lastName, devType } = req.body;
    models.User.updateOne({ _id: user._id }, { firstName, lastName, devType, isAdmin: user.isAdmin }).then(u => res.send(u)).catch(next);
})

router.put('/setAdmin', auth(true), (req, res, next) => {
    const { _id, isAdmin } = req.body;
    models.User.findById(_id).then(user => {
        return models.User.updateOne({ _id }, { ...user, isAdmin });
    }).then(u => res.send(u)).catch(next);
})

router.get('/logout', (req, res, next) => {
    const token = req.cookies[config.authCookieName];
    models.Blacklist.create({ token }).then(() => {
        res.clearCookie(config.authCookieName);
        res.send(null);
    }).catch(next);
});

router.post('/register', (req, res, next) => {
    const { email, password, firstName, lastName, devType } = req.body;
    models.User.create({ email, password, firstName, lastName, devType }).then(user => res.send(user)).catch(next);
})

router.post('/login', (req, res, next) => {
    const { email, password } = req.body;
    models.User.findOne({ email, password }).then(user => {
        if (!user) { return Promise.reject(new Error('Wrong email or password')); }
        return Promise.all([user, modules.jwt.create({ id: user._id })]);
    }).then(([user, token]) => {
        res.cookie(config.authCookieName, token, { httpOnly: true });
        res.send(user);
    }).catch(err => {
        if (err.message === 'Wrong email or password') {
            res.sendStatus(404);
            return;
        }
        next(err);
    });
})

module.exports = router;