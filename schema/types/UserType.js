const {GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList, GraphQLInt} = require('graphql');
const {equipBook} = require("../../services/user")
const BookType = require('./bookType')

const CartItem = new GraphQLObjectType({
    name: "Cart", 
    fields: {
        _id: {type: GraphQLID}, 
        quantity: {type: GraphQLInt}, 
        bookId: {
            type: BookType, 
            resolve(parentvalue, arg){
                return equipBook(parentvalue.bookId);
            }
        }
    }
})


const userType = new GraphQLObjectType({
    name:"User",
    fields: {
        _id: {type: GraphQLID}, 
        name: {type: GraphQLString}, 
        email: {type: GraphQLString}, 
        phone: {type: GraphQLString},
        imageUrl: {type: GraphQLString}, 
        cart: {
            type: new GraphQLList(CartItem)
        }
    }
})


module.exports = userType