import express from 'express';
import morgan from 'morgan';
import { booksRouter } from './modules/books/books.routes';

const app = express();

app.use(express.json());
app.use(morgan('dev'));

// Mount routes
app.use('/api/books', booksRouter);

export default app;

