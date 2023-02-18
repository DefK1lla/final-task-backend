import { Router } from "express";

import scoreController from "../controllers/scoreController";
import checkAuth from "../middlewares/checkAuth";

const router = Router();

router.get("/:game", checkAuth, scoreController.getByUserId);
router.post("/:game", checkAuth, scoreController.create);
router.get("/best/:game", checkAuth, scoreController.getUserBestScore);
router.get("/leaderboard/:game", scoreController.getLeaders);

export default router;
