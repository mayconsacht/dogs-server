import { db } from '../config/database';
import { User } from '../models/userModel';

export const create = async (username: string, password: string) => {
  let result = await db
    .insertInto('user')
    .values({
      username,
      password,
    })
    .returningAll()
    .executeTakeFirst();
  return await result;
};

export const findUserBy = async (criteria: Partial<User>) => {
  let query = db.selectFrom('user');
  if (criteria.id) {
    query = query.where('id', '=', criteria.id);
  }
  if (criteria.username) {
    query = query.where('username', '=', criteria.username);
  }
  return await query.selectAll().limit(1).execute();
};

export const findUser = async (username: string) => {
  return (await db
    .selectFrom('user')
    .selectAll()
    .where('username', '=', username)
    .executeTakeFirst()) as User;
};
