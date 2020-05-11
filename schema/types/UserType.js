const {GraphQLObjectType, GraphQLString, GraphQLID} = require('graphql');


const userType = new GraphQLObjectType({
    name:"User",
    fields: {
        _id: {type: GraphQLID}, 
        name: {type: GraphQLString}, 
        email: {type: GraphQLString}, 
        phone: {type: GraphQLString},
        imageUrl: {type: GraphQLString}
    }
})


module.exports = userType