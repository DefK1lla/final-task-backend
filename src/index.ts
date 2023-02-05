import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import bcrypt from 'bcryptjs';
import MongoStore from 'connect-mongo';

import {
  PORT,
  MONGODB_URI,
  CLIENT_URL,
  SECRET,
  PASSWORD_SALT,
} from './utils/config';

import { IDBUser } from './types/User';
import User from './models/User';

import passport from './libs/passport';

const app = express();

app.use(cors({ origin: CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(
  session({
    secret: `${SECRET}`,
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: MONGODB_URI }),
  })
);
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

app.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile'] })
);

app.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    session: true,
  }),
  (req, res) => {
    res.redirect(CLIENT_URL as string);
  }
);

app.post('/register', async (req, res) => {
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

app.post('/login', passport.authenticate('local'), (req, res) => {
  const user = req.user as IDBUser;
  res.status(200).json({ id: user._id, username: user.username });
});

app.get('/logout', (req, res) => {
  req.logOut(() => {
    res.clearCookie('connect.sid');
    res.status(200).json({ message: 'logut' });
  });
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}!`);
});
