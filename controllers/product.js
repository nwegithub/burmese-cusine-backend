const Product = require('../db/product')
const upload = require('../middleware/upload')
const DB  = require('../db/product')
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
                    const newProduct = new Product({
                        name: req.body.name,
                        name_mm: req.body.name_mm,
                        image: req.file.path,
                        recipe: req.body.recipe,
                        recipe_mm: req.body.recipe_mm,
                        ingredient: req.body.ingredient,
                        ingredient_mm: req.body.ingredient_mm,
                        category: req.body.category
                    });

                    const savedProduct = await newProduct.save();

                    res.status(201).json({
                        message: 'Product created successfully',
                        data: savedProduct
                    });
                } catch (error) {
                    res.status(500).json({
                        message: 'Error creating product',
                        error: error.message
                    });
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
