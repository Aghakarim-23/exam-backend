import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import questionRoutes from "./routes/questionRoutes.js";

dotenv.config();

connectDB();

const app = express();
const PORT = process.env.PORT || 8001;
app.use(
  cors({
    origin: [
      "https://agas-exam-app.netlify.app",
    ],
  }),
);
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/questions", questionRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
