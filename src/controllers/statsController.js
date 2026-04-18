import User from "../models/User.js";
import { Question } from "../models/Question.js";
import { Quiz } from "../models/Quiz.js";

// GET /api/stats
export const getStats = async (req, res) => {
  try {
    const [userCount, questionCount, quizCount] = await Promise.all([
      User.countDocuments(),
      Question.countDocuments(),
      Quiz.countDocuments(),
    ]);

    res.status(200).json({ userCount, questionCount, quizCount });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
