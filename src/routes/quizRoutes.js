import express from "express";
import {
  createQuiz,
  getQuizzes,
  getQuizById,
  updateQuiz,
  deleteQuiz,
  togglePublish,
  submitQuiz,
} from "../controllers/QuizController.js";
import { getQuestionsByQuizId } from "../controllers/questionController.js";
import { getResultsByQuiz } from "../controllers/resultController.js";
import { authMiddleware } from "../middlewares/authMiddleWare.js";

const router = express.Router();

router.post("/", createQuiz);
router.get("/", getQuizzes);
router.get("/:id", getQuizById);
router.put("/:id", updateQuiz);
router.delete("/:id", deleteQuiz);
router.patch("/:id/publish", togglePublish);
router.post("/:id/submit", authMiddleware, submitQuiz);
router.get("/:quizId/questions", getQuestionsByQuizId);
router.get("/:id/results", authMiddleware, getResultsByQuiz);

export default router;
