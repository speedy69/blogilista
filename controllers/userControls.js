const usersRouter = require('express').Router()
const User = require('../models/users')
require('express-async-errors')
const bcrypt = require('bcrypt')

/**----- GET get all users from database ------------*/
usersRouter.get('/', async (request, response) => {
	const usersAll = await User.find({}).populate('blogs', { user: 0, likes: 0})
	response.json(usersAll.map(u => u.toJSON()))
})

/**----- GET get one user from database ---------------*/
usersRouter.get('/:id', async (request, response) => {
	const user = await User.findById(request.params.id).populate('blogs')
	response.json(user.toJSON())
})

/**----- POST send one user to database ---------------*/
usersRouter.post('/', async (request, response) => {
	const password = await bcrypt.hash(request.body.password, 10) // 
	const user = new User({
		name: request.body.name,
		username: request.body.username,
		blogs: [],
		password,
	})
	const savedUser = await user.save()
	response.json(savedUser.toJSON())
})

module.exports = usersRouter