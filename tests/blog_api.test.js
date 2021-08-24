/* eslint-disable no-mixed-spaces-and-tabs */
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blogs')

const tempBlogs = [
	{
		'author': 'Kaisa Liski',
		'title': 'Asuntokauppaa',
		'url': 'www.jossain.com',
		'likes': 5,
		'id': '6120c2bee62929419487f494'
	  },
	  {
		'title': 'Poliitikon elämä',
		'author': 'Paavo lipponen',
		'url': 'www.jossain.com',
		'likes': 1,
		'id': '6122520a91fccc2b3ca50d24'
	  }
]

beforeEach(async () => {
	await Blog.deleteMany({})
	let noteObject = new Blog(tempBlogs[0])
	await noteObject.save()
	noteObject = new Blog(tempBlogs[1])
	await noteObject.save()
})


const api = supertest(app)

describe('GET blogs from database', () =>{
	test('testing mongo get all', async () => {
		await api
			.get('/api/blogs')
			.expect(200)
			.expect('Content-Type', /application\/json/)
	})

	test('there are two notes', async () => {
		const response = await api.get('/api/blogs')
		expect(response.body).toHaveLength(tempBlogs.length)
	})

	test('the first blog is about HTTP methods', async () => {
		const response = await api.get('/api/blogs')
		const titles = response.body.map(con => con.title)

		expect(titles).toContain('Poliitikon elämä')
	})
})

afterAll(() => mongoose.connection.close())