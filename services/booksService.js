class BooksService {
    constructor(bookRepository) {
      this.repo = bookRepository;
    }
  
    getAll() {
      return this.repo.getAll();
    }
  
    getById(id) {
      return this.repo.getById(id);
    }
  
    create(data) {
      return this.repo.create(data);
    }
  
    update(id, data) {
      return this.repo.update(id, data);
    }
  
    remove(id) {
      return this.repo.remove(id);
    }
  }
  
  module.exports = BooksService;