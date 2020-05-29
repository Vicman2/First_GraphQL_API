const mongoose = require('mongoose');
const {databaseName, databaseURI}= require('../config')

module.exports = {
    connectToDb : () => {
        mongoose.connect(`${databaseURI}${databaseName}`, {useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log("Connected to mongodb")
        }).catch(err => {
            console.log(err)
        })
    }
}