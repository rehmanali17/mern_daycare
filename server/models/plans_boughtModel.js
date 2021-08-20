const mongoose = require('mongoose');
const Schema = mongoose.Schema

const plans_boughtSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    plan: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    time: {
        type: String,
        length: 40
    },
    message: String
})

const PlansBought = mongoose.model('plans_bought',plans_boughtSchema);

module.exports = PlansBought 