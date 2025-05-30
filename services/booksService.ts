import BookRepository from '../repositories/booksRepository';

interface Book {
  id: number;
  title: string;
  author: string;
  year?: number;
  [key: string]: any;
}

class BooksService {
  private repo: BookRepository;

  constructor(bookRepository: BookRepository) {
    this.repo = bookRepository;
  }

  getAll(): Book[] {
    return this.repo.getAll();
  }

  getById(id: number): Book | undefined {
    return this.repo.getById(id);
  }

  create(data: { title: string; author: string; year?: number }): Book {
    return this.repo.create(data);
  }

  update(id: number, data: Partial<Omit<Book, 'id'>>): Book | null {
    return this.repo.update(id, data);
  }

  remove(id: number): Book | null {
    return this.repo.remove(id);
  }
}

export default BooksService; 