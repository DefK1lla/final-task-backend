import type { Request, Response } from 'express';

import type {
  getByUserIdParams,
  createUserBody,
} from '../types/http';
import type { IUser } from '../types/User';

import scoreService from '../services/scoreService';

class ScoreController {
  create = async (req: Request, res: Response) => {
    const body: createUserBody = req?.body;
    const newScore = await scoreService.create(body.score);
    res.status(200).json(newScore);
  };

  getByUserId = async (req: Request, res: Response) => {
    const { _id: userId } = req.user as IUser;
    const { distance, game }: getByUserIdParams =
      req.params as unknown as getByUserIdParams;
    const scores = await scoreService.getByUserId(
      userId,
      distance,
      game
    );
    res.status(200).json(scores);
  };
}

export default new ScoreController();
