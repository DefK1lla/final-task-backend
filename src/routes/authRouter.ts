import { Router } from 'express';

import passport from '../libs/passport';

import authController from '../controllers/authController';

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
router.post(
  '/login',
  passport.authenticate('local'),
  authController.localLogin
);
router.get('/logout', authController.logout);
router.get('/me', authController.getMe);

export default router;
