import type { IScore } from './score';

export interface getByUserIdParams {
  userId: string;
  distance: number;
  game: string;
}

export interface createUserBody {
  score: IScore;
}
