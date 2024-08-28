import { Request, Response } from 'express';
import * as photoService from '../services/photoService';

export const getPhotoById = (req: Request, res: Response): void => {
  const photo = photoService.findPhoto({ id: Number(req.params.id) });
  if (photo) {
    res.status(200).json(photo);
  } else {
    res.status(404).json({ message: 'Photo not found' });
  }
};
