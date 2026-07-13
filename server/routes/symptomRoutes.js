const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  analyzeSymptoms,
  getSymptomHistory,
  deleteSymptom,
} = require("../controllers/symptomController");

// Analyze symptoms
router.post("/analyze", protect, analyzeSymptoms);

// Get symptom history
router.get("/history", protect, getSymptomHistory);

// Delete one report
router.delete("/:id", protect, deleteSymptom);

module.exports = router;