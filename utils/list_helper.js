
const dummy = () =>  1

const totalLikes = blogs => blogs.reduce( (sum, likes) => sum + likes.likes, 0)

const favoriteBlog = blogs => {
	const biggest = Math.max(...blogs.map(n => n.likes))
	return blogs.map(blog => {
		return { likes: blog.likes, author: blog.author, title: blog.title, url: blog.url }
	}).find(b => b.likes === biggest)
}

const mostBlogs = blogs => {
	const tempList = []
	blogs.forEach(b => {
		const findOne = tempList.find(f => b.author === f.author)
		if(findOne){
			findOne.blogs = findOne.blogs +1
		}else {
			tempList.push({ author: b.author, blogs : 1})
		}
	})

	const biggestCount = Math.max(...tempList.map(t => t.blogs))
	return tempList.find(b => b.blogs === biggestCount)
}

const mostTotalLikes = blogs => {
	const tempList = []
	blogs.forEach(b => {
		const findOne = tempList.find(f => f.author === b.author)
		if(findOne){
			findOne.likes = findOne.likes + b.likes
		}else {
			tempList.push({ author: b.author, likes: b.likes })
		}
	})
	const biggestLikes = Math.max(...tempList.map(l => l.likes))
	return tempList.find(f => f.likes === biggestLikes)
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostTotalLikes }