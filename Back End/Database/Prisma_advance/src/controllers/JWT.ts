import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { JwtPayload } from 'jsonwebtoken';

const createToken = (id: number): Promise<string> => {
    const secret = process.env.JWT_SECRET;
    const maxAge = process.env.MAX_AGE;

    if (!secret) {
        return Promise.reject(new Error('JWT_SECRET environment variable is not defined'));
    }
  
    if (!maxAge) {
        return Promise.reject(new Error('MAX_AGE environment variable is not defined'));
    }

    return new Promise<string>((resolve, reject) => {
        jwt.sign({ id }, secret, {
            expiresIn: parseInt(maxAge, 10), 
        }, (err, token) => {
            if (err) {
                return reject(err);
            }
            if (!token) {
                return reject(new Error('Failed to create token'));
            }
            resolve(token);
        });
    });
};

declare global {
    namespace Express {
        interface Request {
            user?: JwtPayload | string;
        }
    }
}

export default createToken;