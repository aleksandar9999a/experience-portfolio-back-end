const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const skillsSchema = new Schema({
  description: {
    type: String,
    required: true
  },
  experience: {
    type: Array,
    required: true
  }
});

module.exports = mongoose.model('Skills', skillsSchema);