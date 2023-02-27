import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import morgan from 'morgan';
import {
  PORT,
  MONGODB_URI,
  CLIENT_URL,
  SECRET,
} from './utils/config';

import passport from './libs/passport';
import router from './routes';
import errorHandler from './utils/errorHandler';
import logger from './libs/winston';

const app = express();

app.use(logger.requestLogger);

app.use(
  cors({
    origin: [`${CLIENT_URL}`, 'http://localhost:3000'],
    credentials: true,
  })
);
app.use(express.json());

app.set('trust proxy', 1);
app.use(
  session({
    secret: `${SECRET}`,
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: MONGODB_URI }),
    cookie: {
      sameSite: 'none',
      secure: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
  })
);
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

app.use(router);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}!`);
});
