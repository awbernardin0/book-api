const express = require('express');
const bodyParser = require('body-parser');
const BookRepository = require('./repositories/booksRepository');
const BooksService    = require('./services/booksService');
const BooksController = require('./controllers/booksController');

// Instantiate dependencies
const bookRepo   = new BookRepository();
const bookService = new BooksService(bookRepo);
const bookController = new BooksController(bookService);

const app = express();
app.use(bodyParser.json());
app.use('/api/books', bookController.router);

// Global error handler
app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).json({ error: err.message });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});