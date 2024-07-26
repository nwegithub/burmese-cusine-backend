const mongoose = require('mongoose');

mongoose.connect(`mongodb+srv://burmeseCuisineUser:burmeseCuisine2024@cluster0.vxvffnj.mongodb.net/${process.env.DB_NAME}`)
  .then(() => {
    console.log('Connected to MongoDB Atlas');
  })
  .catch((error) => {
    console.error('Connection error:', error);
  });
