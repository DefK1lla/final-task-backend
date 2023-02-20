import { Router } from 'express';

import authRouter from './authRouter';
import scoreRouter from './scoreRouter';

const router = Router();

router.use('/auth', authRouter);
router.use('/score', scoreRouter);

export default router;
