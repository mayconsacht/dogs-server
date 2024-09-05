import { Generated, Insertable, Selectable } from 'kysely';

export interface CommentTable {
  id: Generated<number>;
  photoId: number;
  author: string;
  content: string;
}

export type Comment = Selectable<CommentTable>;
export type NewComment = Insertable<CommentTable>;
