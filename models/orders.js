const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const orderSchema = new Schema({
    orderId : {
        type: Number, 
        required: true, 
    }, 
    user: {
        type: Schema.Types.ObjectId, 
        required: true
    }, 
    orders: [{
        book: {type: Schema.Types.ObjectId, require: true},
        quantity: {type: Number, required: true}
    }]
}, {timestamps: true})

module.exports = mongoose.model('order', orderSchema);