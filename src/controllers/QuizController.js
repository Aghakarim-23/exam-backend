import { Quiz } from "../models/Quiz.js";
import { Question } from "../models/Question.js";
import { Result } from "../models/Result.js";

// POST /quizzes
export const createQuiz = async (req, res) => {
  try {
    const { title, description, category, duration, difficulty } = req.body;

    const quiz = new Quiz({ title, description, category, duration, difficulty });
    await quiz.save();

    res.status(201).json(quiz);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.error("Error creating quiz:", error);
  }
};

// GET /quizzes
export const getQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find().sort({ createdAt: -1 });;
    res.status(200).json({ quizzes });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.error("Error fetching quizzes:", error);
  }
};

// GET /quizzes/:id
export const getQuizById = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id).populate({
      path: "questions",
      select: "-correctAnswer",
    });

    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    res.status(200).json(quiz);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.error("Error fetching quiz:", error);
  }
};

// PUT /quizzes/:id
export const updateQuiz = async (req, res) => {
  try {
    const { title, description, category, difficulty } = req.body;

    const quiz = await Quiz.findByIdAndUpdate(
      req.params.id,
      { title, description, category, difficulty },
      { new: true, runValidators: true }
    );

    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    res.status(200).json(quiz);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE /quizzes/:id
export const deleteQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findByIdAndDelete(req.params.id);

    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    await Question.deleteMany({ quiz: req.params.id });

    res.status(200).json({ message: "Quiz deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// PATCH /quizzes/:id/publish
export const togglePublish = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);

    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    quiz.isPublished = !quiz.isPublished;
    await quiz.save();

    res.status(200).json({ isPublished: quiz.isPublished });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST /quizzes/:id/submit
export const submitQuiz = async (req, res) => {
  try {
    const { answers } = req.body;
    // answers: [{ questionId, selectedOption }]

    const quiz = await Quiz.findById(req.params.id);

    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    const questions = await Question.find({ quizId: req.params.id });

    const questionMap = new Map(
      questions.map((q) => [q._id.toString(), q])
    );

    let score = 0;
    const evaluatedAnswers = answers.map(({ questionId, selectedOption }) => {
      const question = questionMap.get(questionId);
      const isCorrect = question && question.correctAnswer === selectedOption;
      if (isCorrect) score++;
      return { question: questionId, selectedOption, isCorrect: !!isCorrect };
    });

    const result = new Result({
      user: req.user.id,
      quiz: req.params.id,
      score,
      answers: evaluatedAnswers,
    });

    await result.save();

    res.status(201).json({
      score,
      total: questions.length,
      answers: evaluatedAnswers,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
