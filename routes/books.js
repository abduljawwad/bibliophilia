const express = require('express');
const router = express.Router();

const books = require('../controllers/books');
console.log("🚀 ~ file: books.js ~ line 5 ~ books", books)

// router.get("/api/books", getBooks);

// router.post("/api/books", createBookEntry);

// router.put("/api/books/:id", updateBookEntry);

// router.delete("/api/books/:id", deleteBookEntry);

module.exports = router;