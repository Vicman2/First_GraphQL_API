const {GraphQLID, GraphQLString, GraphQLInt, GraphQLObjectType} = require("graphql")


const authorType = new GraphQLObjectType({
    name: "Author", 
    fields: {
        _id :{type: GraphQLID}, 
        name: {type: GraphQLString}, 
        website: {type: GraphQLString},
        rating : {type: GraphQLInt}
    }
})

module.exports = authorType