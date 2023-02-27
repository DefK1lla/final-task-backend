import type { Error } from 'mongoose';

import passport from 'passport';
import passportLocal from 'passport-local';
import passportGoogle from 'passport-google-oauth20';
import bcrypt from 'bcryptjs';

import type { IUser } from 'src/types/user';

import {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
} from '../utils/config';

import User from '../models/User';
import userService from '../services/userService';

const LocalStrategy = passportLocal.Strategy;
const GoogleStrategy = passportGoogle.Strategy;

passport.serializeUser((user, cb) => {
  const { _id } = user as IUser;
  cb(null, _id);
});

passport.deserializeUser(async (id: string, cb) => {
  try {
    const user = await userService.getOneById(id);
    cb(null, {
      username: user?.username,
      _id: user?._id,
      playedGames: user?.playedGames,
    });
  } catch (e) {
    console.error(e);
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
        const user = await userService.getOneByGoogleId(profile.id);

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
        console.error(e);
        cb(e as Error);
      }
    }
  )
);

passport.use(
  new LocalStrategy(
    async (username: string, password: string, done) => {
      try {
        const user = await userService.getOneByUsername(username);

        if (!user)
          return done(null, false, {
            message: 'Incorrect username or password',
          });

        const isValid = await bcrypt.compare(
          password,
          user.password as string
        );

        if (isValid) return done(null, user);
        return done(null, false, {
          message: 'Incorrect username or password',
        });
      } catch (e) {
        console.error(e);
        done(e);
      }
    }
  )
);

export default passport;
