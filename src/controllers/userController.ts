import { Request, Response } from 'express';
import * as userService from '../services/userService';
import bcrypt from 'bcryptjs';

export const getUser = async (req: Request, res: Response) => {
  const user = userService.findUserBy({ id: req.user?.id });
  if (user) {
    console.log('user ' + JSON.stringify(user));
    res.status(200).json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

export const createUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const userId = await userService.create(
    username,
    await bcrypt.hash(password, 10)
  );
  res.status(201).json(userId);
};
