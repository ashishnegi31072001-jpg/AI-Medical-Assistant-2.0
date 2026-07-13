const mongoose = require("mongoose");

const symptomSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    symptoms: {
      type: String,
      required: true,
    },

    severity: {
      type: String,
      enum: ["Mild", "Moderate", "Severe"],
      required: true,
    },

    duration: {
      type: String,
      required: true,
    },

    notes: {
      type: String,
      default: "",
    },

    aiResponse: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Symptom", symptomSchema);