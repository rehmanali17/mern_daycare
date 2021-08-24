const mongoose = require('mongoose');
const Schema = mongoose.Schema

const userSchema = new Schema({
    email:{
        type: String,
        unique: true,
        length: 70,
        required: true
    },
    password:{
        type: String,
        length: 70,
        required: true
    },
    name: {
        type: String,
        length: 50,
        required: true
    },
    phone:{
        type: String,
        length: 11,
        required: true
    },
    address: {
        type: String,
        length: 120,
        required: true
    },
    imagePath: {
        type: String,
        required: true
    }
})

const User = mongoose.model('user',userSchema);

module.exports = User 