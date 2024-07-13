const router = require('express').Router();
const controller = require('../controllers/article')
const upload = require('../middleware/upload')


router.post("/createArticle",upload,controller.createArticle)
router.get("/allArticle",controller.getAllArticles)
router.patch("/deleteArticle",controller.deleteArticle)

router.route("/:id")
.get(controller.getArticleById)

module.exports = router