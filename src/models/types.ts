import { PhotoTable } from './photoModel';
import { UserTable } from './userModel';
import { CommentTable } from './commentModel';

export interface Database {
  photo: PhotoTable;
  user: UserTable;
  comment: CommentTable;
}
