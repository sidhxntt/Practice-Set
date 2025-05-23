import jwt, { JwtPayload } from "jsonwebtoken";
import "dotenv/config";
import { Request, Response, NextFunction } from "express";

const secretKey = process.env.JWT_SECRET as string;

interface ExtendedJwtPayload extends JwtPayload {
  id: number; 
}

declare module "express-serve-static-core" {
  interface Request {
    user?: ExtendedJwtPayload;
  }
}

const decryptJWT = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Extract the token

  if (!token) {
    return res.status(401).json({ message: "Token is required" });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid or expired token" });
    }
    req.user = decoded as ExtendedJwtPayload; // Cast to the extended type
    next();
  });
};

export default decryptJWT;
