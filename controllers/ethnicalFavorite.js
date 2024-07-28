const helper = require('../utils/helper')
const User = require('../db/user')
const Ethnical = require('../db/ethnical')
const EthnicalFavorite = require('../db/ethnicalFavorite')
const mongoose = require('mongoose');

mongoose.set('strictPopulate', false);


const addFavoriteEthnical = async (req, res) => {
  try {
    const { userId, ethnicalId } = req.body;

    // Check if the product exists
    const ethnical = await Ethnical.findById(ethnicalId);
    if (!ethnical) {
      return res.status(404).json({ message: 'Ethnial not found' });
    }

    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the product is already favorited
    const alreadyFavorited = await EthnicalFavorite.findOne({ userId, ethnicalId });
    if (alreadyFavorited) {
      return res.status(400).json({ message: 'Ethnical already favorited' });
    }

    // Add to user's favorites list
    user.favorites.push(ethnicalId);
    await user.save();

    // Save to the Favorite collection
    const favorite = new EthnicalFavorite({ userId, ethnicalId });
    await favorite.save();

    return res.status(200).json({ message: 'Favorite added successfully' });
  } catch (error) {
    console.error('Error adding favorite:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const removeFavoriteEthnical = async (req, res) => {
  try {
    const { userId, ethnicalId } = req.body;

    if (!userId || !ethnicalId) {
      return res.status(400).json({ message: 'User ID and Ethnical ID are required' });
    }

    // Step 1: Remove the product from the user's favorites array
    const user = await User.findByIdAndUpdate(
      userId,
      { $pull: { favorites: ethnicalId } },
      { new: true }
    );

    if (!user) {
      // If user not found, respond with an error
      return res.status(404).json({ message: 'User not found' });
    }
    const result = await EthnicalFavorite.findOneAndDelete({ userId: userId, ethnicalId: ethnicalId });

    if (result) {
      return res.status(200).json({ message: 'Favorite removed successfully' });
    } else {
      // If result is null, no matching favorite was found to delete
      return res.status(404).json({ message: 'Favorite not found' });
    }

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
      const favorites = await EthnicalFavorite.find({ user: userId }).populate('Ethnical');
      res.status(200).json({ favorites: favorites.map(fav => fav.ethnicalId) });
    } catch (error) {
      console.error('Error retrieving favorites:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };

  const getAllFavorites = async (req, res) => {
    try {
      const favorites = await EthnicalFavorite.find().populate('ethnicalId'); // Populate product information
      res.status(200).json(favorites); // Send the list of favorites with product details as JSON
    } catch (error) {
      res.status(500).json({ message: 'Server Error', error: error.message });
    }
  };



  module.exports ={
    addFavoriteEthnical,removeFavoriteEthnical,getUserFavorites,getAllFavorites
  }