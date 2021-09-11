const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const User = require('../models/userModel');
const config = require('config');
const upload = require('../multer-setup/multer-setup')


const SignupController = (req,res)=>{
    try{
        upload(req,res, async (err)=>{
            if(err){
                let error = err.message != undefined ? err.message : err
                res.status(400).json([{
                    msg: 'Error signing up! ' + error,
                    error
                }])
            }else if(req.file == undefined){
                res.status(400).json([{
                    msg: 'Error signing up! No file selected',
                    error: 'No file selected'
                }])
            }else{
                const errors = validationResult(req.body);
                if(!errors.isEmpty()){
                    res.status(400).json(errors.array())
                }else{
                    const { email, password, phone, name, address } = req.body;
                    let extUser = await User.findOne({ email })
                    if(extUser){
                        res.status(400).json([{msg: "User already exists"}]);
                    }else{
                        const salt = await bcrypt.genSalt(10);
                        const hashedPassword = await bcrypt.hash(password, salt);
                        let newUser = new User({
                            email,
                            name,
                            password: hashedPassword,
                            phone,
                            address,
                            imagePath: req.file.path
                        })
                        newUser.save().then(user => {
                            let token = jwt.sign({user: user._id}, config.get('jwtsecret'), { expiresIn: '1day' })
                            res.status(201).json({token});
                        })
                        .catch(err => {
                            res.status(400).json(err)
                        })
                    }
                    
                }
            }
    })
    }catch(error){
        console.log(error.message);
        res.status(400).json([{
            msg: "Error signing up",
            error: error.message
        }]);
    }    
}

const LoginController = async (req,res)=>{
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            res.status(401).json(errors.array())
        }else{
            const { email, password } = req.body
            let user = await User.findOne({email})
            if(user){
                const isMatch = await bcrypt.compare(password,user.password);
                if(isMatch){
                    let token = jwt.sign({user: user._id}, config.get('jwtsecret'), { expiresIn: '1day' })
                    res.status(200).json({token});
                }else{
                    res.status(401).json([{
                        msg: "Incorrect credentials"
                    }]);
                }
            }else{
                res.status(401).json([{
                    msg: "User does not exist"
                }]);
            }
        }
    }catch(error){
        console.log(error.message);
        res.status(401).json([{
            msg: "Error logging in",
            error: error.message
        }]);
    }
}

module.exports = { LoginController, SignupController }