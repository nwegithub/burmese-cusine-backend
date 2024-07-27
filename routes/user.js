const router = require('express').Router();
const controller = require('../controllers/user')
// let multer = require('multer');
// let upload = multer();
const upload = require('../middleware/upload')


router.post("/login", controller.login)
router.post("/register", controller.register)
router.patch('/:id/profile',upload, controller.updateProfile);
router.get('/:id',controller.getUserById)
router.get("/user/getAllUser",controller.getAllUsers)


module.exports  = router;