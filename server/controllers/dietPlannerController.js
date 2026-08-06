const MedicalReport = require("../models/MedicalReport");
const generateDietPlan = require("../ai/dietPlannerChain");

exports.generateDiet = async (req, res) => {
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

    const response = await generateDietPlan(
      report.extractedText,
      report.aiAnalysis
    );

    let dietPlan;

    try {
      dietPlan = JSON.parse(response);
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "AI returned invalid JSON.",
      });
    }

    return res.status(200).json({
      success: true,
      dietPlan,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};