const {GraphQLObjectType, GraphQLID, GraphQLInt, GraphQLList} = require('graphql')
const BookType = require('./bookType')
const {equipBook} = require("../../services/user")


const OrderItem = new GraphQLObjectType({
    name: 'OrderItem', 
    fields: {
        _id: {type: GraphQLID}, 
        quantity: {type: GraphQLInt},
        book: {
            type: BookType,
            resolve(parentValue, args){
                return equipBook(parentValue.book)
            }
        }
    }
})

const orderType = new GraphQLObjectType({
    name: 'Order', 
    fields: {
        _id: {type: GraphQLID}, 
        totalPrice: {type: GraphQLInt}, 
        user: {type: GraphQLID}, 
        orders: {
            type: new GraphQLList(OrderItem)
        }
    }
})

module.exports = orderType