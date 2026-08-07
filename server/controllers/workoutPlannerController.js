const MedicalReport = require("../models/MedicalReport");
const generateWorkoutPlan = require("../ai/workoutPlannerChain");

exports.generateWorkout = async (req, res) => {
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
    // Return saved workout plan if available
    // =====================================
    if (report.workoutPlan) {
      return res.status(200).json({
        success: true,
        workoutPlan: report.workoutPlan,
        cached: true,
      });
    }

    // =====================================
    // Generate new workout plan
    // =====================================
    const response = await generateWorkoutPlan(
      report.extractedText,
      report.aiAnalysis
    );

    let workoutPlan;

    try {
      workoutPlan = JSON.parse(response);
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "AI returned invalid JSON.",
      });
    }

    // =====================================
    // Save workout plan to MongoDB
    // =====================================
    report.workoutPlan = workoutPlan;

    await report.save();

    return res.status(200).json({
      success: true,
      workoutPlan,
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