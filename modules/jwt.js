const config = require('./../environments/environments');
const jwt = require('jsonwebtoken');

module.exports = {
    create: function (data) {
        return new Promise((resolve, reject) =>
            jwt.sign(data, config.secret, { expiresIn: '2 days' }, (err, token) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(token);
            }));
    },
    verify: function (token) {
        return new Promise((resolve, reject) => {
            jwt.verify(token, config.secret, (err, data) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(data);
            });
        });
    }
};