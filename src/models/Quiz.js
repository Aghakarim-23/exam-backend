import mongoose from "mongoose";

const QuizSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
    },
    questions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question",
      },
    ],
    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

export const Quiz = mongoose.model("Quiz", QuizSchema);
