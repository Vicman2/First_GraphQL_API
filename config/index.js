const envFound = require('dotenv').config()
if(!envFound) throw new Error("Cannot find .env file")

module.exports= {
    port: process.env.PORT, 
    databaseURI: process.env.DATABASE_URI,
    databaseName: process.env.DATABASE_NAME,
    jwtKey: process.env.JWT_KEY,
    accessApi: process.env.ACCESS_API
}