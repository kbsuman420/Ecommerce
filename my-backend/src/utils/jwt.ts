import jwt from 'jsonwebtoken';
import type { Token } from 'typescript/unstable/ast';

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || 'your-secret-key'; // Replace with your own secret key
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || 'your-refresh-secret-key'; // Replace with your own refresh secret key

export interface TokenPayload {
    userId: string;
    email: string;
    role: string;
}

const generateAccessToken = (payload: TokenPayload): string => {
    return jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
}

const generateRefreshToken = (payload: TokenPayload): string => {
    return jwt.sign(payload, REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
}

const verifyAccessToken = (token: string): TokenPayload => {
    return jwt.verify(token, ACCESS_TOKEN_SECRET) as TokenPayload;
}

const verifyRefreshToken = (token: string): TokenPayload => {
    return jwt.verify(token, REFRESH_TOKEN_SECRET) as TokenPayload;
}

export interface TokenPayload {
    userId: string;
    email: string;
    role: string;
    iat?: number; // Issued at (added by JWT)
    exp?: number; // Expiration timestamp (added by JWT)
}

export { generateAccessToken, generateRefreshToken, verifyAccessToken, verifyRefreshToken }