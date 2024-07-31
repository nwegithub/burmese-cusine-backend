require('dotenv').config()
const express = require("express")
require('./db/config')
const app = express();
const cors = require('cors')


app.use(express.json())
app.use(cors());

const userRoute = require('./routes/user')
const productRoute = require('./routes/products')
const favoriteRoute = require('./routes/favorite')
const ethnicalFavoriteRoute = require('./routes/ethnicalFavorite')
const articleRoute = require('./routes/article');
const feedbackRoute = require('./routes/feedback')
const ethnicalRoute = require('./routes/ethnical');
const contactRoute = require('./routes/contact')

app.use('/uploads', express.static('uploads'));
app.use(express.urlencoded({ extended: true }));


app.use("/users",userRoute)
app.use("/products",productRoute)
app.use("/favorites",favoriteRoute)
app.use("/ethnicalFavorites",ethnicalFavoriteRoute)
app.use("/articles",articleRoute)
app.use("/feedback",feedbackRoute)
app.use("/ethnical",ethnicalRoute)
app.use('/createContact',contactRoute)



app.listen(process.env.PORT,console.log(`server is running at port ${process.env.PORT}`))