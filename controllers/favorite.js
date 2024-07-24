const helper = require('../utils/helper')
const User = require('../db/user')
const Product = require('../db/product')
const Favorite = require('../db/favorite')
const mongoose = require('mongoose');

mongoose.set('strictPopulate', false);


const addFavoriteProduct = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    // Check if the product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the product is already favorited
    const alreadyFavorited = await Favorite.findOne({ userId, productId });
    if (alreadyFavorited) {
      return res.status(400).json({ message: 'Product already favorited' });
    }

    // Add to user's favorites list
    user.favorites.push(productId);
    await user.save();

    // Save to the Favorite collection
    const favorite = new Favorite({ userId, productId });
    await favorite.save();

    return res.status(200).json({ message: 'Favorite added successfully' });
  } catch (error) {
    console.error('Error adding favorite:', error);
    res.status(500).json({ message: 'Server error' });
  }
};




const removeFavoriteProduct = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    if (!userId || !productId) {
      return res.status(400).json({ message: 'User ID and Product ID are required' });
    }

    // Step 1: Remove the product from the user's favorites array
    const user = await User.findByIdAndUpdate(
      userId,
      { $pull: { favorites: productId } },
      { new: true }
    );

    if (!user) {
      // If user not found, respond with an error
      return res.status(404).json({ message: 'User not found' });
    }

    // Step 2: Remove the corresponding document from the Favorite collection
    await Favorite.findOneAndDelete({ user: userId, product: productId });

    // Check if removal was successful
    const favorite = await Favorite.findOne({ user: userId, product: productId });
    if (!favorite) {
      return res.status(200).json({ message: 'Favorite removed successfully' });
    }

    // If favorite was not removed from the collection, respond with an error
    res.status(500).json({ message: 'Failed to remove favorite from the collection' });
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

  const getAllFavorites = async (req, res) => {
    try {
      const favorites = await Favorite.find(); // Find all favorite documents
      res.status(200).json(favorites); // Send the list of favorites as JSON
    } catch (error) {
      res.status(500).json({ message: 'Server Error', error: error.message });
    }
  };



  module.exports ={
    addFavoriteProduct,removeFavoriteProduct,getUserFavorites,getAllFavorites
  }