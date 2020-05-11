const express = require('express')
const mongoose = require('mongoose')
const ExpressGraphQL = require('express-graphql')
const schema = require("./schema/rootSchema")

const app = express()
const port = process.env.PORT || 5000


app.use('/graphql', ExpressGraphQL({
    schema,
    graphiql:true
}))







mongoose.connect('mongodb://localhost/bookShop', {useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    console.log("Connected to mongodb")
}).catch(err => {
    console.log(err)
})

app.listen(port, () => {
    console.log(`Listening on port ${port} `)
})