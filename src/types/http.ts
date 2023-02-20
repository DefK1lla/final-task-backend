import type { IScore } from './Score';

export interface getByUserIdParams {
  userId: string;
  distance: number;
  game: string;
}

export interface createUserBody {
  score: IScore;
}
