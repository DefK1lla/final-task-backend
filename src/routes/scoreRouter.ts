import { Router } from 'express';

import scoreController from '../controllers/scoreController';
import checkAuth from '../middlewares/checkAuth';
import 'express-async-errors';

const router = Router();

router.get('/:game', checkAuth, scoreController.getByUserId);
router.post('/:game', checkAuth, scoreController.create);
router.get(
  '/best/:game',
  checkAuth,
  scoreController.getUserBestResults
);
router.get(
  '/last/:game',
  checkAuth,
  scoreController.getUserLastResults
);
router.get('/leaderboard/:game', scoreController.getLeaders);

export default router;
