import { Request, Response } from 'express-serve-static-core';

import type { IUser } from '../types/user';

import userService from '../services/userService';

class UserController {
  getPlayedGames = async (req: Request, res: Response) => {
    const { _id } = req.user as IUser;
    const games = await userService.getPlayedGames(_id);
    res.status(200).json(games);
  };

  updatePlayedGames = async (req: Request, res: Response) => {
    const { _id } = req.user as IUser;
    const updatedGames = await userService.updatePlayedGames(
      _id,
      req.body.game
    );
    res.status(200).json(updatedGames);
  };
}

export default new UserController();
