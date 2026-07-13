const express = require("express");

const router = express.Router();

// Controllers
const {
  chatWithAI,
  getChatHistory,
  clearChatHistory,
} = require("../controllers/chatController");

// Middleware
const protect = require("../middleware/authMiddleware");

// ======================
// Chat Routes
// ======================

// Send message to AI
router.post("/", protect, chatWithAI);

// Get chat history
router.get("/history", protect, getChatHistory);

// Clear chat history
router.delete("/clear", protect, clearChatHistory);

module.exports = router;