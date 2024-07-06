const router = require('express').Router();
const controller = require('../controllers/favorite')

router.post("/addFavorite",controller.addFavoriteProduct)
router.patch("/deleteFavorite",controller.removeFavoriteProduct)
router.get("/getFavorite",controller.getUserFavorites)


module.exports = router