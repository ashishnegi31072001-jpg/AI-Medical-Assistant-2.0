const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  askQuestion,
} = require("../controllers/ragController");

router.post(
  "/ask",
  protect,
  askQuestion
);

module.exports = router;