let books = [];
let nextId = 1;

class BookRepository {
  getAll() {
    return books;
  }

  getById(id) {
    return books.find(b => b.id === id);
  }

  create(data) {
    const book = { id: nextId++, ...data };
    books.push(book);
    return book;
  }

  update(id, data) {
    const index = books.findIndex(b => b.id === id);
    if (index === -1) return null;
    books[index] = { id, ...data };
    return books[index];
  }

  remove(id) {
    const index = books.findIndex(b => b.id === id);
    if (index === -1) return null;
    return books.splice(index, 1)[0];
  }
}

module.exports = BookRepository;