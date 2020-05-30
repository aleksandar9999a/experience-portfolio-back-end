const router = require('express').Router();
const config = require('./../environments/environments');
const models = require('./../models/');
const modules = require('./../modules');
const { auth } = require('./../modules');

router.get('/', auth, (req, res, next) => {
    const user = req.user;
    models.User.findById(user._id)
        .then(user => {
            if (user) {
                res.send(user);
                return;
            }
            res.send(null);
        })
        .catch(next);
});

router.put('/', auth, (req, res, next) => {
    const user = req.user;
    const { firstName, lastName, devType } = req.body;
    models.User.updateOne({ _id: user._id }, { firstName, lastName, devType })
        .then(u => res.send(u))
        .catch(next);
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
        if (!user) {
            res.sendStatus(404);
            return;
        }
        return Promise.all([user, modules.jwt.create({ id: user._id })]);
    }).then(([user, token]) => {
        res.cookie('auth_cookie', token, { httpOnly: true });
        res.send(user);
    }).catch(next);
})

module.exports = router;