const mongoose = require('mongoose')
const Message = require('../models/messageModel')
const Plan = require('../models/planModel')

// const PlanController = async (req,res)=>{
//     try{
//         const { title , duration , trial_period, time_duration, price } = req.body
//         let newPlan = new Plan({
//             title,
//             duration,
//             trial_period,
//             time_duration,
//             price
//         })
//         await newPlan.save()
//         res.json(newPlan)
//     }catch(error){
//         res.json({msg: "Error creating the plan"})
//     }
// }


const PlanController = async (req,res)=>{
    try{
        const docs = await Plan.find().select('-__v');
        const response = {
            lenght: docs.length,
            plans: docs.map(doc => {
                return {
                    _id: doc._id,
                    title: doc.title,
                    duration: doc.duration,
                    trial_period: doc.trial_period,
                    time_duration: doc.time_duration,
                    price: doc.price,
                    request: {
                        type: 'POST',
                        url: 'http://localhost:3000/user/buy_plan/'+ doc.id
                    }
                }
            })
        }
        res.json(response)
    }catch(error){
        console.log(error.message)
        res.json({
            message : "Error fetching the plans",
            error : error.message
        })
    }
}

const ContactController = async (req,res)=>{
    try{
        const { email , name, address, message } = req.body
        let newMessage = new Message({
            email,
            name,
            address,
            message
        })
        newMessage.save().then(message =>{
            res.status(201).json([{
                message: 'Message sent successfully',
                contact_message: {
                    _id: message._id,
                    email: message.email,
                    name: message.name,
                    address: message.address,
                    message: message.message,
                }
            }])
        })
        
    }catch(error){
        console.log(error.message)
        res.status(300).json([{
            message: "Error sending the message",
            error: error.message,
        }])
    }
} 

module.exports = {PlanController,ContactController}