const jwt = require('jsonwebtoken')
const {jwtKey} = require('../config')


exports.authenticate = function(req, res, next){
    const token = req.headers.authorization
    let user = null
    if(typeof token === "string" && token !=="null"){
        user = jwt.verify(token, jwtKey)
    }
    req.user = user? user : {}
    next()
}
