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
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "MedicalReport",
  medicalReportSchema
);