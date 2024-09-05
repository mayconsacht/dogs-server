import { Request, Response } from 'express';
import { NewComment } from '../models/commentModel';
import * as commentService from '../services/commentService';

export const create = async (req: Request, res: Response) => {
  const comment = await commentService.create({
    photoId: Number(req.params.id),
    author: req.user?.username,
    content: req.body.comment,
  } as NewComment);

  if (comment) {
    res.status(200).json(comment);
  } else {
    res.status(404).json({ message: 'Photo not found' });
  }
};
