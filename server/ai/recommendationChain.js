const { ChatOllama } = require("@langchain/ollama");

const model = new ChatOllama({
  baseUrl: "http://localhost:11434",
  model: "llama3.2",
  temperature: 0.3,
  format: "json",
});

async function generateRecommendations(reportText, analysis) {
  const prompt = `
You are an expert AI Doctor and Nutritionist.

Based on the following medical report and AI analysis,
generate a personalized health plan.

Return ONLY valid JSON.

{
  "overallGoal": "",
  "dietPlan": [],
  "exercisePlan": [],
  "sleepAdvice": [],
  "followUpTests": [],
  "dailyHabits": []
}

Medical Report:

${reportText}

---------------------------------

AI Analysis:

${JSON.stringify(analysis, null, 2)}
`;

  const response = await model.invoke(prompt);

  return response.content;
}

module.exports = generateRecommendations;