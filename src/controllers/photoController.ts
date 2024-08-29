import { Request, Response } from 'express';
import { NewPhoto } from '../models/photoModel';
import * as photoService from '../services/photoService';

export const getPhotoById = (req: Request, res: Response): void => {
  const photo = photoService.findPhoto({ id: Number(req.params.id) });
  if (photo) {
    res.status(200).json(photo);
  } else {
    res.status(404).json({ message: 'Photo not found' });
  }
};

export const getPhotos = async (req: Request, res: Response): Promise<void> => {
  const page = parseInt(req.query.page as string, 6) || 1;
  const total = parseInt(req.query.total as string, 6) || 6;
  const user = req.query.user as string;

  const photos = await photoService.findPhotos({ userId: user }, page, total);

  if (photos) {
    res.status(200).json(photos);
  } else {
    res.status(404).json({ message: 'Photo not found' });
  }
};

export const create = (req: Request, res: Response): void => {
  const photo = photoService.create({
    userId: req.body.userId,
    author: req.body.author,
    title: req.body.title,
    date: req.body.date,
    src: req.body.src,
    weight: req.body.weight,
    age: req.body.age,
    totalAccess: req.body.totalAccess,
    totalComments: req.body.totalComments,
  } as NewPhoto);

  if (photo) {
    res.status(200).json(photo);
  } else {
    res.status(404).json({ message: 'Photo not found' });
  }
};
