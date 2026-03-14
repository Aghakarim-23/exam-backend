import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import questionRoutes from "./routes/questionRoutes.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

connectDB();

const app = express();
const PORT = process.env.PORT || 8001;
app.use(
  cors({
    origin: [
      "https://agas-exam-app.netlify.app",
      "http://localhost:5173",
    ],
  }),
);
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.get("/api/keep-alive", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use("/api/questions", questionRoutes);
app.use("/api/auth", authRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
