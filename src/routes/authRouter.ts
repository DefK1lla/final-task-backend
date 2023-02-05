import { Router } from 'express';
import bcrypt from 'bcryptjs';

import type { IDBUser } from '../types/User';

import { CLIENT_URL, PASSWORD_SALT } from '../utils/config';

import passport from '../libs/passport';

import User from '../models/User';

const router = Router();

router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile'] })
);

router.get(
  '/google/callback',
  passport.authenticate('google', {
    session: true,
  }),
  (req, res) => {
    res.redirect(CLIENT_URL as string);
  }
);

router.post('/register', async (req, res) => {
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

    const user = (await User.findOne({ username }).lean()) as IDBUser;

    if (user) res.status(400).json({ error: 'User Already Exists' });

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
    res.status(500).json({ message: 'server error' });
  }
});

router.post('/login', passport.authenticate('local'), (req, res) => {
  const user = req.user as IDBUser;
  res.status(200).json({ id: user._id, username: user.username });
});

router.get('/logout', (req, res) => {
  req.logOut(() => {
    res.clearCookie('connect.sid');
    res.status(200).json({ message: 'logut' });
  });
});

export default router;
