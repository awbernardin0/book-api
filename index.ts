import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import BookRepository from './repositories/booksRepository';
import BooksService from './services/booksService';
import BooksController from './controllers/booksController';

// Instantiate dependencies
const bookRepo = new BookRepository();
const bookService = new BooksService(bookRepo);
const bookController = new BooksController(bookService);

const app = express();
app.use(bodyParser.json());
app.use('/api/books', bookController.router);

// Global error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  const status = (err as any).status || 500;
  res.status(status).json({ error: err.message });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 