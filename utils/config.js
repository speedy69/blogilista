require('dotenv').config()

const MONGO_DB = process.env.MONGO_DB
const PORT = process.env.PORT

module.exports = { MONGO_DB, PORT }