import { put } from '@vercel/blob';
import { Request, Response } from 'express';
import { NewPhoto, Photo } from '../models/photoModel';
import * as photoService from '../services/photoService';
import * as commentService from '../services/commentService';

export const getPhotoById = async (req: Request, res: Response) => {
  let photo = await photoService.findPhoto(Number(req.params.id));
  const comments = await commentService.findCommentsByPhoto(photo[0].id);

  if (photo) {
    res.status(200).json({ photo: photo[0], comments });
  } else {
    res.status(404).json({ message: 'Photo not found' });
  }
};

const isNumber = (value: any) => {
  return /^-?\d+(\.\d+)?$/.test(value);
};

export const getPhotos = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string, 6) || 1;
  const total = parseInt(req.query.total as string, 6) || 6;
  const user = req.query.user as string;
  let filter = isNumber(user) ? { userId: Number(user) } : { author: user };
  const photos = await photoService.findPhotos(filter, page, total);
  if (photos) {
    res.status(200).json(photos);
  } else {
    res.status(404).json({ message: 'Photo not found' });
  }
};

export const create = async (req: Request, res: Response) => {
  const photo = {
    userId: req.user?.id,
    author: req.user?.username,
    title: req.body.name,
    img: req.body.img,
    weight: req.body.weight,
    age: req.body.age,
  } as NewPhoto;
  const photoId = await photoService.create(photo);

  if (photoId) {
    res.status(200).json(photo);
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

export const getStats = async (req: Request, res: Response) => {
  const photos = await photoService.findPhotos(
    { userId: Number(req.user?.id) },
    0,
    0
  );
  if (photos) {
    const stats = mapToStats(photos);
    res.status(200).json(stats);
  } else {
    res.status(404).json({ message: 'Photo not found' });
  }
};

export const mapToStats = (photos: Photo[]) => {
  return photos.map((photo) => ({
    id: photo.id,
    title: photo.title,
    hits: photo.totalHits,
  }));
};
