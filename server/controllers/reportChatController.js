const MedicalReport = require("../models/MedicalReport");
const askReport = require("../ai/reportChatChain");

exports.askQuestion = async (req, res) => {
  try {
    const { reportId, question } = req.body;

    if (!reportId || !question) {
      return res.status(400).json({
        success: false,
        message: "Report ID and question are required.",
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

    const answer = await askReport(
      report.extractedText,
      question
    );

    return res.status(200).json({
      success: true,
      answer,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};