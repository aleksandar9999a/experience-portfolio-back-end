const config = require('./environments/environments');
const cookieParser = require('cookie-parser');
const express = require('express');
const apiRouter = require('./api');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(config.secret));
app.use(express.json());
app.use('/api', apiRouter);

app.listen(config.port, console.log(`Listening on port ${config.port}! Now its up to you...`));