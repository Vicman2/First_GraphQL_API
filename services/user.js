const userModel = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken");
const {jwtKey} = require('../config')
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
    const token = jwt.sign({email, id: savedUser._id}, jwtKey)
    return {...savedUser, token};
}

exports.login = async(email, password)=>{
    const existingUser = await userModel.findOne({email})
    if(!existingUser) throw new Error("User do not exist");
    const matched = await bcrypt.compare(password, existingUser.password);
    if(!matched) throw new Error("Wrong Password")
    const token = jwt.sign({id: existingUser._id, email}, jwtKey)
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

exports.addToCart = async({userId}, bookId)=> {
    const existingBook = await bookModel.findOne({_id: bookId});
    if(!existingBook) throw new Error("Book do not exist");
    const existingUser = await userModel.findOne({_id:userId});
    if(!existingUser) throw new Error("User do not exist");
    const updatedUser = {...existingUser._doc}
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

exports.makeCart = async({userId}, arrayOfBooks)=> {
    if(!user) throw new Error("Please, pass ")
    const books = await bookModel.find();
    for(let i = 0 ; i<arrayOfBooks.length; i++){
        let bookExist = books.find(book => book._id == arrayOfBooks[i]); 
        if(!bookExist) throw new Error("At least one book do not exist!")
    }
    const existingUser = await userModel.findOne({_id:userId});
    if(!existingUser) throw new Error("User do not exist");
    const updatedUser = {...existingUser._doc}
    const cart = [...updatedUser.cart];
    for(let i = 0 ; i<arrayOfBooks.length; i++){
        let bookinCart = cart.find(bookId => bookId === arrayOfBooks[i].id); 
        if(!bookinCart) cart.push(arrayOfBooks[i])
    }
    updatedUser.cart = cart;
    existingUser._doc = updatedUser
    const updated = await existingUser.save();
    return updated;
} 