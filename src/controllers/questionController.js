import { Question } from "../models/Question.js";
import { Quiz } from "../models/Quiz.js";

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
    if (!questions.length) {
      return res.status(404).json({ message: "No questions found for this quiz" });
    }
    res.status(200).json({ questions, total: questions.length });
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
