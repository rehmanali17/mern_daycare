const router = require('express').Router();
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

module.exports = router