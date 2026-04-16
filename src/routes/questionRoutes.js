import { createQuestion, getQuestions, checkAnswer } from "../controllers/questionController.js";
import express from "express";
const router = express.Router();

router.post("/", createQuestion);

router.get("/", getQuestions);

router.post("/check", checkAnswer);

export default router;