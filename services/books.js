const bookModel = require('../models/BookModel');
const AuthorModel = require('../models/author');


exports.addBook = async(data)=> {
    data.title = data.title.toLowerCase();
    data.author = data.author.toLowerCase();
    const existingBook = await bookModel.findOne({title: data.title})
    if(existingBook) throw new Error("Book already exists")
    const author =await AuthorModel.findOne({name: data.author})
    if(!author) throw new Error("Author do not exist")

    const newBook = new bookModel({
        title: data.title,
        description: data.description, 
        price: data.price,
        details:{
            paperBack: data.paperBack, 
            published: data.published, 
            ISBN: data.ISBN, 
            language: data.language
        }, 
        author:author._id
    })
    const savedBook = await newBook.save();
    return savedBook;
}

exports.getBook = async(id) => {
    const existingBook = await bookModel.findById(id)
    if(!existingBook)  throw new Error("Book do not exist! "); 
    return existingBook
}
exports.getBooks = async() => {
    const allBooks = await bookModel.find()
    if (allBooks.length ===0) throw new Error("No book in the database")
    return allBooks
}
exports.editBook = async(data) => {
    const existingBook = await bookModel.findById(data.id)
    if(!existingBook)  throw new Error("Book do not exist! "); 
    existingBook.title = data.title? data.title: existingBook.title;
    existingBook.description = data.description? data.description: existingBook.description;
    existingBook.price = data.price ? data.price : existingBook.price;
    existingBook.imageUrl = data.imageUrl ? data.imageUrl : existingBook.imageUrl;
    existingBook.details.paperBack = data.paperBack ? data.paperBack : existingBook.details.paperBack;
    existingBook.details.published = data.published ? data.published : existingBook.details.published;
    existingBook.details.ISBN = data.ISBN ? data.ISBN : existingBook.details.ISBN;
    existingBook.details.language = data.language? data.language : existingBook.details.language;
    const editedBook = await existingBook.save()
    return editedBook;
}

exports.deleteBook = async(id) => {
    const existingBook = await bookModel.findById(id)
    if(!existingBook)  throw new Error("Book do not exist! ");
    const deletedBook = await existingBook.remove();
    return deletedBook;
}