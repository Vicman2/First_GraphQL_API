const userModel = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken")

exports.addUser = async({name, email, phone, password})=> {
    const existingUser =await userModel.findOne({email})
    if(existingUser) { throw new Error("Email in use")}
    const hashedPassword = await bcrypt.hash(password, 12)

    const freshUser = new userModel({
        name, 
        email, 
        phone, 
        password: hashedPassword
    })

    const savedUser = await freshUser.save();
    const token = jwt.sign({email, id: savedUser._id}, "CanYouGuess ?")
    return {...savedUser, token};
}

exports.login = async(email, password)=>{
    const existingUser = await userModel.findOne({email})
    if(!existingUser) throw new Error("User do not exist")
    console.log(existingUser)
    const matched = await bcrypt.compare(password, existingUser.password);
    console.log(email, password)
    if(!matched) throw new Error("Wrong Password")
    const token = jwt.sign({id: existingUser._id, email}, "CanYouGuess ?")
    console.log(token)
    return {...existingUser, token}
}

exports.getUser = async(email)=>{
    const existingUser = await userModel.findOne({email})
    if(!existingUser) {throw new Error("User do not exist")}
    return existingUser;
}