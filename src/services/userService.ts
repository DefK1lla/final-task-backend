import type { IUser } from 'src/types/User';

import User from '../models/User';

class UserService {
  create = async (user: Omit<IUser, '_id'>): Promise<IUser> => {
    const newUser = new User(user);
    await newUser.save();
    return {
      username: newUser.username as string,
      _id: String(newUser._id),
    };
  };

  getOneById = async (id: string): Promise<IUser> => {
    const user = (await User.findById(id).lean()) as IUser;
    return user;
  };

  getOneByUsername = async (username: string): Promise<IUser> => {
    const user = (await User.findOne({ username }).lean()) as IUser;
    return user;
  };

  getOneByGoogleId = async (googleId: string): Promise<IUser> => {
    const user = (await User.findOne({
      googleId: googleId,
    }).lean()) as IUser;
    return user;
  };
}

export default new UserService();
