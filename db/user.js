const mongoose = require('mongoose')
const {Schema} = mongoose;

const userSchema = new Schema({
    name: {type: String, required: true, unique:true},
    email: {type: String, required: true, unique:true},
    phone: {type: String,  unique:true},
    password: {type: String, required: true, unique:true},
    token: { type: String }  

});

const User = mongoose.model("user",userSchema)

module.exports = User