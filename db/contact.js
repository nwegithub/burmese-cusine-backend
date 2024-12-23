const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    match: [/\S+@\S+\.\S+/, 'is invalid'],
  },
  text: {
    type: String,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Contact', contactSchema);
