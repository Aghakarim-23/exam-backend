import { Question } from "../models/Question.js";

export const createQuestion = async (req, res) => {
    try {
        const { questionText, options, correctAnswer } = req.body;
        const newQuestion = new Question({ questionText, options, correctAnswer });
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
