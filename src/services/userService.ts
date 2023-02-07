import type { IUser } from 'src/types/User';

import User from '../models/User';

class UserService {
  create = async (user: Omit<IUser, '_id'>): Promise<IUser> => {
    const newUser = new User(user);
    await newUser.save();
    return {
      username: newUser.username as string,
      _id: newUser._id,
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
}

export default new UserService();