const helper = require('../utils/helper')
const User = require('../db/user')
const Ethnical = require('../db/ethnical')
const EthnicalFavorite = require('../db/ethnicalFavorite')
const mongoose = require('mongoose');

mongoose.set('strictPopulate', false);


const addFavoriteProduct = async (req, res) => {
    try {
        const { userId, productId } = req.body;

        const product = await Ethnical.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Ethnical product not found' });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const alreadyFavorited = await EthnicalFavorite.findOne({ userId, productId });
        if (alreadyFavorited) {
            return res.status(400).json({ message: 'Ethnical product already favorited' });
        }

        user.ethnicalFavorites.push(productId);
        await user.save();

        const newEthnicalFavorite = new EthnicalFavorite({ userId, productId });
        await newEthnicalFavorite.save();

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
  
      // Remove the product from the user's ethnicalFavorites array
      const user = await User.findByIdAndUpdate(
        userId,
        { $pull: { ethnicalFavorites: productId } },
        { new: true }
      );
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Remove from the EthnicalFavorite collection
      const result = await EthnicalFavorite.findOneAndDelete({ userId, productId });
  
      if (result) {
        return res.status(200).json({ message: 'Favorite removed successfully' });
      } else {
        return res.status(404).json({ message: 'Favorite not found' });
      }
  
    } catch (error) {
      console.error('Error removing favorite:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  

  const getUserEthnicalFavorites = async (req, res) => {
    try {
      const { userId } = req.params;
  
      const user = await User.findById(userId).populate('ethnicalFavorites');
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(200).json({ favorites: user.ethnicalFavorites });

    } catch (error) {
      console.error('Error retrieving favorites:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  

  const getAllFavorites = async (req, res) => {
    try {
      const favorites = await Favorite.find().populate('productId'); // Populate product information

      res.status(200).json(favorites); // Send the list of favorites with product details as JSON
    } catch (error) {
      res.status(500).json({ message: 'Server Error', error: error.message });
    }
  };



  module.exports ={
    addFavoriteProduct,removeFavoriteProduct,getUserEthnicalFavorites,getAllFavorites

  }