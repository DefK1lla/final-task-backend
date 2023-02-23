import type { ObjectId } from 'mongoose';
import type { Games } from './games';

export interface IScore {
  _id: ObjectId;
  user: ObjectId | string;
  game: Games;
  score: string;
  date: Date;
  correct?: string;
  accuracy?: string;
  lastBoard?: number;
}
