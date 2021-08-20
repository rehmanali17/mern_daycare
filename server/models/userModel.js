const mongoose = require('mongoose');
const Schema = mongoose.Schema

const userSchema = new Schema({
    email:{
        type: String,
        unique: true,
        length: 70
    },
    password:{
        type: String,
        length: 70
    },
    name: {
        type: String,
        length: 50
    },
    phone:{
        type: String,
        length: 11
    },
    address: {
        type: String,
        length: 120
    }
})

const User = mongoose.model('user',userSchema);

module.exports = User 