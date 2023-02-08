import type { Request, Response, NextFunction } from 'express';

export default (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error('Error:', err.stack);
  res.status(500);
  res.json({ message: 'Server Error' });
};
