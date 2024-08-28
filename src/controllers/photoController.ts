import { Request, Response } from 'express';
import * as photoService from '../services/photoService';

export const getAllPhotos = (req: Request, res: Response): void => {
  const photos = photoService.getAllPhotos();
  res.status(200).json(photos);
};

export const getPhotoById = (req: Request, res: Response): void => {
  const photo = photoService.getPhotoById(Number(req.params.id));
  if (photo) {
    res.status(200).json(photo);
  } else {
    res.status(404).json({ message: 'Photo not found' });
  }
};

export const createPhoto = (req: Request, res: Response): void => {
  const newPhoto = photoService.createPhoto(req.body);
  res.status(201).json(newPhoto);
};
