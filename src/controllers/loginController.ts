import { Request, Response } from 'express';
import * as userService from '../services/userService';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'secret';

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

  const token = jwt.sign({ id: userDb.id, username: userDb.user }, JWT_SECRET, {
    expiresIn: '1h',
  });

  return res.json({ token });
};

export const createUser = (req: Request, res: Response): void => {
  const { username, password } = req.body;
  userService.create(username, password);
};
