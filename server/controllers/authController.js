const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const User = require('../models/userModel');
const config = require('config');

const SignupController = async (req,res)=>{
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            res.json({errors:errors.array()})
        }else{
            const { email, password, phone, name, address } = req.body;
            let extUser = await User.findOne({ email })
            if(extUser){
                res.json({msg: "User already exists"});
            }else{
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(password, salt);
                let newUser = new User({
                    email,
                    name,
                    password: hashedPassword,
                    phone,
                    address
                })
                newUser.save().then(user => {
                    let token = jwt.sign({user: user._id}, config.get('jwtsecret'), { expiresIn: '1day' })
                    res.json({token});
                })
            }
            
        }
    }catch(error){
        console.log(error.message);
        res.json({msg: "Error signing up"});
    }    
}

const LoginController = async (req,res)=>{
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            res.json({errors:errors.array()})
        }else{
            const { email, password } = req.body
            let user = await User.findOne({email})
            if(user){
                const isMatch = await bcrypt.compare(password,user.password);
                if(isMatch){
                    let token = jwt.sign({user: user._id}, config.get('jwtsecret'), { expiresIn: '1day' })
                    res.json({token});
                }else{
                    res.json({msg: "Incorrect credentials"});
                }
            }else{
                res.json({msg: "User does not exist"});
            }
        }
    }catch(error){
        console.log(error.message);
        res.json({msg: "Error logging in"});
    }
}

module.exports = { LoginController, SignupController }