const blogsRouter = require('express').Router()
const Blog = require('../models/blogs')
require('express-async-errors')
const User = require('../models/users')
const jwt = require('jsonwebtoken')

/**---- GET get all blogs from DB ----------------------*/
blogsRouter.get('/', async (request, response) => {
	const allBlogs = await Blog.find({}).populate('user', { name: 1})
	response.json(allBlogs.map(blog => blog.toJSON()))
})

/**---- GET get one blog from DB ----------------------*/
blogsRouter.get('/:id', async (request, response) => {
	const oneBlog = await Blog.findById(request.params.id).populate('user')
	if(oneBlog){
		response.json(oneBlog.toJSON())
	}else {
		response.status(404).end()
	}
})

/**----- POST add one blog to DB ------------------------*/
blogsRouter.post('/', async (request, response) => {	
	const user = await User.findById(request.user)

	const blog = new Blog({
		title: request.body.title,
		author: request.body.author,
		url: request.body.url,
		likes: request.body.likes,
		user: user._id,
	})
	const saveBlog = await blog.save()
	user.blogs = await user.blogs.concat(saveBlog._id)
	user.save()
	response.json(saveBlog.toJSON())
})

/**------- DELETE remove one blog from DB ------------------*/
blogsRouter.delete('/:id', async (request, response) => {
	const user = await User.findById(request.user)
	const blog = await Blog.findById(request.params.id)
	
	if(user._id.toString() === blog.user.toString()){
		await blog.delete()
		response.status(204).end()
	// eslint-disable-next-line no-undef
	}else response.status(401).send({ error: 'invalid user'})
})

/**----------- PUT update one blog from DB ------------------*/
blogsRouter.put('/:id', async (request, response) => {
	const updateBlog = await Blog.findByIdAndUpdate(request.params.id,
		{ author: request.body.author, title: request.body.title, url: request.body.url, likes: request.body.likes }, { new: true})
	response.json(updateBlog.toJSON())
})

module.exports = blogsRouter