import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import * as userService from '../services/userService';
import bcrypt from 'bcryptjs';

export const validateToken = (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: 'Authorization header missing' });
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Token missing' });
  }

  try {
    jwt.verify(token, `${process.env.JWT_SECRET}`, (err: any, user: any) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      return res.sendStatus(204);
    });
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const userDb = await userService.findUser(username);
  if (!userDb) {
    return res.status(401).json({ message: 'Cannot find user' });
  }

  const isPasswordValid = bcrypt.compareSync(password, userDb.password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: 'Invalid password' });
  }

  const token = jwt.sign(
    { id: userDb.id, username: userDb.username },
    `${process.env.JWT_SECRET}`,
    {
      expiresIn: '1h',
    }
  );

  return res.json({ token });
};
