import { createQuestion, getQuestions, checkAnswer, submitQuiz } from "../controllers/questionController.js";
import express from "express";
import { authMiddleware } from "../middlewares/authMiddleWare.js";
const router = express.Router();

router.post("/", createQuestion);

router.get("/", getQuestions);

router.post("/check", checkAnswer);

router.post("/submit", authMiddleware, submitQuiz);

export default router;