const jwt = require('jsonwebtoken')
const {jwtKey} = require('../config')


exports.authenticate = async(req, res, next)=>{
    const token = req.headers.autorization
    let user = null
    if(token){
        user = jwt.verify(token, jwtKey)
    }
    req.user = user
    next()
}
