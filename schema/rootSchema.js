const {GraphQLSchema}  = require('graphql')
const query = require('./types/root_Query_Type')
const mutation = require('./mutations')

const rootSchema = new GraphQLSchema({
    query,
    mutation
})

module.exports = rootSchema