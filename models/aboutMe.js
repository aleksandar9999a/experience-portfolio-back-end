const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const aboutMeSchema = new Schema({
  description: {
    type: String,
    required: true
  },
  courses: {
    type: Array,
    required: true
  }
});

module.exports = mongoose.model('AboutMe', aboutMeSchema);