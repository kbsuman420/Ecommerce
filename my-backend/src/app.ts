import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(morgan('dev'));


const corsOptions  = {
    origin: 'http://localhost:3000', // Replace with your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}
app.use(cors(corsOptions));




export default app;

