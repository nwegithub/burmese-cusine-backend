const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the product schema
const productSchema = new Schema({
    name: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    recipe: { type: String, required: true },
    ingredient: { type: [String], required: true },
    category: {type: String, required: true}
});

// Create the product model
const Product = mongoose.model('Products', productSchema);

// Export the model
module.exports = Product;
