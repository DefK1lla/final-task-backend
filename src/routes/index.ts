import { Router } from 'express';

import authRouter from './authRouter';

const router = Router();

router.use('/auth', authRouter);
router.get('/check', (req, res) => {
  res.status(200).send('working');
});

export default router;
