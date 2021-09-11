const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Plan = require('../models/planModel')
const PlanBought = require('../models/plans_boughtModel')
const User = require('../models/userModel')
const { validationResult } = require('express-validator')
const upload = require('../multer-setup/multer-setup')

const GetUserPlans = async (req,res)=>{
    try {
        const docs = await PlanBought.find({user: req.userId}).populate('plan', 'title').select('_id plan time')
        const response = {
            length: docs.length,
            plans: docs.map(doc =>{
                return {
                    _id: doc._id,
                    time: doc.time,
                    plan: doc.plan,
                    request: [
                        {view : {
                            type: 'GET',
                            url: 'http://localhost:5000/user/view_plan?id='+ doc.plan.id + '&time=' + doc.time
                        },
                         delete: {
                            type: 'DELETE',
                            url: 'http://localhost:5000/user/delete_plan/'+ doc.id
                        }
                    }
                    ]
                }
            })
        }
        res.json(response)
    } catch(error){
        console.log(error.message)
        res.json({
            message: 'Error fetching the user plans',
            error: error.message
        })
    }
}


const GetBuyPlan = async (req,res) =>{
    try {
        const { id } = req.params
        if(mongoose.Types.ObjectId.isValid(id)){
        const doc = await Plan.findById(id).select('-__v')
        if(doc){
            res.json(doc)
        }else{
            res.json({message: 'Plan not found'})
        }
    }else{
        res.json({message: 'Invalid plan id'})
    }
    } catch (error) {
        console.log(error.message)
        res.json({
            message: 'Error fetching the plan',
            error: error.message
        })
    }
}

const PostBuyPlan = async (req,res)=>{
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            res.status(300).json(errors.array())
        }else{
            const { id } = req.params
            const { time } = req.body
            let newPlanBought = new PlanBought({
                user: req.userId,
                plan: id,
                time
                })
            newPlanBought.save().then(async (plan )=>{
                let doc = await PlanBought.find({user: req.userId, _id: plan._id}).populate('plan', 'title').select('_id plan time')
                doc = doc[0]
                res.status(200).json({
                    msg: 'Plan bought successfully',
                    plan: {
                        _id: doc._id,
                        time: doc.time,
                        plan: doc.plan,
                        request: [
                            {view : {
                                type: 'GET',
                                url: 'http://localhost:5000/user/view_plan?id='+ doc.plan._id + '&time=' + doc.time
                            },
                            delete: {
                                type: 'DELETE',
                                url: 'http://localhost:5000/user/delete_plan/'+ doc.id
                            }
                        }
                        ]
                    }
                })
            })
            
        }
    }catch(error){
        console.log(error.message);
        res.status(300).json([{
            msg: 'Error buying the plan',
            error: error.message
        }])
    }
    
}

const ViewUserPlan = async (req,res)=>{
    try{
        const { id, time } = req.query
        if(mongoose.Types.ObjectId.isValid(id)){
        const plan = await Plan.findById(id).select('-__v')
        if(plan){
            let result = {
                plan,
                time
            }
            res.json(result) 
        }else{
            res.json({message: 'Plan not found'})
        }}else{
            res.json({message: "Invalid plan id"})
        }
    }catch(error){
        console.log(error.message)
        res.json({
            message: 'Error fetching the plan',
            error: error.message
        })
    }  
}

const DeleteUserPlan = async (req,res)=>{
    try{
        const { id } = req.params
        if(mongoose.Types.ObjectId.isValid(id)){
            await PlanBought.findByIdAndDelete(id)
            res.status(200).json([{message: "Plan removed successfully"}])
        }else{
            res.status(300).json([{message: "Invalid plan id"}])
        }   
    }catch(error){
        console.log(error.message)
        res.status(300).json([{
            message: 'Error removing the plan',
            error: error.message
        }])
    }
}

const GetUserDetails = async(req,res)=>{
    try{
        const id = req.userId
        const doc = await User.findById(id).select('-password -email -__v')
        res.json(doc)
    }catch(error){
        console.log(error.message)
        res.json({
            message: 'Error getting user profile',
            error: error.message
        })
    }
}

const UpdateUserProfile = (req,res)=>{ 
    try{
        upload(req,res, async (err)=>{
            if(err){
                let error = err.message != undefined ? err.message : err
                res.status(300).json([{
                    msg: 'Error updating the profile! ' + error,
                    error
                }])
            }else if(req.file == undefined){
                res.status(300).json([{
                    msg: 'Error updating the profile! No file selected',
                    error: 'No file selected'
                }])
            }else{
                const errors = validationResult(req.body)
                if(!errors.isEmpty()){
                    res.status(300).json(errors.array())
                }else{
                    const id = req.userId
                    const { name , address, phone, password } = req.body
                    const salt = await bcrypt.genSalt(10)
                    const hashedPassword = await bcrypt.hash(password,salt)
                    const newUser = {
                        name,
                        password: hashedPassword,
                        phone,
                        address,
                        imagePath: req.file.path
                    }
                    User.findByIdAndUpdate(id, newUser, { new: true, useFindAndModify: false }).then(user => {
                        res.status(200).json({
                            msg: "Profile updated successfully",
                            user: {
                                _id: user._id,
                                name: user.name,
                                phone: user.phone,
                                address: user.address,
                                imagePath: user.imagePath
                            }
                        })
                    }).catch(err => {
                        res.status(300).json(err)
                    }) 
                }
            }
        })
    }catch(error){
        console.log(error.message)
        res.status(300).json([{
            msg: "Error updating the profile",
            error: error.message
        }])
    }
}

module.exports = { GetBuyPlan, PostBuyPlan, GetUserPlans, ViewUserPlan , DeleteUserPlan, UpdateUserProfile, GetUserDetails }