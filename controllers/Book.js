const express = require('express');
const bcrypt = require('bcrypt')

// models
const User = require('./../models/User')
const Book = require('./../models/Book')

module.exports.addBook = async (req,res, next) => {
	const { title, author, genre, readingFlag, userId } = req.body;

	try{
		// Find book by title, author & userId 
		const searchedBook =  await Book.find({title, author, userId})
		// If book isn't found:
			// create book
			// update user
		if (!searchedBook.length) {
			const newBook = await Book.create({						
				title,
				author,
				genre,
				readingFlag,
				userId
			});
			const updatedUser = await User.findByIdAndUpdate(
				userId, 
				{$push: { books: newBook._id}},
				{new: true}
				);
		}		
		// Get all books for the user
			// Find User
			// query books array
		const allBooks = await User.findById(userId).populate('books').select('books -_id')
		res.send(allBooks)
	} catch(error){
		console.log(error)
	}
}

module.exports.getAllBooksForUser = async (req,res,next) => {
	const { _id:userId } = req.body;
	// GetAllBooks for a particular user (userId)
		// Find User
		// query books array
		try{
			const allBooks = await User.findById(userId).populate('books').select('books -_id')
			res.send(allBooks)
		} catch(error) {
			next(error)
		}
}

module.exports.markBookAsComplete = async (req,res,next) => {
	const {userId, _id:bookId, readingFlag} = req.body;
  console.log("🚀 ~ file: Book.js ~ line 56 ~ module.exports.markBookAsComplete ~ readingFlag", readingFlag)

	// MarkAsRead (userId, bookId)
		// Find Book
			// set readingFlag as false
		// Find all books for User after update

	try{
			const updateBook = await Book.findByIdAndUpdate(
				bookId,
				{
					$set: {
						readingFlag: false
					}
				},
				{new: true} 
				);

			const allBooksForUserAfterUpdate = await User.findById(userId).populate('books').select('books -_id')
			res.send(allBooksForUserAfterUpdate)
	} catch(error) {
		next(error)
	}
}

module.exports.changeBookStatustoReading = async (req,res,next) => {
	const {userId, _id:bookId, readingFlag} = req.body;

	// MarkAsRead (userId, bookId)
		// Find Book
			// set readingFlag as true
		// Find all books for User after update

	try{
			const updateBook = await Book.findByIdAndUpdate(
				bookId,
				{
					$set: {
						readingFlag: true
					}
				},
				{new: true} 
				);
			const allBooksForUserAfterUpdate = await User.findById(userId).populate('books').select('books -_id')
			res.send(allBooksForUserAfterUpdate)
	} catch(error) {
		next(error)
	}
}

module.exports.deleteBook = async (req,res,next) => {
	const {userId, _id:bookId} = req.body;

	// Delete book (userId, bookId)
		// Find and delete Book
		// Find all books for User after update

	try{
		const deleteBook = await Book.findByIdAndDelete(
			bookId,
			{new: true} 
			);

		const updatedUser = await User
		  .findByIdAndUpdate(userId, {
				$pull: {
					books: deleteBook._id
				}
			}, {new: true});

		const allBooksForUserAfterUpdate = await User.findById(userId).populate('books').select('books -_id')
		res.send(allBooksForUserAfterUpdate)
	} catch(error) {
		next(error)
	}
}