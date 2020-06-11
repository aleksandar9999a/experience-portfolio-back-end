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
  },
  creatorId: {
    type: String,
    required: true
  },
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

module.exports = mongoose.model('Skills', skillsSchema);