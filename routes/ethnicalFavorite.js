const router = require('express').Router();
const controller = require('../controllers/ethnicalFavorite')
const User = require('../db/user')

router.post("/addFavoriteEthnical",controller.addFavoriteEthnical)
router.delete("/deleteFavoriteEthnical",controller.removeFavoriteEthnical)
router.get("/getFavorite",controller.getUserFavorites)
router.get("/allFavorite", controller.getAllFavorites);
router.get('/getFavorites/:userId', async (req, res) => {
    try {
      const { userId } = req.params;
      const user = await User.findById(userId).populate('favorites');
      if (user) {
        res.status(200).json({ favorites: user.favorites });
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      console.error('Error retrieving favorites:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });


module.exports = router