import { createQuestion, getQuestions } from "../controllers/questionController.js";
import express from "express";
const router = express.Router();

router.post("/", createQuestion);

router.get("/", getQuestions);

export default router;