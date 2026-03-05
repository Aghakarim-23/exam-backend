import { Question } from "../models/Question.js";

export const createQuestion = async (req, res) => {
    try {
        const { questionText, options, correctAnswer, category, slug } = req.body;
        const newQuestion = new Question({ questionText, options, correctAnswer, category, slug });
        await newQuestion.save();
        res.status(201).json(newQuestion);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getQuestions = async (req, res) => {
    try {
        const questions = await Question.find();
        res.status(200).json(questions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getQuestionBySlug = async (req, res) => {
    try {
        const { slug } = req.params;
        const question = await Question.find({ slug }).select("-correctAnswer");
        const totalQuestions = await Question.countDocuments({ slug });
        if (!question) {
            return res.status(404).json({ message: "Question not found" });
        }
        res.status(200).json(question, totalQuestions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

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
}