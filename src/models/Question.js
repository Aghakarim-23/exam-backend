import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema(
  {
    quiz: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quiz",
      required: true,
    },
    questionText: {
      type: String,
      required: true,
    },
    options: [
      {
        text: {
          type: String,
          required: true,
        },
      },
    ],
    correctAnswer: {
      type: Number,
      required: true,
    },
    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
    },
  },
  { timestamps: true },
);

export const Question = mongoose.model("Question", QuestionSchema);
