import { ObjectId } from 'mongoose';

export interface IScore {
  _id: ObjectId;
  user: ObjectId | string;
  game: string;
  score: string;
  timestamp: Date;
  correct?: string;
  accuracy?: string;
  lastBoard?: number;
}
