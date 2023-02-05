import mongoose, { Error } from 'mongoose';
import express from 'express';
import cors from 'cors';
import passport from 'passport';
import passportLocal from 'passport-local';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import bcrypt from 'bcryptjs';
import MongoStore from 'connect-mongo';
import passportGoogle from 'passport-google-oauth20';

import {
  PORT,
  MONGODB_URI,
  CLIENT_URL,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  SECRET,
} from './utils/config';

import { IDBUser } from './typings/User';
import User from './models/User';

const LocalStrategy = passportLocal.Strategy;
const GoogleStrategy = passportGoogle.Strategy;

mongoose.set('strictQuery', false);

mongoose.connect(`${MONGODB_URI}`, () =>
  console.log('connected to mongodb')
);

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

passport.use(
  new GoogleStrategy(
    {
      clientID: `${GOOGLE_CLIENT_ID}`,
      clientSecret: `${GOOGLE_CLIENT_SECRET}`,
      callbackURL: '/auth/google/callback',
    },
    async (_, __, profile, cb) => {
      try {
        const user = (await User.findOne({
          googleId: profile.id,
        }).lean()) as IDBUser;

        if (!user) {
          const newUser = new User({
            googleId: profile.id,
            username: profile.displayName,
          });
          await newUser.save();
          cb(null, newUser);
        } else {
          cb(null, user);
        }
      } catch (e) {
        console.log(e);
        cb(e as Error);
      }
    }
  )
);

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

passport.use(
  new LocalStrategy(
    async (username: string, password: string, done) => {
      try {
        const user = (await User.findOne({
          username: username,
        }).lean()) as IDBUser;

        if (!user) return done(null, false);

        const isValid = await bcrypt.compare(
          password,
          user.password as string
        );

        if (isValid) return done(null, user);
        return done(null, false);
      } catch (e) {
        console.log(e);
      }
    }
  )
);

passport.serializeUser((user, cb) => {
  const { _id } = user as IDBUser;
  cb(null, _id);
});

passport.deserializeUser(async (id: string, cb) => {
  try {
    const user = (await User.findOne({ _id: id }).lean()) as IDBUser;
    cb(null, user);
  } catch (e) {
    console.log(e);
    cb(e as Error, null);
  }
});

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
      const hashedPassword = await bcrypt.hash(password, 10);
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
