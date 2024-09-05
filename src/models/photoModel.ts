import { Generated, Insertable, Selectable } from 'kysely';

export interface PhotoTable {
  id: Generated<number>;
  userId: number;
  author: string;
  title: string;
  date: Date;
  img: string;
  weight: number;
  age: number;
  totalHits: number;
  totalComments: number;
}

export type Photo = Selectable<PhotoTable>;
export type NewPhoto = Insertable<PhotoTable>;
