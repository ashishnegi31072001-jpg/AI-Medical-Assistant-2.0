const path = require("path");
const readPDF = require("../ai/pdfReader");

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

    const pdfText = await readPDF(filePath);

    res.status(200).json({
      success: true,
      filename: req.file.filename,
      extractedText: pdfText.substring(0, 3000),
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};