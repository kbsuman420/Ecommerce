import type { NextFunction } from "express";
import { verifyAccessToken, type TokenPayload } from "../utils/jwt";

export interface AuthenticatedRequest extends Request {
    user?: TokenPayload;
}

const authMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ status: 'error', message: 'No token provided' });
    }

    try {
        const payload = verifyAccessToken(token);
        req.user = payload;
        next();
    } catch (error) {
        return res.status(401).json({ status: 'error', message: 'Invalid token' });
    }
}