const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  askQuestion,
} = require("../controllers/reportChatController");

router.post(
  "/ask",
  authMiddleware,
  askQuestion
);

module.exports = router;