import type { Request, Response } from 'express';

import type {
  getByUserIdParams,
  createUserBody,
} from '../types/http';
import type { IUser } from '../types/User';

import scoreService from '../services/scoreService';

class ScoreController {
  create = async (req: Request, res: Response) => {
    const user = req.user as IUser;
    const game = req.params.game;
    const body: createUserBody = req?.body;
    const newScore = await scoreService.create({
      ...body.score,
      user: user._id,
      game,
    });
    res.status(200).json(newScore);
  };

  getUserLastResults = async (req: Request, res: Response) => {
    const { _id } = req.user as IUser;
    const game = req.params.game;
    const score = await scoreService.getUserLastResults(_id, game);
    res.status(200).json({ game, results: score });
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
    res.status(200).json({ game, results: scores });
  };

  getUserBestResults = async (req: Request, res: Response) => {
    const user = req.user as IUser;
    const userId = user._id;
    const game = req.params.game;
    const score = await scoreService.getUserBestResults(userId, game);
    res.status(200).json({ game, results: score });
  };

  getLeaders = async (req: Request, res: Response) => {
    const game = req.params.game;
    const leaders = await scoreService.getLeaders(game);
    res.status(200).json({ game, leaders });
  };
}

export default new ScoreController();
