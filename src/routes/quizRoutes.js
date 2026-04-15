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

const router = express.Router();

router.post("/", createQuiz);
router.get("/", getQuizzes);
router.get("/:id", getQuizById);
router.put("/:id", updateQuiz);
router.delete("/:id", deleteQuiz);
router.patch("/:id/publish", togglePublish);
router.post("/:id/submit", submitQuiz);

export default router;
