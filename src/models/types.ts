import { PhotoTable } from './photoModel';
import { UserTable } from './userModel';

export interface Database {
  photo: PhotoTable;
  user: UserTable;
}
