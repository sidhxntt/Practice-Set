import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { Request, Response, NextFunction } from 'express';
import { JwtPayload } from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET as string;

const decryptJWT = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Getting the token from the header

  if (!token) {
    return res.status(401).send('Token is required');
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(403).send('Invalid Token');
    }
    req.user = decoded as JwtPayload; // Ensure this matches the expected type
    next();
  });
};

export default decryptJWT;