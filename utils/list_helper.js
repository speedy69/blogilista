
const dummy = () =>  1

const totalLikes = blogs => blogs.reduce( (sum, likes) => sum + likes.likes, 0)

const favoriteBlog = blogs => {
	const biggest = Math.max(...blogs.map(n => n.likes))
	return blogs.map(blog => {
		return { likes: blog.likes, author: blog.author, title: blog.title, url: blog.url }
	}).find(b => b.likes === biggest)
}

const mostBlogs = blogs => {

}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs }