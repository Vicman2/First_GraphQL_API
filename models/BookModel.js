const mongoose = require("mongoose");


const Schema = mongoose.Schema;


const BookSchema = new Schema({
    title: {
        type: String, 
        required: true,
        trim:true
    }, 
    description: {
        type: String, 
        required: true, 
        trim: true
    }, 
    price: {
        type: Number, 
        required: true, 
        trim: true
    }, 
    imageUrl : {
        type: String, 
        trim: true, 
        default: ""
    },
    details: {
        paperBack: {
            type: Number, 
            required: true,
            trim: true
        },
        published: {
            type: Date, 
            required: true, 
        },
        ISBN: {
            type: String, 
            require: true
        }, 
        language: {
            type: String, 
            require: true
        }
    },
    author: {
        type: Schema.Types.ObjectId, 
        ref: 'author',
        required: true
    }
})


module.exports = mongoose.model("books", BookSchema)