const Joi = require('joi');

const bookSchema = Joi.object({
  title: Joi.string().required(),
  author: Joi.string().required(),
  publishedDate: Joi.date().iso().required(),
  genre: Joi.string().required(),
});

exports.validateBook = (book) => bookSchema.validate(book);