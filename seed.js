// seedDirect.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import { Question } from "./src/models/Question.js";

dotenv.config();

const questions = [
  {
    questionText: "Which hook is used to manage state in React?",
    options: ["useEffect", "useState", "useRef", "useMemo"],
    correctAnswer: "1",
    slug: "react"
  },
  {
    questionText: "Which hook runs after component render?",
    options: ["useEffect", "useState", "useContext", "useReducer"],
    correctAnswer: "0",
    slug: "react"
  },
  {
    questionText: "What must React components return?",
    options: ["HTML", "CSS", "JSX", "JSON"],
    correctAnswer: "2",
    slug: "react"
  },
  {
    questionText: "Which hook stores mutable values without rerender?",
    options: ["useState", "useRef", "useMemo", "useEffect"],
    correctAnswer: "1",
    slug: "react"
  },
  {
    questionText: "React Router is used for:",
    options: ["State", "Styling", "Routing", "Testing"],
    correctAnswer: "2",
    slug: "react"
  },

  // ===== JavaScript sualları =====
  {
    questionText: "Which method converts JSON string to object?",
    options: ["JSON.parse", "JSON.stringify", "JSON.convert", "JSON.toObject"],
    correctAnswer: "0",
    slug: "javascript"
  },
  {
    questionText: "Which keyword declares a constant variable?",
    options: ["let", "var", "const", "static"],
    correctAnswer: "2",
    slug: "javascript"
  },
  {
    questionText: "Which operator checks value AND type?",
    options: ["==", "=", "===", "!="],
    correctAnswer: "2",
    slug: "javascript"
  },
  {
    questionText: "Which array method creates a new array?",
    options: ["forEach", "push", "map", "splice"],
    correctAnswer: "2",
    slug: "javascript"
  },
  {
    questionText: "What does NaN mean?",
    options: ["No assigned number", "Not a number", "Null and number", "New array number"],
    correctAnswer: "1",
    slug: "javascript"
  },

  // ===== Next.js sualları =====
  {
    questionText: "Next.js is built on top of which library?",
    options: ["Vue", "Angular", "React", "Svelte"],
    correctAnswer: "2",
    slug: "nextjs"
  },
  {
    questionText: "Which folder contains routes in Next.js App Router?",
    options: ["pages", "components", "app", "public"],
    correctAnswer: "2",
    slug: "nextjs"
  },
  {
    questionText: "Which method fetches data at build time?",
    options: ["getServerSideProps", "getStaticProps", "useEffect", "fetchData"],
    correctAnswer: "1",
    slug: "nextjs"
  },
  {
    questionText: "Which file is used for global layout in App Router?",
    options: ["layout.js", "index.js", "app.js", "main.js"],
    correctAnswer: "0",
    slug: "nextjs"
  },
  {
    questionText: "Next.js supports which type of rendering?",
    options: ["SSR only", "CSR only", "SSG only", "All of them"],
    correctAnswer: "3",
    slug: "nextjs"
  }
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");

    await Question.insertMany(questions);
    console.log("✅ Questions inserted successfully");

    mongoose.disconnect();
  } catch (err) {
    console.error("❌ Error inserting questions:", err);
  }
}

seed();