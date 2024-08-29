import { db } from '../config/database';
import { User } from '../models/userModel';

export const create = async (user: string, password: string) => {
  let result = await db
    .insertInto('user')
    .values({
      user,
      password,
    })
    .executeTakeFirst();

  return await result.insertId;
};

export const findUserBy = async (criteria: Partial<User>) => {
  let query = db.selectFrom('user');

  if (criteria.id) {
    query = query.where('id', '=', criteria.id);
  }

  return await query.selectAll().execute();
};

export const findUser = async (username: string) => {
  return (await db
    .selectFrom('user')
    .where('user', '=', username)
    .executeTakeFirst()) as User;
};
