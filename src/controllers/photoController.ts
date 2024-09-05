import { put } from '@vercel/blob';
import { Request, Response } from 'express';
import { NewPhoto } from '../models/photoModel';
import * as photoService from '../services/photoService';
import * as commentService from '../services/commentService';
import { UsingJoinColumnIsNotAllowedError } from 'typeorm';

export const getPhotoById = async (req: Request, res: Response) => {
  let photo = await photoService.findPhoto(Number(req.params.id));
  const comments = await commentService.findCommentsByPhoto(photo[0].id);

  if (photo) {
    res.status(200).json({ photo: photo[0], comments });
  } else {
    res.status(404).json({ message: 'Photo not found' });
  }
};

export const getPhotos = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string, 6) || 1;
  const total = parseInt(req.query.total as string, 6) || 6;
  const user = req.query.user as string;

  const photos = await photoService.findPhotos(
    { userId: Number(user) },
    page,
    total
  );

  if (photos) {
    res.status(200).json(photos);
  } else {
    res.status(404).json({ message: 'Photo not found' });
  }
};

export const create = async (req: Request, res: Response) => {
  const photoId = await photoService.create({
    userId: req.user?.id,
    author: req.user?.username,
    title: req.body.name,
    img: req.body.img,
    weight: req.body.weight,
    age: req.body.age,
  } as NewPhoto);

  if (photoId) {
    res.status(200).json(photoId);
  } else {
    res.status(404).json({ message: 'Photo not found' });
  }
};

export const uploadPhoto = async (req: Request, res: Response) => {
  const filename = req.query.filename as string;
  const blob = await put(filename, req.body, {
    access: 'public',
  });
  return res.json(blob.url);
};

export const deletePhoto = async (req: Request, res: Response) => {
  const numDeletedRow = await photoService.deletePhoto(Number(req.params.id));
  if (numDeletedRow) {
    res.status(200).json({ message: 'Photo deleted successfully' });
  } else {
    res.status(404).json({ message: 'Photo not found' });
  }
};
