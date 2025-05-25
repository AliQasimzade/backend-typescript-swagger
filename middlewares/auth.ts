import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
  user?: any; 
}

export const verifyToken = (req: AuthRequest, res: Response, next: NextFunction):void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
     res.status(401).json({ message: "Unauthorized: No token provided", status: 401 });
     return;
  }

  const token = authHeader.split(" ")[1];

  try {
    const secret = process.env.JWT_SECRET as string
    const decoded = jwt.verify(token, secret);
    req.user = decoded; 
    next();
  } catch (error) {
     res.status(401).json({ message: "Unauthorized: Invalid token", status: 401 });
     return;
  }
};
