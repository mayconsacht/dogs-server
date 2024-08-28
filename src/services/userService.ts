import { db } from '../config/database';
import { User } from '../models/userModel';

export async function create(user: string, password: string) {
  let result = await db
    .insertInto('user')
    .values({
      user,
      password,
    })
    .executeTakeFirst();

  return await result.insertId;
}

export async function findUserBy(criteria: Partial<User>) {
  let query = db.selectFrom('user');

  if (criteria.id) {
    query = query.where('id', '=', criteria.id);
  }

  return await query.selectAll().execute();
}

export async function findUser(username: string) {
  return (await db
    .selectFrom('user')
    .where('user', '=', username)
    .executeTakeFirst()) as User;
}
