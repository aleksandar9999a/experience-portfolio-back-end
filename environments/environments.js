const env = process.env.NODE_ENV || 'development';
const config = {
    development: {
        port: process.env.PORT || 4000,
        dbURL: 'mongodb://localhost:27017/experience-portfolio'
    },
    production: {}
};

module.exports = config[env];