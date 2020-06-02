const {GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList} = require('graphql');
const {getBooks} = require("../../services/books")
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
                return getBooks().filter(bookId => {
                    
                })
            }
        }
    }
})


module.exports = userType