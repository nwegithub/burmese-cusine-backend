const Product = require('../db/product')
const upload = require('../middleware/upload')
const DB  = require('../db/product')
const helper = require('../utils/helper')


const saveProduct = async (req, res) => {
    upload(req, res, async (err) => {
      if (err) {
        console.error('Upload error:', err.message);
        return res.status(500).json({ message: err });
      }
      if (!req.file) {
        console.warn('No file selected');
        return res.status(400).json({ message: 'No file selected' });
      }
      try {
        const ingredients = JSON.parse(req.body.ingredients);
        const ingredients_mm = JSON.parse(req.body.ingredients_mm);
  
        if (!Array.isArray(ingredients) || !Array.isArray(ingredients_mm)) {
          console.warn('Invalid ingredients format');
          return res.status(400).json({ message: 'Ingredients should be arrays' });
        }
  
        const isValidIngredient = (ingredient) => {
          return ingredient.name && typeof ingredient.name === 'string' &&
                 ingredient.amount && typeof ingredient.amount === 'string' &&
                 ingredient.unit && typeof ingredient.unit === 'string';
        };
  
        if (!ingredients.every(isValidIngredient) || !ingredients_mm.every(isValidIngredient)) {
          console.warn('Invalid ingredient format');
          return res.status(400).json({ message: 'Invalid ingredient format' });
        }
  
        const newProduct = new Product({
          name: req.body.name,
          name_mm: req.body.name_mm,
          image: req.file.path,
          recipe: req.body.recipe,
          recipe_mm: req.body.recipe_mm,
          ingredients,
          ingredients_mm,
          category: req.body.category,
          category_mm: req.body.category_mm
        });
  
        const savedProduct = await newProduct.save();
        console.log('Product saved:', savedProduct);
  
        res.status(201).json({
          message: 'Product created successfully',
          data: savedProduct
        });
      } catch (error) {
        console.error('Error saving product:', error.message);
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
    });
  };
  

const allProduct = async(req,res,next) => {
    let product = await DB.find();
    helper.fMsg(res,"All product",product)
}
const deleteProduct = async (req, res) => {
    try {
        const product = await DB.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        await DB.deleteOne({ _id: req.params.id });
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateProductById = async (req, res) => {
  try {
      const { id } = req.params;
      const updatedProduct = await DB.findByIdAndUpdate(id, req.body, { new: true });
      if (!updatedProduct) {
          return res.status(404).json({ message: 'Product not found' });
      }
      res.status(200).json(updatedProduct);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};

module.exports = {
    saveProduct,allProduct,deleteProduct,updateProductById
};
