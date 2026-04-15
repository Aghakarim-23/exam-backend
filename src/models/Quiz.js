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
    duration:  Number, // in minutes

    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

export const Quiz = mongoose.model("Quiz", QuizSchema);
