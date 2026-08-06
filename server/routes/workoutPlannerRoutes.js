const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  generateWorkout,
} = require("../controllers/workoutPlannerController");

router.post(
  "/generate",
  authMiddleware,
  generateWorkout
);

module.exports = router;