import { Question } from "../models/Question.js";
import { Quiz } from "../models/Quiz.js";
import { Result } from "../models/Result.js";

export const createQuestion = async (req, res) => {
  try {
    const { quizId, questionText, options, correctAnswer, category } = req.body;
    const newQuestion = new Question({
      quizId,
      questionText,
      options,
      correctAnswer,
      category,
    });

    await newQuestion.save();


    res.status(201).json(newQuestion);
  } catch (error) {
    res.status(500).json({ message: error.message })
    console.error("Error creating question:", error);
  }
};

export const getQuestions = async (req, res) => {
  try {
    const questions = await Question.find();
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getQuestionsByQuizId = async (req, res) => {
  try {
    const { quizId } = req.params;
    const questions = await Question.find({ quizId }).select("-correctAnswer");
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }
    if (!questions.length) {
      return res.status(404).json({ message: "No questions found for this quiz" });
    }
    res.status(200).json({ questions, total: questions.length , quizTitle: quiz.title });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.error("Error bas verdi", error);
  }
};

export const checkAnswer = async (req, res) => {
  try {
    const { questionId, selectedAnswer } = req.body;
    const question = await Question.findById(questionId);
    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }
    const isCorrect = question.correctAnswer == selectedAnswer;
    const correctAnswerIndex = Number(question.correctAnswer);
    res.status(200).json({ isCorrect, correctAnswerIndex });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST /api/questions/submit
// Body: { quizId, answers: [{ questionId, selectedAnswer }] }
// Requires auth middleware (req.user.id)
export const submitQuiz = async (req, res) => {
  try {
    const { quizId, answers } = req.body;
    const userId = req.user.id;

    if (!quizId || !Array.isArray(answers) || answers.length === 0) {
      return res.status(400).json({ message: "quizId and answers are required" });
    }

    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    // Fetch all questions for the quiz (with correctAnswer)
    const questions = await Question.find({ quizId });
    if (!questions.length) {
      return res.status(404).json({ message: "No questions found for this quiz" });
    }

    const questionMap = {};
    questions.forEach((q) => {
      questionMap[q._id.toString()] = q;
    });

    let correctCount = 0;
    const gradedAnswers = answers.map(({ questionId, selectedAnswer }) => {
      const question = questionMap[questionId];
      if (!question) return { questionId, selectedAnswer, isCorrect: false, correctAnswer: null };

      const isCorrect = Number(selectedAnswer) === Number(question.correctAnswer);
      if (isCorrect) correctCount++;

      return {
        question: question._id,
        selectedOption: Number(selectedAnswer),
        isCorrect,
        correctAnswer: Number(question.correctAnswer),
        questionText: question.questionText,
        options: question.options,
      };
    });

    const score = Math.round((correctCount / questions.length) * 100);

    const result = new Result({
      user: userId,
      quiz: quizId,
      score,
      answers: gradedAnswers.map(({ question, selectedOption, isCorrect }) => ({
        question,
        selectedOption,
        isCorrect,
      })),
    });
    await result.save();

    res.status(200).json({
      quizTitle: quiz.title,
      totalQuestions: questions.length,
      correctAnswers: correctCount,
      score,
      answers: gradedAnswers,
    });
  } catch (error) {
    console.error("Error submitting quiz:", error);
    res.status(500).json({ message: error.message });
  }
};
