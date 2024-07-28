const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Favorite schema
const favoriteSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'user' },
  ethnicalId: { type: Schema.Types.ObjectId, ref: 'ethnical' },
  createdAt: { type: Date, default: Date.now }
});

const EthnicalFavorite = mongoose.model('EthnicalFavorite', favoriteSchema);

module.exports = EthnicalFavorite