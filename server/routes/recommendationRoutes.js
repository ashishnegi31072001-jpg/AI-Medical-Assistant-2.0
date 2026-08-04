const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  getRecommendations,
} = require("../controllers/recommendationController");

router.post(
  "/generate",
  authMiddleware,
  getRecommendations
);

module.exports = router;