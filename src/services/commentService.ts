import { db } from '../config/database';
import { NewComment } from '../models/commentModel';

export const findCommentsByPhoto = async (photoId: number) => {
  return await db
    .selectFrom('comment')
    .where('photoId', '=', photoId)
    .selectAll()
    .execute();
};

export const create = async (comment: NewComment) => {
  let result = await db
    .insertInto('comment')
    .values({
      photoId: comment.photoId,
      author: comment.author,
      content: comment.content,
    })
    .returningAll()
    .executeTakeFirstOrThrow();

  return result;
};

export const deleteComments = async (photoId: number) => {
  let result = await db
    .deleteFrom('comment')
    .where('photoId', '=', photoId)
    .executeTakeFirst();
  return result.numDeletedRows;
};
