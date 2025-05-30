import { Router, Request, Response } from 'express';
import BooksService from '../services/booksService';
import { validateBook } from '../validators/bookValidator';

class BooksController {
  public router: Router;
  private service: BooksService;

  constructor(booksService: BooksService) {
    this.service = booksService;
    this.router = Router();

    this.router.get('/', this.getAll.bind(this));
    this.router.get('/:id', this.getById.bind(this));
    this.router.post('/', this.create.bind(this));
    this.router.put('/:id', this.update.bind(this));
    this.router.delete('/:id', this.remove.bind(this));
  }

  getAll(req: Request, res: Response): void {
    res.json(this.service.getAll());
  }

  getById(req: Request, res: Response): void {
    const id = parseInt(req.params.id, 10);
    const book = this.service.getById(id);
    if (!book) {
      res.status(404).json({ error: 'Book not found' });
      return;
    }
    res.json(book);
  }

  create(req: Request, res: Response): void {
    const { error, value } = validateBook(req.body);
    if (error) {
      res.status(400).json({ error: error.details[0].message });
      return;
    }
    const newBook = this.service.create(value);
    res.status(201).json(newBook);
  }

  update(req: Request, res: Response): void {
    const id = parseInt(req.params.id, 10);
    const { error, value } = validateBook(req.body);
    if (error) {
      res.status(400).json({ error: error.details[0].message });
      return;
    }
    const updated = this.service.update(id, value);
    if (!updated) {
      res.status(404).json({ error: 'Book not found' });
      return;
    }
    res.json(updated);
  }

  remove(req: Request, res: Response): void {
    const id = parseInt(req.params.id, 10);
    const removed = this.service.remove(id);
    if (!removed) {
      res.status(404).json({ error: 'Book not found' });
      return;
    }
    res.status(204).end();
  }
}

export default BooksController; 