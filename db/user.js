const mongoose = require('mongoose')
const {Schema} = mongoose;

const userSchema = new Schema({
    name: {type: String, required: true, unique:true},
    email: {type: String, required: true, unique:true},
    phone: {type: String,  unique:true},
    password: {type: String, required: true, unique:true},
    token: { type: String },
    profileImage: {type: String,required: true},
    favorites: [{ type: Schema.Types.ObjectId, ref: 'Products' }] 
  

});

const User = mongoose.model("user",userSchema)

module.exports = User