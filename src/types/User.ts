import { ObjectId } from 'mongoose';

export interface IUser {
  username: string;
  password?: string;
  _id: ObjectId;
  googleId?: string;
}
