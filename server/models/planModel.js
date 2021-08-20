const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const planSchema = new Schema({
    title:{
        type: String,
        length: 50
    },
    duration:{
        type: String,
        length: 70
    },
    trial_period: {
        type: String,
        length: 50
    },
    time_duration: {
        type: String,
        length: 50
    },
    price: Number
})

const Plan = mongoose.model('plan', planSchema);

module.exports = Plan
