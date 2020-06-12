const orderModel = require('../models/orders')
const userModel = require('../models/user')


exports.makeOrder = async(userId)=> {
    const user = await userModel.findById(userId).populate('cart.bookId');
    const userWithoutPop = await userModel.findById(userId);
    if(!user) throw new Error("User do not exist")
    const userOrder = userWithoutPop.cart.map(cart => {
        return {
            book : cart.bookId, 
            quantity: cart.quantity
        }
    });
    const priceAndQuantity = user.cart.map(bk => bk.quantity * bk.bookId.price)
    const totalPrice = priceAndQuantity.reduce((acc, recent) => acc + recent)
    const order = new orderModel({
        user: userId, 
        orders: userOrder, 
        totalPrice: totalPrice
    })
    const newOrder = await order.save();
    return newOrder
}

exports.deleteOrder = async (orderId, userId) => {
    const order = await orderModel.find({user: userId, _id: orderId});
    if(!order) throw new Error("Such order do not exist for this user");
    const deletedOrder = await order.remove();
    return deletedOrder;
}

exports.getOrders = async (userId) => {
    const orders = await orderModel.find({user: userId});
    if(orders.length === 0) throw new Error("You have no order please")
    return orders;
}

exports.getOrder = async (orderId, userId) => {
    const order = await userModel.findById(orderId)
    if(!order) throw new Error("No such order exist");
    return order;
}