const env = process.env.NODE_ENV || 'development';
const config = {
    development: {
        port: process.env.PORT || 4000,
        dbConnectConfig: { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true },
        dbURL: 'mongodb://localhost:27017/experience-portfolio',
        secret: 'qkoedasiumen',
        authCookieName: 'auth_cookie',
        mainUserId: '5eccc82697bf9a2898ee6395',
        defaultSkills: '5ecc993d34da541ecc689b24',
        defaultAbout: '5ecc9540c35fce1ba434061f'
    },
    production: {}
};

module.exports = config[env];