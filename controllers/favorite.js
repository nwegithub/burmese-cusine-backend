const helper = require('../utils/helper')
const User = require('../db/user')
const Product = require('../db/product')
const Favorite = require('../db/favorite')
const mongoose = require('mongoose');

mongoose.set('strictPopulate', false);


const addFavoriteProduct = async (req, res) => {
    try {
      const { userId, productId } = req.body;
  
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      const user = await User.findById(userId);
      if (user) {
        user.favorites.push(productId);
        await user.save();
         res.status(200).json({ message: 'Favorite added successfully to user' });
      }
  
      const favorite = new Favorite({
        userId: userId,
        productId: productId
      });
      await favorite.save();

  
      res.status(200).json({ message: 'Favorite added successfully to fav' });
    } catch (error) {
      console.error('Error adding favorite:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };


  const removeFavoriteProduct = async (req, res) => {
    try {
      const { userId, productId } = req.body;
  
      // Remove from the user's favorites (if using embedded array)
      const user = await User.findByIdAndUpdate(
        userId,
        { $pull: { favorites: productId } },
        { new: true }
      );
  
      if (user) {
        return res.status(200).json({ message: 'Favorite removed successfully' });
      }
  
      // Or remove from the favorites collection
      await Favorite.findOneAndDelete({ user: userId, product: productId });
  
      res.status(200).json({ message: 'Favorite removed successfully' });
    } catch (error) {
      console.error('Error removing favorite:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };

  const getUserFavorites = async (req, res) => {
    try {
      const { userId } = req.params;
  
      // If using embedded array
      const user = await User.findById(userId).populate('favorites');
      if (user) {
        return res.status(200).json({ favorites: user.favorites });
      }
  
      // Or if using a separate favorites collection
      const favorites = await Favorite.find({ user: userId }).populate('Products');
      res.status(200).json({ favorites: favorites.map(fav => fav.productId) });
    } catch (error) {
      console.error('Error retrieving favorites:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };

  module.exports ={
    addFavoriteProduct,removeFavoriteProduct,getUserFavorites
  }