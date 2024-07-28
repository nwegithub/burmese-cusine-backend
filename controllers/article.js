const helper = require('../utils/helper')
const upload = require('../middleware/upload')
const Article = require('../db/article') 



const createArticle = async (req, res) => {
    const { name,name_mm, description,description_mm, category } = req.body;
    const image = req.file ? req.file.path : null;

    if (!name || !description || !image || !category) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const article = new Article({
        name,
        name_mm,
        description,
        description_mm,
        image,
        category
    });

    try {
        const newArticle = await article.save();
        res.status(201).json(newArticle);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getAllArticles = async (req, res) => {
    try {
        const articles = await Article.find();
        res.status(200).json(articles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getArticleById = async (req, res) => {
    try {
        const article = await Article.findById(req.params.id);
        if (!article) return res.status(404).json({ message: 'Article not found' });
        res.status(200).json(article);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteArticle = async (req, res) => {
    try {
        const article = await Article.findById(req.params.id);
        if (!article) return res.status(404).json({ message: 'Article not found' });

        await Article.deleteOne({ _id: req.params.id });
        res.status(200).json({ message: 'Article deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



module.exports = {
    getAllArticles,createArticle,getArticleById,deleteArticle
}
