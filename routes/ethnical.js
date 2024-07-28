const router = require('express').Router();
const controller = require('../controllers/ethnical')



router.post("/addProduct", controller.saveProduct)
router.get("/allProduct",controller.allProduct)
router.delete('/:id', controller.deleteEthnicalProduct);



module.exports  = router;