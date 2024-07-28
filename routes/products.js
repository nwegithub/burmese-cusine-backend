const router = require('express').Router();
const controller = require('../controllers/product')



router.post("/addProduct", controller.saveProduct)
router.get("/allProduct",controller.allProduct)
router.delete('/:id', controller.deleteProduct);


module.exports  = router;