const Symptom = require("../models/Symptom");
const { askAI } = require("../services/aiService");

// POST /api/symptoms/analyze
const analyzeSymptoms = async (req, res) => {
  try {
    const { symptoms, severity, duration, notes } = req.body;

    if (!symptoms || !severity || !duration) {
      return res.status(400).json({
        success: false,
        message: "Symptoms, severity and duration are required.",
      });
    }

    const prompt = `
You are MedAssist AI.

Analyze the following symptoms.

Symptoms:
${symptoms}

Severity:
${severity}

Duration:
${duration}

Additional Notes:
${notes || "None"}

Give your response in this format:

## Possible Causes

## Home Care Tips

## Warning Signs

## When to Visit a Doctor

Never diagnose diseases.

Always mention that the user should consult a qualified healthcare professional.
`;

    const aiResponse = await askAI(prompt);

    const report = await Symptom.create({
      user: req.user.id,
      symptoms,
      severity,
      duration,
      notes,
      aiResponse,
    });

    res.status(200).json({
      success: true,
      report,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// GET /api/symptoms/history
const getSymptomHistory = async (req, res) => {
  try {
    const reports = await Symptom.find({
      user: req.user.id,
    }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      reports,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// DELETE /api/symptoms/:id
const deleteSymptom = async (req, res) => {
  try {
    await Symptom.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    res.status(200).json({
      success: true,
      message: "Report deleted successfully.",
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = {
  analyzeSymptoms,
  getSymptomHistory,
  deleteSymptom,
};