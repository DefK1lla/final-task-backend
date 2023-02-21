import { ObjectId } from 'mongoose';
import { Games } from 'src/types/games';
import type { IUser } from 'src/types/User';

import User from '../models/User';

class UserService {
  create = async (
    user: Omit<IUser, '_id' | 'playedGames'>
  ): Promise<IUser> => {
    const newUser = new User(user);
    await newUser.save();
    return {
      username: newUser.username as string,
      _id: newUser._id,
      playedGames: newUser.playedGames,
    };
  };

  getOneById = async (id: string): Promise<IUser | null> => {
    const user = await User.findById(id);
    return user;
  };

  getOneByUsername = async (
    username: string
  ): Promise<IUser | null> => {
    const user = await User.findOne({ username }).lean();
    return user;
  };

  getOneByGoogleId = async (
    googleId: string
  ): Promise<IUser | null> => {
    const user = await User.findOne({
      googleId: googleId,
    }).lean();
    return user;
  };

  getPlayedGames = async (id: ObjectId): Promise<Games[]> => {
    const user = await User.findById(id);
    return user?.playedGames || [];
  };

  updatePlayedGames = async (
    id: ObjectId,
    game: Games
  ): Promise<Games[]> => {
    const user = await User.findById(id);
    if (!user?.playedGames.includes(game)) {
      user?.playedGames.push(game);
      await user?.save();
    }
    return user?.playedGames || [];
  };
}

export default new UserService();
