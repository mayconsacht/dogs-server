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

export const create = async (user: NewPhoto) => {
  let result = await db
    .insertInto('photo')
    .values({
      userId: user.userId,
      author: user.author,
      title: user.title,
      date: user.date,
      src: user.src,
      weight: user.weight,
      age: user.age,
      totalAccess: user.totalAccess,
      totalComments: user.totalComments,
    })
    .executeTakeFirst();

  return await result.insertId;
};
