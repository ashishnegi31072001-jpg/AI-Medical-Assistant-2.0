const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const path = require("path");

const authRoutes = require("./routes/authRoutes");
const chatRoutes = require("./routes/chatRoutes");
const symptomRoutes = require("./routes/symptomRoutes");
const reportRoutes = require("./routes/reportRoutes");
const ragRoutes = require("./routes/ragRoutes");
const reportChatRoutes = require("./routes/reportChatRoutes");
const recommendationRoutes = require("./routes/recommendationRoutes");
const dietPlannerRoutes = require("./routes/dietPlannerRoutes");
const workoutPlannerRoutes = require("./routes/workoutPlannerRoutes");

const app = express();

// =======================
// Middlewares
// =======================
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

// =======================
// Static Folder
// =======================
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// =======================
// API Routes
// =======================
app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/symptoms", symptomRoutes);
app.use("/api/report", reportRoutes);
app.use("/api/rag", ragRoutes);
app.use("/api/report-chat", reportChatRoutes);
app.use("/api/recommendation", recommendationRoutes);
app.use("/api/diet", dietPlannerRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/symptoms", symptomRoutes);
app.use("/api/report", reportRoutes);
app.use("/api/rag", ragRoutes);
app.use("/api/report-chat", reportChatRoutes);
app.use("/api/recommendation", recommendationRoutes);
app.use("/api/diet", dietPlannerRoutes);
app.use("/api/workout", workoutPlannerRoutes);
// =======================
// Home Route
// =======================
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Welcome to MedAssist AI API 🚀",
  });
});

// =======================
// 404 Route (KEEP LAST)
// =======================
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API Route Not Found",
  });
});

module.exports = app;