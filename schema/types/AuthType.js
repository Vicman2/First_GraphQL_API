const {GraphQLObjectType, GraphQLString} = require('graphql')
const {getUser} = require('../../services/user')
const userType = require('./UserType')


const AuthType = new GraphQLObjectType({
    name: "Auth", 
    fields: {
        token: {type: GraphQLString}, 
        user: {
            type: userType, 
            resolve(parentValue, args){
                return getUser(parentValue._doc)
            }
        }
    }
})


module.exports = AuthType