const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String, 
        required: true
    }, 
    email: {
        type: String, 
        required: true,
    },
    phone: {
        type: String, 
        required: true,
    }, 
    imageUrl: {
        type: String, 
        required: false,
        default: ""
    }, 
    password: {
        type: String, 
        required: true
    },
    cart: [Schema.Types.ObjectId]
})



module.exports = mongoose.model('user', UserSchema)