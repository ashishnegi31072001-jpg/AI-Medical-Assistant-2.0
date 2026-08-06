const { ChatOllama } = require("@langchain/ollama");

const model = new ChatOllama({
  baseUrl: "http://localhost:11434",
  model: "llama3.2",
  temperature: 0.3,
  format: "json",
});

async function generateDietPlan(reportText, analysis) {
  const prompt = `
You are an expert AI Dietitian and Nutritionist.

Based on the following medical report and AI analysis,
create a personalized diet plan.

Return ONLY valid JSON.

{
  "breakfast": [],
  "midMorning": [],
  "lunch": [],
  "eveningSnack": [],
  "dinner": [],
  "waterIntake": "",
  "foodsToAvoid": [],
  "nutritionTips": []
}

Medical Report:

${reportText}

----------------------------------------

AI Analysis:

${JSON.stringify(analysis, null, 2)}

----------------------------------------

Rules:

1. Keep meals practical.
2. Suggest healthy Indian foods.
3. Consider blood sugar, cholesterol, HbA1c and Vitamin D.
4. Give realistic recommendations.
`;

  const response = await model.invoke(prompt);

  return response.content;
}

module.exports = generateDietPlan;