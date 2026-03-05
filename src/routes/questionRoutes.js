import { createQuestion, getQuestions, getQuestionBySlug, checkAnswer} from "../controllers/questionController.js";
import express from "express";
const router = express.Router();

router.post("/", createQuestion);

router.get("/", getQuestions);

router.get("/:slug", getQuestionBySlug);

router.post("/check", checkAnswer);

export default router;