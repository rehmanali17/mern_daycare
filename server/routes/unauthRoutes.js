const router = require('express').Router()
const {PlanController,ContactController} = require('../controllers/unauthController')



// router.post('/',PlanController)

router.get('/',PlanController)

router.post('/contact',ContactController)

module.exports = router