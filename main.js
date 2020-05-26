const config = require('./environments/environments');
const cookieParser = require('cookie-parser');
const express = require('express');
const cors = require('cors');
const apiRouter = require('./api');

const app = express();

app.use(cors({ origin: config.port, credentials: true }));
app.set('json replacer', (key, value) => key === 'password' ? undefined : value);
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(config.secret));
app.use(express.json());
app.use('/api', apiRouter);

app.listen(config.port, console.log(`Listening on port ${config.port}! Now its up to you...`));