import { ObjectId } from 'mongoose';

export interface IScore {
  _id: ObjectId;
  user: ObjectId;
  game: string;
  score: string;
  currect?: string;
  accuracy?: string;
}
