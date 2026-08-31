import { type Request, type Response } from 'express';


export const getBooks = (req: Request, res: Response) => {
    res.json({message: "List of books"})
}