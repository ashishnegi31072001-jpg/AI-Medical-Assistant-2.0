const MedicalReport = require("../models/MedicalReport");

const getReportContext = async (userId) => {
  const reports = await MedicalReport.find({ user: userId })
    .sort({ createdAt: -1 })
    .limit(3);

  if (!reports.length) {
    return "";
  }

  return reports
    .map(
      (report) => `
Report: ${report.filename}

${report.extractedText}
`
    )
    .join("\n\n");
};

module.exports = {
  getReportContext,
};