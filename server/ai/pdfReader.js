const fs = require("fs");
const { getDocument } = require("pdfjs-dist/legacy/build/pdf.mjs");

const readPDF = async (filePath) => {
  try {
    const data = new Uint8Array(fs.readFileSync(filePath));

    const pdf = await getDocument({
      data,
      useSystemFonts: true,
    }).promise;

    let text = "";

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);

      const content = await page.getTextContent();

      text += content.items.map((item) => item.str).join(" ");

      text += "\n\n";
    }

    return text;
  } catch (err) {
    console.error("========== PDF READ ERROR ==========");
    console.error(err);

    throw new Error("Failed to extract text from PDF.");
  }
};

module.exports = readPDF;