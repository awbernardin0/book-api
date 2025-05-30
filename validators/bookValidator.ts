import Joi from 'joi';

interface BookInput {
  title: string;
  author: string;
  publishedDate: string;
  genre: string;
}

const bookSchema = Joi.object({
  title: Joi.string().required(),
  author: Joi.string().required(),
  publishedDate: Joi.date().iso().required(),
  genre: Joi.string().required(),
});

export const validateBook = (book: BookInput) => bookSchema.validate(book); 