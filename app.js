require('dotenv').config()
const express = require("express")
require('./db/config')
const app = express();
const cors = require('cors')


app.use(express.json())
app.use(cors());

const userRoute = require('./routes/user')
const productRoute = require('./routes/products')

app.use('/uploads', express.static('uploads'));


app.use("/users",userRoute)
app.use("/products",productRoute)



app.listen(process.env.PORT,console.log(`server is running at port ${process.env.PORT}`))