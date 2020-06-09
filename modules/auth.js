const jwt = require('./jwt');
const models = require('../models');
const config = require('./../environments/environments');

module.exports = function (shouldBeAdmin) {
    return (req, res, next) => {
        const token = req.cookies[config.authCookieName] || '';
        Promise.all([jwt.verifyToken(token), models.Blacklist.findOne({ token })])
            .then(([data, blacklistToken]) => {
                if (!!blacklistToken) { return Promise.reject(new Error('Token is in blacklist!')) }
                return models.User.findById(data.id);
            })
            .then(user => {
                if (!user) { return Promise.reject(new Error('User is unknown!')) }
                if (shouldBeAdmin && !user.isAdmin) { return Promise.reject(new Error('User must be admin!')) }
                req.user = user;
                next();
            })
            .catch(err => {
                const errors = ['Token is in blacklist!', 'User is unknown!', 'jwt must be provided'];
                if (errors.includes(err.message)) {
                    res.send(null);
                    return;
                }
    
                next(err);
            });
    }
}