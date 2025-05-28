# Book API

A simple REST API for managing books.

## Setup

```bash
npm install
npm run dev # for development with hot reload
```

## Running

```bash
npm start
```

The server will listen on **http://localhost:3000**.

## API Endpoints

- `GET /api/books` – list all books
- `GET /api/books/:id` – get book by ID
- `POST /api/books` – create a new book
- `PUT /api/books/:id` – update book by ID
- `DELETE /api/books/:id` – delete book by ID

## Validation

- `title`, `author`, `genre` must be strings
- `publishedDate` must be an ISO date string

## Testing

```bash
npm test
```

## Docker

Build and run with Docker:

```bash
docker-compose up --build