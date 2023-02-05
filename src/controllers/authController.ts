import type { Request, Response } from 'express';

import bcrypt from 'bcryptjs';

import type { IUser } from '../types/User';

import { CLIENT_URL, PASSWORD_SALT } from '../utils/config';

import User from '../models/User';

class AuthController {
  googleCallback = (req: Request, res: Response) => {
    res.redirect(CLIENT_URL as string);
  };

  localRegister = async (req: Request, res: Response) => {
    try {
      const { username, password } = req?.body;

      if (
        !username ||
        !password ||
        typeof username !== 'string' ||
        typeof password !== 'string'
      ) {
        res.status(400).json({ error: 'Improper Values' });
        return;
      }

      const user = (await User.findOne({
        username,
      }).lean()) as IUser;

      if (user)
        res.status(400).json({ error: 'User Already Exists' });

      if (!user) {
        const hashedPassword = await bcrypt.hash(
          password,
          PASSWORD_SALT
        );
        const newUser = new User({
          username,
          password: hashedPassword,
        });
        await newUser.save();
        res
          .status(200)
          .json({ id: newUser._id, username: newUser.username });
      }
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: 'Server Error' });
    }
  };

  localLogin = (req: Request, res: Response) => {
    const user = req.user as IUser;
    res.status(200).json({ id: user._id, username: user.username });
  };

  logout = (req: Request, res: Response) => {
    req.logOut(() => {
      res.clearCookie('connect.sid');
      res.status(200).json({ message: 'Logout' });
    });
  };
}

export default new AuthController();
