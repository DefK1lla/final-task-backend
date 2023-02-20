import { ObjectId } from 'mongoose';
import { Games } from './games';

export interface IUser {
  username: string;
  password?: string;
  _id: ObjectId;
  googleId?: string;
  playedGames?: Games[];
}
