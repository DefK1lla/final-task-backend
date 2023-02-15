import type { NextFunction, Request, Response } from 'express';

import bcrypt from 'bcryptjs';

import type { IUser } from '../types/User';

import { CLIENT_URL, PASSWORD_SALT } from '../utils/config';

import userService from '../services/userService';
import { validateRegister } from '../utils/helpers/validations';
import passport from '../libs/passport';

class AuthController {
  googleCallback = (req: Request, res: Response) => {
    // TODO: REDIRECT TO CLIENT
    res.redirect('http://localhost:3000');
  };

  localRegister = async (req: Request, res: Response) => {
    const { username, password } = req?.body;

    const isValid = validateRegister(username, password);

    if (!isValid) {
      res.status(400).json({
        message: 'Improper Values.',
        username: 'Min length 3',
        password: 'Min length 5',
      });
      return;
    }

    const user = await userService.getOneByUsername(username);

    if (user) {
      res.status(400).json({ message: 'User Already Exists' });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, PASSWORD_SALT);
    const newUser = await userService.create({
      username,
      password: hashedPassword,
    });
    res
      .status(200)
      .json({ _id: newUser._id, username: newUser.username });
  };

  localLogin = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    passport.authenticate('local', (err, user: IUser) => {
      if (err) return next(err);
      if (!user) {
        return res
          .status(400)
          .json({ message: 'Incorrect username or password' });
      }
      req.logIn(user, err => {
        return res
          .status(200)
          .json({ _id: user._id, username: user.username });
      });
    })(req, res, next);
  };

  logout = (req: Request, res: Response) => {
    req.logOut(() => {
      res.clearCookie('connect.sid');
      res.status(200).json({ message: 'Logout' });
    });
  };

  getMe = async (req: Request, res: Response) => {
    res.json(req.user);
  };
}

export default new AuthController();
