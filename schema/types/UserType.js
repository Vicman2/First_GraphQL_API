const {GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList} = require('graphql');
const {equipCart} = require("../../services/user")
const BookType = require("./bookType")


const userType = new GraphQLObjectType({
    name:"User",
    fields: {
        _id: {type: GraphQLID}, 
        name: {type: GraphQLString}, 
        email: {type: GraphQLString}, 
        phone: {type: GraphQLString},
        imageUrl: {type: GraphQLString}, 
        cart: {
            type: new GraphQLList(BookType), 
            resolve(parentvalue, arg){
               return equipCart(parentvalue.cart)
            }
        }
    }
})


module.exports = userType