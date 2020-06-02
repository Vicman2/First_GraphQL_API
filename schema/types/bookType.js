const {GraphQLString, GraphQLObjectType, GraphQLID, GraphQLInt} = require('graphql')
const {getAuthor} = require('../../services/author')
const AuthorType = require('./AuthorType')


const detail = new GraphQLObjectType({
    name: "Details", 
    fields: {
        paperBack: {type: GraphQLString}, 
        published: {type: GraphQLInt},
        ISBN : {type: GraphQLString}, 
        language : {type: GraphQLString}
    }
})

const bookType = new GraphQLObjectType({
    name: "Book", 
    fields: {
        _id:{type: GraphQLID},
        title:{type : GraphQLString},
        description: { type: GraphQLString}, 
        price: {type: GraphQLInt}, 
        imageUrl: {type: GraphQLString},
        details: {type: detail}, 
        author: {
            type: AuthorType, 
            resolve(parentValue, args){
                return getAuthor(parentValue.author)
            }
        }
    }
})

module.exports = bookType