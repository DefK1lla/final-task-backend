import type { Request, Response, NextFunction } from 'express';

import logger from '../libs/winston';

export default (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error('Error:', err.stack);
  logger.errorLogger(err);
  res.status(500);
  res.json({ message: 'Server Error' });
};
