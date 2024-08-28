import { Request, Response } from 'express';
import * as userService from '../services/userService';

export const getUser = (req: Request, res: Response): void => {
  const photo = userService.findUserBy({ id: Number(req.params.id) });
  if (photo) {
    res.status(200).json(photo);
  } else {
    res.status(404).json({ message: 'Photo not found' });
  }
};

export const createUser = (req: Request, res: Response): void => {
  const { username, password } = req.body;
  userService.create(username, password);
};
