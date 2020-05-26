const config = require('./environments/environments');
const cookieParser = require('cookie-parser');
const express = require('express');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(config.secret));

app.listen(config.port, console.log(`Listening on port ${config.port}! Now its up to you...`));