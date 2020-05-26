const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectsSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  images: [{ data: Buffer, contentType: String }]
});

module.exports = mongoose.model('Projects', projectsSchema);