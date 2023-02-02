import mongoose, { Error } from 'mongoose';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import passport from 'passport';
import passportLocal from 'passport-local';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import MongoStore from 'connect-mongo';
import { IDBUser, IUser } from './typings/User';
import User from './models/User';

const LocalStrategy = passportLocal.Strategy;

dotenv.config();

mongoose.set('strictQuery', false);

mongoose.connect(`${process.env.MONGODB_URI}`, () =>
  console.log('connected to mongodb')
);

const app = express();
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());
app.use(
  session({
    secret: 'secretcode',
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }),
  })
);
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new LocalStrategy((username: string, password: string, done) => {
    User.findOne(
      { username: username },
      (err: Error, user: IDBUser) => {
        if (err) throw err;
        if (!user) return done(null, false);
        bcrypt.compare(
          password,
          user.password as string,
          (err, result: boolean) => {
            if (err) throw err;
            if (result === true) {
              return done(null, user);
            } else {
              return done(null, false);
            }
          }
        );
      }
    );
  })
);

passport.serializeUser((user: any, cb) => {
  cb(null, user._id);
});

passport.deserializeUser((id: string, cb) => {
  User.findOne({ _id: id }, (err: Error, user: IDBUser) => {
    const userInformation: IUser = {
      username: user.username,
      id: user._id,
    };
    cb(err, userInformation);
  });
});

app.post('/register', async (req, res) => {
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
  User.findOne({ username }, async (err: Error, doc: IDBUser) => {
    if (err) throw err;
    if (doc) res.status(400).json({ error: 'User Already Exists' });
    if (!doc) {
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
  });
});

app.post('/login', passport.authenticate('local'), (req, res) => {
  const user = req.user as IDBUser;
  res.status(200).json({ id: user._id, username: user.username });
});

app.get('/logout', (req, res) => {
  req.logOut(() => {
    res.clearCookie('connect.sid');
    res.status(200).json({ message: 'success' });
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}!`);
});
