import { db } from '../config/database';
import { Photo } from '../models/photoModel';

export async function findPhoto(criteria: Partial<Photo>) {
  let query = db.selectFrom('photo');

  if (criteria.id) {
    query = query.where('id', '=', criteria.id);
  }

  return await query.selectAll().execute();
}

export async function findPhotos(
  criteria: Partial<Photo>,
  page: number,
  total: number
) {
  const offset = (page - 1) * total;

  const query = db.selectFrom('photo').selectAll();

  if (criteria.userId != null) {
    query.where('userId', '=', criteria.userId);
  }

  return await query.offset(offset).limit(total).execute();
}
