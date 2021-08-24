const config = require('./utils/config')
const blogsRouter = require('./controllers/blogControls')
const usersRouter = require('./controllers/userControls')
const loginRouter = require('./controllers/login')
const mongoose = require('mongoose')
const express = require('express')
const app = express()
const cors = require('cors')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.extractTokenAndUser)
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

logger.info('connecting to', config.MONGO_DB_URI)

mongoose.connect(config.MONGO_DB_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
	useCreateIndex: true
}).then(()=> logger.info('Connected to MongoDB Atlas')).catch(error => logger.error(error))

module.exports = app