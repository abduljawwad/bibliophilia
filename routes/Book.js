const express = require('express');
const router = express.Router();
const Book = require('../controllers/Book')

// addBook
router.post("/addbook", Book.addBook)

// markBookAsComplete
router.post("/markBookAsComplete", Book.markBookAsComplete)

// changeBookStatustoReading
router.post("/changeBookStatustoReading", Book.changeBookStatustoReading)

// deleteBook
router.post("/deleteBook", Book.deleteBook)

// getAllBooksForUser
router.post("/getAllBooksForUser", Book.getAllBooksForUser)

module.exports = router;