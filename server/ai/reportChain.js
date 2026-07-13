const { ChatOllama } = require("@langchain/ollama");

const model = new ChatOllama({
  baseUrl: "http://localhost:11434",
  model: "llama3.2",
  temperature: 0,
  format: "json",
});

async function analyzeReport(reportText) {

  const prompt = `
You are an expert medical AI.

Analyze the medical report carefully.

Return ONLY valid JSON.

Do NOT return markdown.
Do NOT return explanation.
Do NOT return any text before or after the JSON.

Calculate the healthScore based on the patient's report.

Rules:

- Start from 100.
- Subtract points for abnormal findings.
- Healthy report → 90–100
- Mild abnormalities → 75–89
- Moderate abnormalities → 60–74
- Serious abnormalities → below 60

Return ONLY JSON.
{
  "healthScore": 0,
  "riskLevel": "",
  "possibleDiseases": [],
  "summary": {
    "bloodSugar": {
      "value": "",
      "status": ""
    },
    "hba1c": {
      "value": "",
      "status": ""
    },
    "hemoglobin": {
      "value": "",
      "status": ""
    },
    "vitaminD": {
      "value": "",
      "status": ""
    },
    "cholesterol": {
      "value": "",
      "status": ""
    }
  },
  "importantFindings": [],
  "abnormalValues": [],
  "recommendations": [],
  "lifestyleAdvice": [],
  "warningSigns": [],
  "disclaimer": ""
}

Medical Report:

${reportText}
`;

  const response = await model.invoke(prompt);

  return response.content;
}

module.exports = analyzeReport;