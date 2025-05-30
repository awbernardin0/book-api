# Book API

A RESTful API for managing books, built with Express.js and TypeScript.

## Features

- CRUD operations for books
- Input validation using Joi
- TypeScript for type safety
- Express.js for routing and middleware
- Clean architecture with separation of concerns
- Automated tests with Jest and Supertest

## Prerequisites

- Node.js (v16 or higher)
- npm (v8 or higher)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd book-api
```

2. Install dependencies:
```bash
npm install
```

## Development

To run the development server with hot reloading:
```bash
npm run dev
```

## Building

To compile TypeScript to JavaScript:
```bash
npm run build
```

## Running in Production

To start the production server:
```bash
npm start
```

## API Endpoints

### Books

- `GET /api/books` - Get all books
- `GET /api/books/:id` - Get a book by ID
- `POST /api/books` - Create a new book
- `PUT /api/books/:id` - Update a book
- `DELETE /api/books/:id` - Delete a book

### Book Schema

```typescript
interface Book {
  id: number;
  title: string;
  author: string;
  publishedDate: string;
  genre: string;
}
```

## Project Structure

```
book-api/
├── controllers/     # Request handlers
├── services/        # Business logic
├── repositories/    # Data access
├── validators/      # Input validation
├── dist/            # Compiled JavaScript
└── tests/           # Test files
```

## Scripts

- `npm run dev` - Run development server with hot reloading
- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Run the compiled JavaScript
- `npm test` - Run tests with Jest and TypeScript

## License

MIT

## Validation

- `title`, `author`, `genre` must be strings
- `publishedDate` must be an ISO date string

## Testing

The project uses Jest and ts-jest for running TypeScript tests. To run all tests:

```bash
npm test
```

You should see output indicating all tests pass. Make sure you are using Node.js v16 or higher for compatibility with ts-jest and modern JavaScript features.

## Docker

Build and run with Docker:

```bash
docker-compose up --build