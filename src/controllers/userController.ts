import { Request, Response } from 'express';
import * as userService from '../services/userService';
import bcrypt from 'bcryptjs';

export const getUser = async (req: Request, res: Response): Promise<void> => {
  const photo = await userService.findUserBy({ id: Number(req.params.id) });
  if (photo) {
    res.status(200).json(photo);
  } else {
    res.status(404).json({ message: 'Photo not found' });
  }
};

export const createUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { username, password } = req.body;
  const userId = await userService.create(
    username,
    await bcrypt.hash(password, 10)
  );
  res.status(201).json(userId);
};
