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
  },
  creatorId: {
    type: String,
    required: true
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

module.exports = mongoose.model('AboutMe', aboutMeSchema);