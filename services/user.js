const userModel = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken")
const bookModel = require('../models/BookModel')

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
    if(!existingUser) throw new Error("User do not exist")
    return existingUser;
}
exports.getUsers = async()=> {
    const users = await userModel.find(); 
    if(users.length === 0) throw new Error("There is no user in the database")
    return users
}

exports.addToCart = async(userId, bookId)=> {
    const existingBook = await bookModel.findOne({_id: bookId});
    if(!existingBook) throw new Error("Book do not exist");
    const existingUser = await userModel.findOne({_id:userId});
    if(!existingUser) throw new Error("User do not exist");
    console.log(existingUser)
    const updatedUser = {...existingUser._doc}
    console.log(updatedUser)
    const cart = [...updatedUser.cart]
    const isProductInCart = cart.find(product => product == bookId)
    if(!isProductInCart){
        cart.push(bookId);
    }
    updatedUser.cart = cart;
    existingUser._doc = updatedUser
    const updated = await existingUser.save();
    return updated;
}