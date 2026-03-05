import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema({
    questionText: { type: String, required: true },
    slug: { type: String, required: true},
    category: { type: String, required: true },
    options: { type: [String], required: true },
    correctAnswer: { type: Number, required: true },
}, { timestamps: true });

export const Question = mongoose.model("Question", QuestionSchema);