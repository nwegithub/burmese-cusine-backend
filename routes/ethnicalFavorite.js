const router = require('express').Router();
const controller = require('../controllers/ethnicalFavorite')
const User = require('../db/user')

router.post("/addFavorite",controller.addFavoriteProduct)
router.delete("/deleteFavorite",controller.removeFavoriteProduct)
router.get("/allFavorite", controller.getAllFavorites);
router.get('/getEthnicalFavorites/:userId', controller.getUserEthnicalFavorites);



module.exports = router