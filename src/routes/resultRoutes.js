import express from "express";
import { getMyResults, getLeaderboard } from "../controllers/resultController.js";
import { authMiddleware } from "../middlewares/authMiddleWare.js";

const router = express.Router();

router.get("/leaderboard", getLeaderboard);
router.get("/me", authMiddleware, getMyResults);

export default router;
