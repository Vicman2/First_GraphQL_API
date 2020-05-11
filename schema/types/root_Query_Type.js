const {GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLID, GraphQLList} = require("graphql")
const {login} = require("../../services/user")
const {getAuthor} = require('../../services/author')
const {getBook, getBooks} = require('../../services/books')
const BookType = require('../types/bookType')
const AuthorType = require('../types/AuthorType')
const AuthType = require('../types/AuthType')


const helloType = new GraphQLObjectType({
    name: "Hello", 
    fields: {
        id: {type: GraphQLString},
        message: {type: GraphQLString}, 
    }
})

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        hello: {
            type: helloType, 
            args: {}, 
            resolve(parentValue, args){
                return {message: "Vicman is now destroying graphql", id: "2"}
            }
        },
        login: {
            type: AuthType, 
            args: {
                email: {type: new GraphQLNonNull(GraphQLString)},
                password: {type: new GraphQLNonNull(GraphQLString)}
            },
            resolve(parentValue, {email, password}){
                return login(email, password);
            }
        },
        getAuthor:{
            type: AuthorType, 
            args: {
                id : {type: new GraphQLNonNull(GraphQLID)}
            }, 
            resolve(parentValue, {id}){
                return getAuthor(id);
            }
        },
        getBook: {
            type: BookType, 
            args: {
                id: {type: new GraphQLNonNull(GraphQLID)}
            },
            resolve(parentValue, {id}){
                return getBook(id)
            }
        },
        getBooks: {
            type: new GraphQLList(BookType),
            resolve(parentValue, args){
                return getBooks()
            }
        }
    }
})

module.exports = RootQuery