import { Request, Response } from 'express';
import * as userService from '../services/userService';
import bcrypt from 'bcryptjs';

export const getUser = async (req: Request, res: Response) => {
  const user = await userService.findUserBy({ id: req.user?.id });
  if (user) {
    res.status(200).json(user[0]);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

export const createUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const user = await userService.findUserBy({ username });
  if (user.length > 0) {
    res.status(400).json({ message: 'User already registered' });
    return;
  }
  const userCreated = await userService.create(
    username,
    await bcrypt.hash(password, 10)
  );
  res.status(201).json(userCreated);
};
