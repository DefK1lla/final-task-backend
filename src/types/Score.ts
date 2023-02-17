import { ObjectId } from 'mongoose';

export interface IScore {
  _id: ObjectId;
  user: ObjectId;
  game: string;
  score: string;
  correct?: string;
  accuracy?: string;
  date: Date;
}
