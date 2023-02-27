import { Router } from 'express';

import passport from '../libs/passport';

import authController from '../controllers/authController';
import checkAuth from '../middlewares/checkAuth';
import 'express-async-errors';

const router = Router();

router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile'] })
);
router.get(
  '/google/callback',
  passport.authenticate('google', {
    session: true,
  }),
  authController.googleCallback
);
router.post('/register', authController.localRegister);
router.post('/login', authController.localLogin);
router.get('/logout', authController.logout);
router.get('/me', checkAuth, authController.getMe);

export default router;
