const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Favorite schema
const favoriteSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'user' },
  productId: { type: Schema.Types.ObjectId, ref: 'Products' },
  createdAt: { type: Date, default: Date.now }
});

const Favorite = mongoose.model('Favorite', favoriteSchema);

module.exports = Favorite