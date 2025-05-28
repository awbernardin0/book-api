const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const BookRepository = require('../repositories/booksRepository');
const BooksService    = require('../services/booksService');
const BooksController = require('../controllers/booksController');

const app = express();
app.use(bodyParser.json());

// Wire DI for tests
const repo = new BookRepository();
const service = new BooksService(repo);
const controller = new BooksController(service);
app.use('/api/books', controller.router);

let server;
beforeAll(() => {
  server = app.listen(4000);
});
afterAll((done) => {
  server.close(done);
});

describe('Books API', () => {
  it('should perform CRUD operations', async () => {
    const newBook = {
      title: 'Test Book',
      author: 'John Doe',
      publishedDate: '2020-01-01',
      genre: 'Fiction'
    };
    const createResp = await request(app).post('/api/books').send(newBook);
    expect(createResp.status).toBe(201);
    expect(createResp.body).toHaveProperty('id');
    const bookId = createResp.body.id;

    const getResp = await request(app).get(`/api/books/${bookId}`);
    expect(getResp.status).toBe(200);
    expect(getResp.body.title).toBe(newBook.title);

    const updateData = { ...newBook, title: 'Updated Title' };
    const updateResp = await request(app).put(`/api/books/${bookId}`).send(updateData);
    expect(updateResp.status).toBe(200);
    expect(updateResp.body.title).toBe('Updated Title');

    const deleteResp = await request(app).delete(`/api/books/${bookId}`);
    expect(deleteResp.status).toBe(204);

    const getAfterDelete = await request(app).get(`/api/books/${bookId}`);
    expect(getAfterDelete.status).toBe(404);
  });
});