const authorModel = require('../models/author')

exports.addAuthor = async(name, website) =>{
    name = name.toLowerCase();
    const existingAuthor = await authorModel.findOne({name})
    if(existingAuthor) throw new Error("Author already exist")

    const newAuthor = new authorModel({
        name, 
        website
    })
    const savedAuthor = await newAuthor.save();
    return savedAuthor;
}

exports.getAuthor = async(id) => {
    const existingAuthor = await authorModel.findById(id)
    if(!existingAuthor) throw new Error("Author do not exist");
    return existingAuthor
}

exports.editAuthor = async({id, name, website, rating}) => {
    const existingAuthor = await authorModel.findById(id)
    if(!existingAuthor) throw new Error("Author do not exist");
    if(name){
        existingAuthor.name = name
    }
    if(website){
        existingAuthor.website = website
    }
    if(rating){
        existingAuthor.rating = rating
    }
    const editedUser = existingAuthor.save()
    return editedUser;
}

exports.deleteAuthor = async(id) => {
    const existingAuthor = await authorModel.findById(id);
    if(!existingAuthor) throw new Error("Author do not exist");
    const deletedAuthor = await existingAuthor.remove();
    return deletedAuthor;
}