import { MONGODB_URI } from '../utils/config';

const winston = require('winston');
require('winston-mongodb');
import expressWinston from 'express-winston';

const requestLogger = expressWinston.logger({
  transports: [
    new winston.transports.MongoDB({
      db: MONGODB_URI,
      collection: 'info',
      options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        poolSize: 2,
      },
    }),
  ],
  meta: true,
  msg: 'Request: HTTP {{req.method}} {{req.url}}; Username: {{req.user?.username || "unauthorized"}}; ipAddress {{req.connection.remoteAddress}}',
  requestWhitelist: [
    'url',
    'method',
    'httpVersion',
    'originalUrl',
    'query',
    'body',
  ],
});

const errorLogger = (e: Error) => {
  expressWinston.logger({
    transports: [
      new winston.transports.MongoDB({
        db: MONGODB_URI,
        collection: 'errors',
        options: {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          poolSize: 2,
        },
      }),
    ],
    meta: true,
    msg: JSON.stringify(e),
    requestWhitelist: [
      'url',
      'method',
      'httpVersion',
      'originalUrl',
      'query',
      'body',
    ],
  });
};

export default {
  requestLogger,
  errorLogger,
};
