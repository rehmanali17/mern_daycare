const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Plan = require('../models/planModel')
const PlanBought = require('../models/plans_boughtModel')
const User = require('../models/userModel')
const { validationResult } = require('express-validator')

const GetUserPlans = async (req,res)=>{
    try {
        const plans = await PlanBought.find({user: req.userId}).populate('plan')
        res.json({plans})
    } catch (error) {
        console.log(error.message)
        res.json({msg: 'Error fetching the plans'})
    }
}


const GetBuyPlan = async (req,res) =>{
    try {
        const { id } = req.params
        if(mongoose.Types.ObjectId.isValid(id)){
        const plan = await Plan.findById(id)
        if(plan){
            res.json({plan})
        }else{
            res.json({msg: 'No plan found'})
        }
    }else{
        res.json({msg: 'Invalid ID'})
    }
    } catch (error) {
        console.log(error.message)
        res.json({msg: 'Error fetching the plan'})
    }
}

const PostBuyPlan = async (req,res)=>{
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            res.json({errors: errors.array()})
        }else{
            const { plan, time } = req.body
            let newPlanBought = new PlanBought({
                user: req.userId,
                plan,
                time
                })
            await newPlanBought.save()
            res.json({msg: 'Plan bought successfully'})
        }
    }catch(error){
        console.log(error.message);
        res.json({msg:"Error buying the plan"});
    }
    
}

const ViewUserPlan = async (req,res)=>{
    try{
        const { id, time } = req.query
        if(mongoose.Types.ObjectId.isValid(id)){
        const plan = await Plan.findById(id)
        if(plan){
            let result = {
                plan,
                time
            }
            res.json({details: result}) 
        }else{
            res.json({msg: 'No plan'})
        }}else{
            res.json({msg: "Invalid ID"})
        }
    }catch(error){
        console.log(error.message)
        res.json({msg: "Error fetching the plan"})
    }  
}

const DeleteUserPlan = async (req,res)=>{
    try{
        const { id } = req.params
        if(mongoose.Types.ObjectId.isValid(id)){
            await PlanBought.findByIdAndDelete(id)
            res.json({msg: "Plan removed successfully"})
        }else{
            res.json({msg: "Invalid ID"})
        }   
    }catch(error){
        console.log(error.message)
        res.json({msg:"Error deleting the plan"})
    }
}

const GetUserDetails = async(req,res)=>{
    try{
        const id = req.userId
        const details = await User.findById(id).select(['-password','-email'])
        res.json({details})
    }catch(error){
        console.log(error.message)
        res.json({msg: "Error getting user details"})
    }
}

const UpdateUserProfile = async (req,res)=>{
    try{
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            res.json({errors: errors.array()})
        }else{
            const id = req.userId
            const { name , address, phone, password } = req.body
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(password,salt)
            const newUser = {
                name,
                password: hashedPassword,
                phone,
                address
            }
            await User.findByIdAndUpdate(id, newUser, { new: true, useFindAndModify: false })
            res.json({msg: "Profile updated successfully"})
        }
    }catch(error){
        console.log(error.message)
        res.json({msg: "Error updating the profile"})
    }
}

module.exports = { GetBuyPlan, PostBuyPlan, GetUserPlans, ViewUserPlan , DeleteUserPlan, UpdateUserProfile, GetUserDetails }