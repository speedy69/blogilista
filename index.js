const http = require('http')
const config = require('./utils/config')
const router = require('./app')
const logger = require('./utils/logger')

http.createServer(router).listen(config.PORT, () => {
	logger.info(`Server running on port ${config.PORT}`)
})