const router = require('express').Router();
const config = require('./../environments/environments');
const models = require('./../models/');
const modules = require('./../modules');
const { auth } = require('./../modules');

function sendUser(res, isLogged) {
    return models.User.find().then(users => {
        if (!!users[0]) {
            let user = users[0];
            res.send({
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                devType: user.devType,
                _id: user._id,
                isLogged
            });
            return;
        }
        res.sendStatus(404);
        return;
    })
}

router.get('/', (req, res, next) => {
    const token = req.cookies[config.authCookieName];
    
    Promise.all([modules.jwt.verifyToken(token), models.Blacklist.findOne({ token })])
        .then(([data, blacklistToken]) => {
            if (!!blacklistToken) { return Promise.reject(new Error('Token is in blacklist!')) }
            return sendUser(res, true);
        })
        .catch(err => {
            const errors = ['jwt must be provided', 'Token is in blacklist!']
            if (errors.includes(err.message)) {
                return sendUser(res, false);
            }
            next(err);
        });
});

router.get('/logout', (req, res, next) => {
    const token = req.cookies[config.authCookieName];
    models.Blacklist.create({ token }).then(() => {
        res.clearCookie(config.authCookieName);
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