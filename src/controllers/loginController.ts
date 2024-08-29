import { Request, Response } from 'express';
import * as userService from '../services/userService';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

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
    { id: userDb.id, username: userDb.user },
    `${process.env.JWT_SECRET}`,
    {
      expiresIn: '1h',
    }
  );

  return res.json({ token });
};
