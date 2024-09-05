import { db } from '../config/database';
import { NewPhoto, Photo } from '../models/photoModel';

export const findPhoto = async (criteria: Partial<Photo>) => {
  let query = db.selectFrom('photo');

  if (criteria.id) {
    query = query.where('id', '=', criteria.id);
  }

  return await query.selectAll().execute();
};

export const findPhotos = async (
  criteria: Partial<Photo>,
  page: number,
  total: number
) => {
  const offset = (page - 1) * total;

  const query = db.selectFrom('photo').selectAll();

  if (criteria.userId != null) {
    query.where('userId', '=', criteria.userId);
  }

  return await query.offset(offset).limit(total).execute();
};

export const create = async (photo: NewPhoto) => {
  let result = await db
    .insertInto('photo')
    .values({
      userId: photo.userId,
      author: photo.author,
      title: photo.title,
      date: photo.date,
      img: photo.img,
      weight: photo.weight,
      age: photo.age,
      totalHits: photo.totalHits,
      totalComments: photo.totalComments,
    })
    .returning('id')
    .executeTakeFirstOrThrow();

  return result.id;
};
