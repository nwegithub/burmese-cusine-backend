const Product = require('../db/ethnical')
const upload = require('../middleware/upload')
const DB  = require('../db/ethnical')
const helper = require('../utils/helper')

const saveProduct = async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(500).json({ message: err });
        } else {
            if (req.file == undefined) {
                return res.status(400).json({ message: 'No file selected' });
            } else {
                try {
                    const ingredients = JSON.parse(req.body.ingredient);
                    const ingredients_mm = JSON.parse(req.body.ingredient_mm);

                    if (!Array.isArray(ingredients) || !Array.isArray(ingredients_mm)) {
                        return res.status(400).json({ message: 'Ingredients should be arrays' });
                    }

                    const isValidIngredient = (ingredient) => {
                        return ingredient.hasOwnProperty('name') && typeof ingredient.name === 'string' &&
                               ingredient.hasOwnProperty('amount') && typeof ingredient.amount === 'string' &&
                               ingredient.hasOwnProperty('unit') && typeof ingredient.unit === 'string';
                    };

                    if (!ingredients.every(isValidIngredient) || !ingredients_mm.every(isValidIngredient)) {
                        return res.status(400).json({ message: 'Invalid ingredient format' });
                    }

                    const newProduct = new Product({
                        name: req.body.name,
                        name_mm: req.body.name_mm,
                        image: req.file.path,
                        recipe: req.body.recipe,
                        recipe_mm: req.body.recipe_mm,
                        ingredients: ingredients,
                        ingredients_mm: ingredients_mm,
                        category: req.body.category,
                        category_mm: req.body.category_mm
                    });

                    const savedProduct = await newProduct.save();

                    res.status(201).json({
                        message: 'Product created successfully',
                        data: savedProduct
                    });
                } catch (error) {
                    if (error instanceof SyntaxError) {
                        res.status(400).json({
                            message: 'Invalid JSON format in ingredients',
                            error: error.message
                        });
                    } else {
                        res.status(500).json({
                            message: 'Error creating product',
                            error: error.message
                        });
                    }
                }
            }
        }
    });
};


const allProduct = async(req,res,next) => {
    let product = await DB.find();
    helper.fMsg(res,"All product",product)
}

module.exports = {
    saveProduct,allProduct
};
