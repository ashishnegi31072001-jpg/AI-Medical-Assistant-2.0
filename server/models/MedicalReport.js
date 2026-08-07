const mongoose = require("mongoose");

const medicalReportSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    filename: {
      type: String,
      required: true,
      trim: true,
    },

    extractedText: {
      type: String,
      required: true,
      trim: true,
    },

    aiAnalysis: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },

    // ===========================
    // AI Generated Plans
    // ===========================

    dietPlan: {
      type: mongoose.Schema.Types.Mixed,
      default: null,
    },

    workoutPlan: {
      type: mongoose.Schema.Types.Mixed,
      default: null,
    },

    healthRecommendation: {
      type: mongoose.Schema.Types.Mixed,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "MedicalReport",
  medicalReportSchema
);