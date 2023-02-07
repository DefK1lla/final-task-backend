import type { Request, Response } from 'express';

import bcrypt from 'bcryptjs';

import type { IUser } from '../types/User';

import { CLIENT_URL, PASSWORD_SALT } from '../utils/config';

import userService from '../services/userService';
import { validateRegister } from '../utils/helpers/validations';

class AuthController {
  googleCallback = (req: Request, res: Response) => {
    res.redirect(CLIENT_URL as string);
  };

  localRegister = async (req: Request, res: Response) => {
    try {
      const { username, password } = req?.body;

      const isValid = validateRegister(username, password);

      if (!isValid) {
        res
          .status(400)
          .json({
            error: 'Improper Values.',
            username: 'Min length 3',
            password: 'Min length 5',
          });
        return;
      }

      const user = await userService.getOneByUsername(username);

      if (user) {
        res.status(400).json({ error: 'User Already Exists' });
        return;
      }

      const hashedPassword = await bcrypt.hash(
        password,
        PASSWORD_SALT
      );
      const newUser = await userService.create({
        username,
        password: hashedPassword,
      });
      res
        .status(200)
        .json({ id: newUser._id, username: newUser.username });
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

  getMe = async (req: Request, res: Response) => {
    try {
      res.send(req.user);
    } catch (e) {
      console.log(e);
      res.status(500).send('Server Error');
    }
  };
}

export default new AuthController();
