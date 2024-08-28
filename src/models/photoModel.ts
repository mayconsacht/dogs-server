import { Generated, Selectable } from 'kysely';

export interface PhotoTable {
  id: Generated<number>;
  userId: string;
  author: string;
  title: string;
  date: Date;
  src: string;
  weight: Number;
  age: Number;
  totalAccess: Number;
  totalComments: Number;
}

export type Photo = Selectable<PhotoTable>;
