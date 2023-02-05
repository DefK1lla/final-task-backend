import type { Error } from 'mongoose';

import passport from 'passport';
import passportLocal from 'passport-local';
import passportGoogle from 'passport-google-oauth20';
import bcrypt from 'bcryptjs';

import type { IDBUser } from 'src/types/User';

import {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
} from '../utils/config';

import User from '../models/User';

const LocalStrategy = passportLocal.Strategy;
const GoogleStrategy = passportGoogle.Strategy;

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

export default passport;