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

    // =====================================
    // Return saved diet plan if available
    // =====================================
    if (report.dietPlan) {
      return res.status(200).json({
        success: true,
        dietPlan: report.dietPlan,
        cached: true,
      });
    }

    // =====================================
    // Generate new diet plan
    // =====================================
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

    // =====================================
    // Save to MongoDB
    // =====================================
    report.dietPlan = dietPlan;

    await report.save();

    return res.status(200).json({
      success: true,
      dietPlan,
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