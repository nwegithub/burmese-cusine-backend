const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Favorite schema
const EthnicalfavoriteSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'user' },
  productId: { type: Schema.Types.ObjectId, ref: 'Ethnical' },
  createdAt: { type: Date, default: Date.now }
});

const EthnicalFavorite = mongoose.model('EthnicalFavorite', EthnicalfavoriteSchema);


module.exports = EthnicalFavorite