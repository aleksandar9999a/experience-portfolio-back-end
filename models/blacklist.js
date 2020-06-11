const mongoose = require('mongoose');

const blacklist = new mongoose.Schema({
  token: String
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

module.exports = mongoose.model('blacklist', blacklist);