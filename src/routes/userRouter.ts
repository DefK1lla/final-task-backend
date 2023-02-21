import { Router } from 'express';
import userController from '../controllers/userController';

import checkAuth from '../middlewares/checkAuth';

const router = Router();

router.get('/playedGames', checkAuth, userController.getPlayedGames);
router.patch(
  '/playedGames',
  checkAuth,
  userController.updatePlayedGames
);

export default router;
