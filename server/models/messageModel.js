const mongoose = require('mongoose');
const Schema = mongoose.Schema

const messageSchema = new Schema({
    email:{
        type: String,
        length: 70
    },
    name: {
        type: String,
        length: 50
    },
    address: {
        type: String,
        length: 120
    },
    message: String
})

const Message = mongoose.model('message',messageSchema);

module.exports = Message 