const express = require('express')
const ExpressGraphQL = require('express-graphql')
const schema = require("./schema/rootSchema")
const cors = require('cors')
const {connectToDb}  = require("./Setup/db")
const {authenticate}  = require('./Middlewares/auth')
const config = require('./config')

const app = express()
const port = config.port || 5000
// enable cors
const corsOptions = {
    origin: config.accessApi,
    credentials: true
  };

app.use(cors(corsOptions));
app.use(authenticate)
app.use('/api/books', express.static('./public/books'))
app.use('/graphql', ExpressGraphQL({
    schema,
    graphiql:true
}))




connectToDb()
app.listen(port, () => {
    console.log(`Listening on port ${port} `)
})