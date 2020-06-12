const {GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLID, GraphQLList} = require("graphql")
const {login, getUsers, getUser} = require("../../services/user")
const {getAuthor} = require('../../services/author')
const {getBook, getBooks} = require('../../services/books')
const { getOrders, getOrder } = require("../../services/order")
const OrderType = require('./OrderType')
const BookType = require('../types/bookType')
const UserType = require('./UserType')
const AuthorType = require('../types/AuthorType')
const AuthType = require('../types/AuthType')
const {checkUser} = require('../../util')
const {validateLogin, validateId, validateAuthor, validateOrderId} = require('../../Validators/validator')



const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        login: {
            type: AuthType, 
            args: {
                email: {type: new GraphQLNonNull(GraphQLString)},
                password: {type: new GraphQLNonNull(GraphQLString)}
            },
            resolve(parentValue, {email, password}){
                validateLogin({email, password})
                return login(email, password);
            }
        },
        getUserForCart: {
            type: UserType, 
            resolve(parentValue, args, {user}){
                checkUser(user);
                return getUser(user.id)
            }
        },
        getUsers: {
            type: new GraphQLList(UserType), 
            resolve(parentValue, args){
                return getUsers()
            }
        },
        
        getAuthor:{
            type: AuthorType, 
            args: {
                id : {type: new GraphQLNonNull(GraphQLID)}
            }, 
            resolve(parentValue, {id}){
                validateId({id})
                return getAuthor(id);
            }
        },
        getBook: {
            type: BookType, 
            args: {
                id: {type: new GraphQLNonNull(GraphQLID)}
            },
            resolve(parentValue, {id}){
                validateId({id})
                return getBook(id)
            }
        },
        getBooks: {
            type: new GraphQLList(BookType),
            resolve(parentValue, args, req){
                return getBooks()
            }
        },
        getOrders: {
            type: new GraphQLList(OrderType), 
            resolve(parentValue, args, {user}){
                return getOrders(user.id)
            }
        },
        getOrder: {
            type: OrderType, 
            args: {
                orderId: {type: new GraphQLNonNull(GraphQLID)}
            },
            resolve(parentValue, args, {user}){
                validateOrderId(args)
                return getOrder(args.id, user.id);
            }
        }
    }
})

module.exports = RootQuery