const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
	name: { type: String, required: true},
	username: {	type: String, required: true, index: { unique: true}, minLength: 3 },
	password: { type: String, required: true, minLength: 3 },
	blogs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Blog', required: true }]
})

userSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
		delete returnedObject.password
	}
})

module.exports = mongoose.model('User', userSchema)