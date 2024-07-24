const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    name_mm:{
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    description_mm: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    }
});

const Article = mongoose.model('Article', articleSchema);
module.exports = Article;
