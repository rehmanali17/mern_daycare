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
        const plans = await Plan.find();
        res.json({plans})
    }catch(error){
        res.json({msg: "Error fetching the plans"})
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
        await newMessage.save()
        res.json(newMessage)
    }catch(error){
        res.json({msg: "Error sending the message"})
    }
} 

module.exports = {PlanController,ContactController}