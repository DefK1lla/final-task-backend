import type { Request } from 'express';

import type { IScore } from './Score';

export interface getByUserIdRequest extends Request<unknown> {
  params: {
    userId: string;
    distance: number;
    game: string;
  };
}

export interface createUserRequest extends Request {
  body: {
    userId: string;
    score: IScore;
  };
}
