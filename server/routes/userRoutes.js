const router = require('express').Router()
const { GetBuyPlan,PostBuyPlan, GetUserPlans, ViewUserPlan, DeleteUserPlan, UpdateUserProfile, GetUserDetails } = require('../controllers/userController')
const { check } = require('express-validator')
const auth = require('../middleware/auth')

router.get('/',auth,GetUserPlans)

router.get('/buy_plan/:id', auth ,GetBuyPlan)

router.post('/buy_plan/:id', auth ,[
    check('time', 'Please choose the time').notEmpty()
],PostBuyPlan)

router.get('/view_plan', auth, ViewUserPlan)

router.delete('/delete_plan/:id', auth, DeleteUserPlan)

router.get('/user_details', auth, GetUserDetails)

router.put('/update_profile', auth,[
    check('name', 'Enter a valid name').notEmpty(),
    check('password', 'Enter a 6 digits alphanumeric password').isLength({
        min: 6
    }),
    check('phone', 'Enter a valid phone numner').isNumeric(),
    check('address', 'Address field cannot be empty').notEmpty()
], UpdateUserProfile )


module.exports = router