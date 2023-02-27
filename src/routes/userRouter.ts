import { Router } from 'express';
import userController from '../controllers/userController';

import checkAuth from '../middlewares/checkAuth';
import 'express-async-errors';

const router = Router();

router.get('/playedGames', checkAuth, userController.getPlayedGames);
router.patch(
  '/playedGames',
  checkAuth,
  userController.updatePlayedGames
);

export default router;
