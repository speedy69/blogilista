const logger = require('./logger')
const jwt = require('jsonwebtoken')

const requestLogger = (request, response, next) => {
	logger.info('Method:', request.method)
	logger.info('Path:  ', request.path)
	logger.info('Body:  ', request.body)
	logger.info('__________________')
	next()
}

const extractTokenAndUser =  (request, response, next) => {
	const authorization = request.get('authorization')

	if(authorization && authorization.toLowerCase().startsWith('bearer ')){
		request.token = authorization.substring(7)
		// eslint-disable-next-line no-undef
		const user = jwt.verify(request.token, process.env.SECRET)
		//console.log(user)
		request.user = user.id
	}
	next()
}

const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
	logger.error(error.message, '<------------------------')

	if (error.name === 'CastError') {
		return response.status(400).send({ error: 'malformatted id' })
	} else if (error.name === 'ValidationError') {
		return response.status(400).json({ error: error.message })
	} else if(error.message.includes('E11000 duplicate key error collection: Blogilista.users')){
		return response.status(400).json({ error: 'invalid username pick another one'})
	} else if(error.name === 'JsonWebTokenError' || error.name === 'decodedToken is not defined'){
		return response.status(400).json({ error: 'token missing or invalid token' })
	}

	next(error)
}

module.exports = {
	requestLogger,
	unknownEndpoint,
	errorHandler,
	extractTokenAndUser
}