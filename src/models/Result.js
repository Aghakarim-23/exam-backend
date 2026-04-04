import mongoose from "mongoose";

const ResultSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    quiz: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quiz",
      required: true,
    },
    score: {
      type: Number,
      required: true,
    },
    answers: [
      {
        question: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Question",
        },
        isCorrect: { type: Boolean },
        selectedOption: { type: Number },
      },
    ],
  },
  { timestamps: true },
);

export const Result = mongoose.model("Result", ResultSchema);
