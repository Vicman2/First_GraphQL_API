const express = require('express')
const ExpressGraphQL = require('express-graphql')
const schema = require("./schema/rootSchema")
const cors = require('cors')
const {connectToDb}  = require("./Setup/db")
const config = require('./config')

const app = express()
const port = config.port || 5000
// enable cors
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true
  };


app.use(cors(corsOptions));
app.use('/api/books', express.static('./public/books'))
app.use('/graphql', ExpressGraphQL({
    schema,
    graphiql:true
}))




connectToDb()
app.listen(port, () => {
    console.log(`Listening on port ${port} `)
})