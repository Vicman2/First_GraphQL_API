const mongoose = require("mongoose")


const Schema = mongoose.Schema;


const authorSchema = new Schema({
    name: {
        type: String, 
        required: true,
        trim: true,
        lowercase: true
    }, 
    website: {
        type: String,
        required: true,
        trim: true
    }, 
    rating: {
        type: Number,
        default: 0
    }
})


module.exports = mongoose.model("author", authorSchema)