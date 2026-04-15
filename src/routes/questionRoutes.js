import { createQuestion, getQuestions, getQuestionsByQuizId, checkAnswer } from "../controllers/questionController.js";
import express from "express";
const router = express.Router();

router.post("/", createQuestion);

router.get("/", getQuestions);

router.get("/quiz/:quizId", getQuestionsByQuizId);

router.post("/check", checkAnswer);

export default router;