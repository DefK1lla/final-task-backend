import { Router } from 'express';

import authRouter from './authRouter';
import userRouter from './userRouter';
import scoreRouter from './scoreRouter';

const router = Router();

router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/score', scoreRouter);

export default router;
