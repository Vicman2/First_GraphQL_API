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
    address: {
        type: String, 
        required: false,
        default: ""
    },
    cart: [
        {
            bookId:  {
                type: Schema.Types.ObjectId, 
                ref:"books"
               },
            quantity: {
                type: Number,
                required: true,
                default: 1
            }
        }
    ]
}, {timestamps: true})



module.exports = mongoose.model('user', UserSchema)