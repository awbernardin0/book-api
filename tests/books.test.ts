import request from 'supertest';
import express from 'express';
import bodyParser from 'body-parser';
import BookRepository from '../repositories/booksRepository';
import BooksService from '../services/booksService';
import BooksController from '../controllers/booksController';

interface TestBook {
  title: string;
  author: string;
  publishedDate: string;
  genre: string;
}

const app = express();
app.use(bodyParser.json());

// Wire DI for tests
const repo = new BookRepository();
const service = new BooksService(repo);
const controller = new BooksController(service);
app.use('/api/books', controller.router);

let server: any;
beforeAll(() => {
  server = app.listen(4000);
});

afterAll((done) => {
  server.close(done);
});

describe('Books API', () => {
  it('should perform CRUD operations', async () => {
    const newBook: TestBook = {
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

  it('should return 400 if required fields are missing on create', async () => {
    const invalidBook = { author: 'Jane Doe' };
    const resp = await request(app).post('/api/books').send(invalidBook);
    expect(resp.status).toBe(400);
    expect(resp.body).toHaveProperty('error');
  });

  it('should return 400 if publishedDate is not ISO format', async () => {
    const invalidBook = {
      title: 'Bad Date',
      author: 'Jane Doe',
      publishedDate: 'not-a-date',
      genre: 'Fiction'
    };
    const resp = await request(app).post('/api/books').send(invalidBook);
    expect(resp.status).toBe(400);
    expect(resp.body).toHaveProperty('error');
  });

  it('should return 404 when updating a non-existent book', async () => {
    const updateData = {
      title: 'Does Not Exist',
      author: 'Nobody',
      publishedDate: '2020-01-01',
      genre: 'Fiction'
    };
    const resp = await request(app).put('/api/books/9999').send(updateData);
    expect(resp.status).toBe(404);
    expect(resp.body).toHaveProperty('error');
  });

  it('should return 404 when deleting a non-existent book', async () => {
    const resp = await request(app).delete('/api/books/9999');
    expect(resp.status).toBe(404);
    expect(resp.body).toHaveProperty('error');
  });

  it('should return 400 if empty payload is sent on create', async () => {
    const resp = await request(app).post('/api/books').send({});
    expect(resp.status).toBe(400);
    expect(resp.body).toHaveProperty('error');
  });

  it('should return 400 if empty payload is sent on update', async () => {
    // First, create a book
    const newBook: TestBook = {
      title: 'Book to Update',
      author: 'Jane Doe',
      publishedDate: '2020-01-01',
      genre: 'Fiction'
    };
    const createResp = await request(app).post('/api/books').send(newBook);
    const bookId = createResp.body.id;
    // Now, try to update with empty payload
    const resp = await request(app).put(`/api/books/${bookId}`).send({});
    expect(resp.status).toBe(400);
    expect(resp.body).toHaveProperty('error');
  });
}); 