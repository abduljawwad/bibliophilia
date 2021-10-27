const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookSchema = new Schema({
	title: String,
	author: String,
	genre: String,
	imageUrl: String,
	readingFlag: {
		type: Boolean,
		default: true,
	},
	userId: {
		type: Schema.Types.ObjectId,
		ref: "User",
	}
})

const Book = mongoose.model('Book', BookSchema)

module.exports = Book;