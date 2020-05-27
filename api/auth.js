const router = require('express').Router();
const config = require('./../environments/environments');
const models = require('./../models/');
const modules = require('./../modules');
const { auth } = require('./../modules');

router.get('/', (req, res, next) => {
    const token = req.cookies[config.authCookieName];

    Promise.all([modules.jwt.verifyToken(token), models.Blacklist.findOne({ token })])
        .then(([data, blacklistToken]) => {
            if (!!blacklistToken) { return Promise.reject(new Error('Token is in blacklist!')) }
            return models.User.findById(data.id);
        })
        .then(user => {
            if (user) {
                res.send(user);
                return;
            }
            res.send(null);
        })
        .catch(err => {
            if (err.message === 'jwt must be provided') {
                res.send(null);
                return;
            }
            next(err);
        });
});

router.get('/main', (req, res, next) => {
    models.User.find()
        .then(users => {
            if (!!users[0]) {
                let user = users[0];
                res.send({
                    firstName: user.firstName,
                    lastName: user.lastName,
                    devType: user.devType
                });
                return;
            }
            res.sendStatus(404);
            return;
        })
        .catch(next);
});

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
        res.send({ user });
    }).catch(next);
})

router.put('/update', auth, (req, res, next) => {
    const { id, firstName, lastName, devType } = req.body;
    models.User.updateOne({ _id: id }, { firstName, lastName, devType }).then(user => res.send(user)).catch(next);
})

module.exports = router;