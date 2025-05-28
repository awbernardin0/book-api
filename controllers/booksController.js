const express = require('express');
const { validateBook } = require('../validators/bookValidator');

class BooksController {
  constructor(booksService) {
    this.service = booksService;
    this.router = express.Router();

    this.router.get('/', this.getAll.bind(this));
    this.router.get('/:id', this.getById.bind(this));
    this.router.post('/', this.create.bind(this));
    this.router.put('/:id', this.update.bind(this));
    this.router.delete('/:id', this.remove.bind(this));
  }

  getAll(req, res) {
    res.json(this.service.getAll());
  }

  getById(req, res) {
    const id = parseInt(req.params.id, 10);
    const book = this.service.getById(id);
    if (!book) return res.status(404).json({ error: 'Book not found' });
    res.json(book);
  }

  create(req, res) {
    const { error, value } = validateBook(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });
    const newBook = this.service.create(value);
    res.status(201).json(newBook);
  }

  update(req, res) {
    const id = parseInt(req.params.id, 10);
    const { error, value } = validateBook(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });
    const updated = this.service.update(id, value);
    if (!updated) return res.status(404).json({ error: 'Book not found' });
    res.json(updated);
  }

  remove(req, res) {
    const id = parseInt(req.params.id, 10);
    const removed = this.service.remove(id);
    if (!removed) return res.status(404).json({ error: 'Book not found' });
    res.status(204).end();
  }
}

module.exports = BooksController;