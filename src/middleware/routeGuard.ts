import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export const authenticateToken = async (
  req: Request,
  res: Response,
  next: Function
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'Authorization header missing' });
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token missing' });
  }

  jwt.verify(token, `${process.env.JWT_SECRET}`, (err: any, user: any) => {
    if (err) return res.sendStatus(403);
    console.log('guard: ' + user);
    req.user = user;
    next();
  });
};
