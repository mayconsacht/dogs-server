import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export const authenticateToken = async (
  req: Request,
  res: Response,
  next: Function
) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET + '', (err: any, user: any) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};
