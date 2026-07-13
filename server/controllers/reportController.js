const path = require("path");
const fs = require("fs");

const readPDF = require("../ai/pdfReader");
const analyzeReport = require("../ai/reportChain");
const MedicalReport = require("../models/MedicalReport");

// ==========================================
// Upload Medical Report
// ==========================================
exports.uploadReport = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No PDF uploaded",
      });
    }

    const filePath = path.join(
      __dirname,
      "../uploads",
      req.file.filename
    );

    // Read PDF
    const pdfText = await readPDF(filePath);

    if (!pdfText || pdfText.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: "No readable text found in PDF.",
      });
    }

    // ===============================
    // AI Analysis
    // ===============================

    const analysisText = await analyzeReport(pdfText);

    console.log("\n========== AI OUTPUT ==========\n");
    console.log(analysisText);
    console.log("\n===============================\n");

    let analysis;

    try {
      analysis = JSON.parse(analysisText);
      console.log(
  JSON.stringify(analysis, null, 2)
);

      // ===============================
      // Calculate Health Score
      // ===============================

      let score = 100;

      const bloodSugar = parseFloat(
        analysis.summary?.bloodSugar?.value || 0
      );

      const hba1c = parseFloat(
        analysis.summary?.hba1c?.value || 0
      );

      const hemoglobin = parseFloat(
        analysis.summary?.hemoglobin?.value || 0
      );

      const vitaminD = parseFloat(
        analysis.summary?.vitaminD?.value || 0
      );

      const cholesterol = parseFloat(
        analysis.summary?.cholesterol?.value || 0
      );

      if (bloodSugar > 125) score -= 15;
      if (bloodSugar > 180) score -= 10;

      if (hba1c > 6.5) score -= 20;
      else if (hba1c > 5.7) score -= 10;

      if (hemoglobin < 13) score -= 10;

      if (vitaminD < 20) score -= 10;
      else if (vitaminD < 30) score -= 5;

      if (cholesterol > 240) score -= 15;
      else if (cholesterol > 200) score -= 10;

      score = Math.max(0, Math.min(score, 100));

      analysis.healthScore = score;

    } catch (err) {
      console.error("JSON Parse Error:");
      console.error(err);

      return res.status(500).json({
        success: false,
        message: "AI returned invalid JSON.",
      });
    }

    // ===============================
    // Save Report
    // ===============================

    const report = await MedicalReport.create({
      user: req.user._id,
      filename: req.file.filename,
      extractedText: pdfText,
      aiAnalysis: analysis,
    });

    return res.status(200).json({
      success: true,
      filename: report.filename,
      analysis,
    });

  } catch (error) {

    console.error("========== UPLOAD REPORT ERROR ==========");
    console.error(error);

    if (req.file) {
      const filePath = path.join(
        __dirname,
        "../uploads",
        req.file.filename
      );

      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    return res.status(500).json({
      success: false,
      message: error.message || "Server Error",
    });
  }
};

// ==========================================
// Get Report History
// ==========================================
exports.getReports = async (req, res) => {
  try {

    const reports = await MedicalReport.find({
      user: req.user._id,
    }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      reports,
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// ==========================================
// Delete Report
// ==========================================
exports.deleteReport = async (req, res) => {
  try {

    const report = await MedicalReport.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!report) {
      return res.status(404).json({
        success: false,
        message: "Report not found",
      });
    }

    const filePath = path.join(
      __dirname,
      "../uploads",
      report.filename
    );

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    await MedicalReport.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Report deleted successfully",
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// ==========================================
// Download Report
// ==========================================
exports.downloadReport = async (req, res) => {
  try {

    const report = await MedicalReport.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!report) {
      return res.status(404).json({
        success: false,
        message: "Report not found",
      });
    }

    const filePath = path.join(
      __dirname,
      "../uploads",
      report.filename
    );

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({
        success: false,
        message: "PDF file not found.",
      });
    }

    return res.download(filePath, report.filename);

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};