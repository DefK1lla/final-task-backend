import { Request, Response, NextFunction } from 'express';

export default function checkAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.method === 'OPTIONS') {
    return next();
  }

  if (req.isAuthenticated()) {
    return next();
  } else {
    return res.status(401).json({ message: 'Unauthorized' });
  }
}
