mongoose.connect(`mongodb+srv://burmeseCuisineUser:burmeseCuisine2024@cluster0.vxvffnj.mongodb.net/${process.env.DB_NAME}`)
  .then(() => {
    console.log('Connected to MongoDB Atlas');
  })
  .catch((error) => {
    console.error('Connection error:', error);
  });
  const { MongoClient } = require('mongodb');
const client = new MongoClient('mongodb+srv://username:password@cluster.mongodb.net/myDatabase', {
  // ssl: true,
  // sslValidate: true,
  // sslCA: '/path/to/ca.pem'
});