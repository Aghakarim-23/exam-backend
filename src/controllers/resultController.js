import { Result } from "../models/Result.js";
import User from "../models/User.js";

// GET /results/me
export const getMyResults = async (req, res) => {
  try {
    const results = await Result.find({ user: req.user.id })
      .populate("quiz", "title category difficulty")
      .populate("answers.question", "text")
      .sort({ createdAt: -1 });

    res.status(200).json({ results });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /results/leaderboard — top 10 users by total score
export const getLeaderboard = async (req, res) => {
  try {
    const leaderboard = await Result.aggregate([
      { $group: { _id: "$user", totalScore: { $sum: "$score" } } },
      { $sort: { totalScore: -1 } },
      { $limit: 10 },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: "$user" },
      {
        $project: {
          _id: 0,
          id: "$_id",
          name: { $concat: ["$user.name", " ", "$user.surname"] },
          username: "$user.username",
          avatar: "$user.avatar",
          totalScore: 1,
        },
      },
    ]);

    res.status(200).json({ leaderboard });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /quizzes/:id/results  (admin — all users' results for a quiz)
export const getResultsByQuiz = async (req, res) => {
  try {
    const results = await Result.find({ quiz: req.params.id })
      .populate("user", "name surname username")
      .populate("answers.question", "text")
      .sort({ score: -1 });

    res.status(200).json({ results });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
