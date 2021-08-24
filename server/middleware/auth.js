const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = (req,res,next)=>{
    try {
        let token = req.header('x-auth-token');
        if(!token){
            res.json({
                message: 'No token attached, authorization failed'
            })
        }else{
            jwt.verify(token, config.get('jwtsecret'), async (err,data)=>{
            if(err){
                res.json({
                    message: 'Unauthorized access'
                })
            }else{
                req.userId = data.user
                next()
            }
            })
        }
        
    } catch (error) {
        console.log(error.message)
        res.json({
            message: 'Authorization failed',
            error: error.message
        })
    }
}
