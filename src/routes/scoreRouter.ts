import { Router } from 'express';

import scoreController from '../controllers/scoreController';
import checkAuth from '../middlewares/checkAuth';

const router = Router();

router.get('/', checkAuth, scoreController.getByUserId);
router.post('/', checkAuth, scoreController.create);
