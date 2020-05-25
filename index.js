const config = require('./environments/environments');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const express = require('express');
const path = require('path');
const secret = 'maina';

global.__basedir = __dirname;


function routes(app) {
    
}

mongoose.connect(config.dbURL).then(() => {
    const app = express();
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser(secret));
    app.set('views', path.resolve(__dirname, 'views'));

    routes(app);

    app.listen(config.port, console.log(`Listening on port ${config.port}! Now its up to you...`));
}).catch(console.error);