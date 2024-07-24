
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FeedbackSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'user', required: true },
  comment: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Feedback', FeedbackSchema);
