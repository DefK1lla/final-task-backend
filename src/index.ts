import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import MongoStore from 'connect-mongo';

import {
  PORT,
  MONGODB_URI,
  CLIENT_URL,
  SECRET,
} from './utils/config';

import passport from './libs/passport';
import router from './routes/indext';

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

app.use(router);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}!`);
});
