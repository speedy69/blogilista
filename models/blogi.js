const mongoose = require('mongoose')
const config = require('../utils/config')

const blogSchema = mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
  })

mongoose.connect(config.MONGO_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(()=> console.log('Connected to MongoDB Atlas')).catch(error => console.log(error))

module.exports = mongoose.model('Blog', blogSchema)