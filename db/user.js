const mongoose = require('mongoose')
const {Schema} = mongoose;

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, unique: true },
    password: { type: String, required: true },
    token: { type: String },
    favorites: [{ type: Schema.Types.ObjectId, ref: 'Products' }],
    ethnicalFavorites: [{ type: Schema.Types.ObjectId, ref: 'Ethnical' }]
});

const User = mongoose.model("User", userSchema);

module.exports = User