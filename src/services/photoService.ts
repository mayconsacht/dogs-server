import { db } from '../config/database';
import { Photo } from '../models/photoModel';

export async function findPhotoBy(criteria: Partial<Photo>) {
  let query = db.selectFrom('photo');

  if (criteria.id) {
    query = query.where('id', '=', criteria.id);
  }

  return await query.selectAll().execute();
}

export async function findPhotos() {
  let query = db.selectFrom('photo');
  return await query.selectAll().execute();
}
