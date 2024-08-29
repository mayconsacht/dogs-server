import { Generated, Insertable, Selectable } from 'kysely';

export interface UserTable {
  id: Generated<number>;
  username: string;
  password: string;
}

export type User = Selectable<UserTable>;
export type NewUser = Insertable<UserTable>;
