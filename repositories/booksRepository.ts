interface Book {
  id: number;
  title: string;
  author: string;
  year?: number;
  [key: string]: any;
}

let books: Book[] = [];
let nextId = 1;

class BookRepository {
  getAll(): Book[] {
    return books;
  }

  getById(id: number): Book | undefined {
    return books.find(b => b.id === id);
  }

  create(data: { title: string; author: string; year?: number }): Book {
    const book: Book = { id: nextId++, ...data };
    books.push(book);
    return book;
  }

  update(id: number, data: Partial<Omit<Book, 'id'>>): Book | null {
    const index = books.findIndex(b => b.id === id);
    if (index === -1) return null;
    books[index] = { ...books[index], ...data };
    return books[index];
  }

  remove(id: number): Book | null {
    const index = books.findIndex(b => b.id === id);
    if (index === -1) return null;
    return books.splice(index, 1)[0];
  }
}

export default BookRepository; 