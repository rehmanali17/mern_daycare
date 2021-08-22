const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = (req,res,next)=>{
    try {
        let token = req.header('x-auth-token');
        if(!token){
            res.json({msg: 'No token, authorization denied'})
        }else{
            jwt.verify(token, config.get('jwtsecret'), async (err,data)=>{
            if(err){
                res.json({msg: 'Not authorized'})
            }else{
                req.userId = data.user
                next()
            }
            })
        }
        
    } catch (error) {
        console.log(error.message)
        res.json({msg: 'Authorization failed'})
    }
}
