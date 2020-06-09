const env = process.env.NODE_ENV || 'development';
const config = {
    development: {
        port: process.env.PORT || 4000,
        dbConnectConfig: { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true },
        dbURL: 'mongodb://localhost:27017/experience-portfolio',
        secret: 'qkoedasiumen',
        authCookieName: 'auth_cookie',
        mainUserId: '5eccc82697bf9a2898ee6395'
    },
    production: {}
};

module.exports = config[env];