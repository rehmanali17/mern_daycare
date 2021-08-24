const router = require('express').Router();
const passport = require('passport')
const jwt = require('jsonwebtoken')
const config = require('config')
const passportSetup = require('../passport-setup/passport-setup')
const { LoginController, SignupController } = require('../controllers/authController')
const { check } = require('express-validator');



router.post('/signup',[
    check('email', 'Enter a valid email').isEmail(),
    check('name', 'Enter a valid name').notEmpty(),
    check('password', 'Enter a 6 digits alphanumeric password').isLength({
        min: 6
    }),
    check('phone', 'Enter a valid phone numner').isNumeric(),
    check('address', 'Address field cannot be empty').notEmpty()
],SignupController)

router.post('/login',[
    check('email','Enter a valid email').isEmail(),
    check('password','Enter a 6 digits alphanumeric password').isLength({
        min: 6
    }),
], LoginController )


router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }))

router.get('/google/redirect', passport.authenticate('google'), (req,res)=>{
    let token = jwt.sign({user: req.user._id},config.get('jwtsecret'),{ expiresIn : '1day' })
    res.json({token})
})

router.get('/github', passport.authenticate('github'))

router.get('/github/redirect', passport.authenticate('github'), (req,res)=>{
    let token = jwt.sign({user: req.user._id},config.get('jwtsecret'),{ expiresIn : '1day' })
    res.json({token})
})


module.exports = router