const {GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLID, GraphQLInt, GraphQLList} = require('graphql')
const {addUser, addToCart, makeCart, deleteBookFromCart, changeBookQuantity, emptyCart} = require('../services/user')
const {addAuthor, editAuthor, deleteAuthor} = require('../services/author');
const {addBook, editBook, deleteBook}  = require('../services/books')
const {makeOrder, deleteOrder} = require('../services/order')
const OrderType  = require('./types/OrderType');
const BookType = require('./types/bookType')
const AuthorType = require('./types/AuthorType')
const UserType = require('./types/UserType')
const AuthType = require('./types/AuthType')
const {checkUser} = require('../util')
const {validateSignUp, validateAuthor, validateBook, 
    validateEditUser, validateId, validateCart, 
    validateMakeCart, validateChangeBookQuantity, validateOrderId} = require('../Validators/validator');

const mutations = new GraphQLObjectType({
    name: "Mutation", 
    fields:{
        signUp:{
            type: AuthType, 
            args: {
                name: {type: new GraphQLNonNull(GraphQLString)}, 
                email: {type: new GraphQLNonNull(GraphQLString)}, 
                phone: {type: new GraphQLNonNull(GraphQLString)}, 
                password: {type: new GraphQLNonNull(GraphQLString)}
            },
            resolve(parentValue, args){
                validateSignUp(args)
                return addUser(args)
            }
        }, 
        addAuthor: {
            type: AuthorType, 
            args: {
                name: {type: new GraphQLNonNull(GraphQLString)}, 
                website: {type: new GraphQLNonNull(GraphQLString)}
            }, 
            resolve(parentValue, {name, website}){
                validateAuthor({name, website})
                return addAuthor(name, website);
            }
        }, 
        editAuthor: {
            type: AuthorType,
            args: {
                id: {type: GraphQLID},
                name: {type: GraphQLString}, 
                website: {type: GraphQLString}
            }, 
            resolve(parentValue, args){
                validateEditUser(args)
                return editAuthor(args)
            }
        },
        deleteAuthor: {
            type: AuthorType,
            args: {
                id: {type: new GraphQLNonNull(GraphQLID)}
            },
            resolve(parentValue, {id}){
                validateId({id});
                return deleteAuthor(id);
            }
        }, 
        addBook: {
            type: BookType, 
            args: {
                title: {type: new GraphQLNonNull(GraphQLString)}, 
                description: {type: new GraphQLNonNull(GraphQLString)}, 
                price: {type: new GraphQLNonNull(GraphQLInt)}, 
                imageUrl: {type :GraphQLString},
                paperBack: {type: new GraphQLNonNull(GraphQLInt)}, 
                published: {type: new GraphQLNonNull(GraphQLInt)},
                ISBN: {type: new GraphQLNonNull(GraphQLString)}, 
                language: {type: new GraphQLNonNull(GraphQLString)},
                author: {type: new GraphQLNonNull(GraphQLString)}
            }, 
            resolve(parentValue, args){
                validateBook(args)
                return addBook(args)
            }
        },
        editBook: {
            type: BookType, 
            args: {
                id: {type : new GraphQLNonNull(GraphQLID)},
                title: {type: GraphQLString}, 
                description: {type: GraphQLString}, 
                price: {type: GraphQLInt}, 
                imageUrl: {type :GraphQLString},
                paperBack: {type: GraphQLInt}, 
                published: {type: GraphQLInt},
                ISBN: {type: GraphQLString}, 
                language: {type: GraphQLString}
            }, 
            resolve(parentValue, args){
                return editBook(args)
            }
        }, 
        deleteBook: {
            type: BookType, 
            args:{
                id: {type : new GraphQLNonNull(GraphQLID)}
            },
            resolve(parentValue, {id}){
                validateId({id})
                return deleteBook(id)
            }
        }, 
        addToCart: {
            type: UserType, 
            args: {
                bookId: {type: new GraphQLNonNull(GraphQLID)},
            }, 
            resolve(parentValue, {bookId}, {user}){
                checkUser(user)
                validateCart({bookId})
                return addToCart(user, bookId)
            }
        },
        makeCart: {
            type: UserType,
            args:{
                books: {type: new GraphQLNonNull(new GraphQLList(GraphQLID))}
            }, 
            resolve(pararentValue,args,{user}){
                checkUser(user)
                validateMakeCart(args);
                return makeCart(user, args.books)
            }
        }, 
        deleteBookFromCart: {
            type: UserType, 
            args: {
                bookId: {type: new GraphQLNonNull(GraphQLID)}
            }, 
            resolve(parentValue, {bookId}, {user}){
                checkUser(user)
                validateCart({bookId})
                return deleteBookFromCart(bookId, user.id)
            }
        }, 
        changeBookQuantity: {
            type: UserType, 
            args: {
                bookId: {type: new GraphQLNonNull(GraphQLID)}, 
                quantity : {type:new GraphQLNonNull(GraphQLInt) }
            }, 
            resolve(parentValue, args, {user}){
                checkUser(user)
                validateChangeBookQuantity(args)
                return changeBookQuantity(args.bookId, args.quantity, user.id);
            }
        }, 
        emptyUserCart: {
            type: UserType, 
            resolve(parentValue, args, {user}){
                checkUser(user);
                return emptyCart(user.id)
            }
        },
        makeOrder: {
            type: OrderType, 
            resolve(parentValue, args, {user}){
                checkUser(user);
                return makeOrder(user.id)
            }
        },
        deleteOrder: {
            type: OrderType,
            args: {
                orderId: {type: new GraphQLNonNull(GraphQLID)}
            },
            resolve(parentValue, args, {user}){
                checkUser(user);
                validateOrderId(args)
                return deleteOrder(args.orderId, user.id)
            }
        }
    }
})

module.exports = mutations