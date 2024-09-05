import { db } from '../config/database';
import { NewPhoto, Photo } from '../models/photoModel';
import { deleteComments } from './commentService';

export const findPhoto = async (id: number) => {
  const photo = (
    await db
      .selectFrom('photo')
      .where('id', '=', id)
      .selectAll()
      .limit(1)
      .execute()
  )[0];
  return await updateHitsCount(photo);
};

async function updateHitsCount(photo: Photo) {
  const photoUpdated = await db
    .updateTable('photo')
    .set({
      totalHits: photo.totalHits++,
    })
    .where('id', '=', photo.id)
    .returningAll()
    .execute();
  return photoUpdated;
}

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
    })
    .returning('id')
    .executeTakeFirstOrThrow();

  return result.id;
};

export const deletePhoto = async (id: number) => {
  let result = await db
    .deleteFrom('photo')
    .where('id', '=', id)
    .executeTakeFirst();

  if (result.numDeletedRows) {
    await deleteComments(id);
  }

  return result.numDeletedRows;
};
