import { Request, Response } from 'express-serve-static-core';

import type { IUser } from '../types/User';

import userService from '../services/userService';

class UserController {
  getPlayedGames = (req: Request, res: Response) => {
    const { _id } = req.user as IUser;
    const games = userService.getPlayedGames(_id);
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
