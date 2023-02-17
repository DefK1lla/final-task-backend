import type { Response } from 'express';

import type {
  createUserRequest,
  getByUserIdRequest,
} from '../types/http';

import scoreService from 'src/services/scoreService';

class ScoreController {
  create = async (req: createUserRequest, res: Response) => {
    const { score } = req?.body;
    const newScore = await scoreService.create(score);
    res.status(200).json(newScore);
  };

  getByUserId = async (req: getByUserIdRequest, res: Response) => {
    const { userId, distance, game } = req.params;
    const scores = await scoreService.getByUserId(
      userId,
      distance,
      game
    );
    res.status(200).json(scores);
  };
}

export default new ScoreController();
