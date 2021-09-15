const express = require('express');
const router = express.Router();
const booksSchema = require('../schemas/books.json');

const books = require('../controllers/books');
console.log("🚀 ~ file: books.js ~ line 5 ~ books", books)

router.post("/", (req, res) => {
  res.send(req.body);
});

module.exports = router;