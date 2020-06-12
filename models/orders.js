const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const orderSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId, 
        required: true
    }, 
    orders: [{
        book: {type: Schema.Types.ObjectId, require: true},
        quantity: {type: Number, required: true}
    }], 
    totalPrice: {
        type: Number, 
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model('order', orderSchema);