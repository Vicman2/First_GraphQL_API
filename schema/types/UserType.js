const {GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList} = require('graphql');


const userType = new GraphQLObjectType({
    name:"User",
    fields: {
        _id: {type: GraphQLID}, 
        name: {type: GraphQLString}, 
        email: {type: GraphQLString}, 
        phone: {type: GraphQLString},
        imageUrl: {type: GraphQLString}, 
        cart: {type: new GraphQLList(GraphQLID)}
    }
})


module.exports = userType