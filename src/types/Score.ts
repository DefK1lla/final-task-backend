import { ObjectId } from 'mongoose';

export interface IScore {
  _id: ObjectId;
  user: ObjectId | string;
  game: string;
  score: string;
  correct?: string;
  accuracy?: string;
  date: Date;
}
