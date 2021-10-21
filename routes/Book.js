const express = require('express');
const router = express.Router();
const Book = require('../controllers/Book')

// addBook
router.post("/addbook", Book.addBook)

// markBookAsComplete
router.post("/markBookAsComplete", Book.markBookAsComplete)

// deleteBook
router.post("/deleteBook", Book.deleteBook)

module.exports = router;