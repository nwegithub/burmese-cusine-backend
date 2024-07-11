const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
    name: { type: String, required: true, unique: true },
    name_mm: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    recipe: { type: String, required: true },
    recipe_mm: { type: String, required: true },
    ingredients: [
        {
            name: { type: String, required: true },
            amount: { type: String, required: true },
            unit: {type: String, required: true}
        }
    ],
    ingredients_mm: [
        {
            name: { type: String, required: true },
            amount: { type: String, required: true },
            unit: {type: String, required: true}
        }
    ],
    category: {type: String, required: true},
    category_mm: {type: String, required: true}
});

const Product = mongoose.model('Products', productSchema);

module.exports = Product;
