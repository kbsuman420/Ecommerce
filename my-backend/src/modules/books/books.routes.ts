import { Router } from 'express';
import { getBooks } from './books.controller';

export const booksRouter = Router();

booksRouter.get('/', getBooks);