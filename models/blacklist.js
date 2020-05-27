const mongoose = require('mongoose');

const blacklist = new mongoose.Schema({
  token: String
});

module.exports = mongoose.model('blacklist', blacklist);