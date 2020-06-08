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

exports.getUser = async(id)=>{
    const existingUser = await userModel.findById(id)
    if(!existingUser) throw new Error("User do not exist")
    return existingUser;
}
exports.getUsers = async()=> {
    const users = await userModel.find(); 
    if(users.length === 0) throw new Error("There is no user in the database")
    return users
}

exports.addToCart = async({id}, bookId)=> {
    const existingBook = await bookModel.findById({_id: bookId});
    if(!existingBook) throw new Error("Book do not exist");
    const existingUser = await userModel.findById(id);
    if(!existingUser) throw new Error("User do not exist");
    const cart = [...existingUser.cart]
    const isProductInCart = cart.find(product => product.bookId == bookId)
    if(!isProductInCart){
        cart.push({
            bookId,
            quantity:1
        });
    }else{
        throw new Error("Book is already in cart")
    }
    existingUser.cart = cart;
    const updated = await existingUser.save();
    return updated;
}

exports.makeCart = async({id}, arrayOfBooks)=> {
    const books = await bookModel.find();
    for(let i = 0 ; i<arrayOfBooks.length; i++){
        let bookExist = books.find(book => book._id == arrayOfBooks[i]); 
        if(!bookExist) throw new Error("At least one book do not exist!")
    }
    const existingUser = await userModel.findById(id);
    if(!existingUser) throw new Error("User do not exist");
    const cart = [...existingUser.cart];
    for(let i = 0 ; i<arrayOfBooks.length; i++){
        let bookinCart = cart.find(book => book.bookId == arrayOfBooks[i]); 
        if(!bookinCart) {
            cart.push({
                bookId: arrayOfBooks[i],
                quantity: 1
            })
        }
    }
    existingUser.cart = cart;
    const updated = await existingUser.save();
    return updated;
}

exports.equipBook = async(bookId)=> {
    const books = await bookModel.find();
    const foundBook = books.find(book => book._id.toString() == bookId)
    return foundBook;
}

exports.deleteBookFromCart = async(bookId, userId) => {
    const user = await userModel.findById(userId)
    if(!user) throw new Error("User do not exist");
    let bookIndexInCart;
    const bookToRemove = user.cart.find((book,indexOfBook)=> {
        if(book.bookId == bookId){
            bookIndexInCart = indexOfBook
            return book
        }
    });
    
    if(!bookToRemove) throw new Error("Book is not in cart");
    user.cart.splice(bookIndexInCart,1)
    const updatedUser = await user.save();
    return updatedUser
}
exports.changeBookQuantity = async (bookId, quantity, userId) => {
    const user = await userModel.findById(userId)
    if(!user) throw new Error("User do not exist");
    let indexOfBook
    const bookToUpdate = user.cart.find((book, index) => {
        if(book.bookId.toString() == bookId){
            indexOfBook = index
            return book
        }
    })
    if(!bookToUpdate) throw new Error("Book is not in cart change")
    bookToUpdate.quantity = quantity;
    user.cart.splice(indexOfBook, 1)
    user.cart.push(bookToUpdate);
    const updatedUser = await user.save();
    return updatedUser;
}

exports.emptyCart = async(userId) => {
    const user = await userModel.findById(userId);
    if(!user) throw new Error("User do not exist");
    user.cart = []
    const updatedUser = await user.save();
    return updatedUser
}