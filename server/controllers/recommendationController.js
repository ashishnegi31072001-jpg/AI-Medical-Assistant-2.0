const MedicalReport = require("../models/MedicalReport");
const generateRecommendations = require("../ai/recommendationChain");

exports.getRecommendations = async (req, res) => {
  try {
    const { reportId } = req.body;

    if (!reportId) {
      return res.status(400).json({
        success: false,
        message: "Report ID is required.",
      });
    }

    const report = await MedicalReport.findOne({
      _id: reportId,
      user: req.user._id,
    });

    if (!report) {
      return res.status(404).json({
        success: false,
        message: "Report not found.",
      });
    }

    // =====================================
    // Return saved recommendation if available
    // =====================================
    if (report.healthRecommendation) {
      return res.status(200).json({
        success: true,
        recommendations: report.healthRecommendation,
        cached: true,
      });
    }

    // =====================================
    // Generate new recommendation
    // =====================================
    const response = await generateRecommendations(
      report.extractedText,
      report.aiAnalysis
    );

    let recommendations;

    try {
      recommendations = JSON.parse(response);
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Invalid AI response.",
      });
    }

    // =====================================
    // Save to MongoDB
    // =====================================
    report.healthRecommendation = recommendations;

    await report.save();

    return res.status(200).json({
      success: true,
      recommendations,
      cached: false,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};