import { Generated, Selectable } from 'kysely';

export interface PhotoTable {
  id: Generated<number>;
  author: string;
  title: string;
  date: Date;
  src: string;
  weight: string;
  age: Number;
  totalAccess: Number;
  totalComments: Number;
}

export type Photo = Selectable<PhotoTable>;
