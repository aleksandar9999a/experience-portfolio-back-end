const mongoose = require('mongoose');
const config = require('./environments/environments');

module.exports = mongoose.connect(config.dbURL, { useNewUrlParser: true });