import { Request, Response, NextFunction, RequestHandler } from 'express';
import Joi from 'joi';

// Define the validation schema
const articleSchema = Joi.object({
  title: Joi.string().min(5).required().messages({
    'string.empty': 'Title is required.',
    'string.min': 'Title must be at least 5 characters long.'
  }),
  content: Joi.string().min(20).required().messages({
    'string.empty': 'Content is required.',
    'string.min': 'Content must be at least 20 characters long.'
  }),
  url: Joi.string().uri().required().messages({
    'string.empty': 'Url is required',
    'string.uri': 'Invalid URL format. URL must start with http:// or https://.'
  })
});

// Middleware for article validation
export const validateArticle: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
  const { error } = articleSchema.validate(req.body);
  if (error) {
    res.status(400).json({ errors: error.details });
    return;
  }
  next();
};