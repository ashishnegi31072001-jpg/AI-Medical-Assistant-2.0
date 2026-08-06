const { ChatOllama } = require("@langchain/ollama");

const model = new ChatOllama({
  baseUrl: "http://localhost:11434",
  model: "llama3.2",
  temperature: 0.3,
  format: "json",
});

async function generateWorkoutPlan(reportText, analysis) {
  const prompt = `
You are an expert AI Fitness Coach, Physiotherapist, and Medical Trainer.

Based on the following medical report and AI analysis,
generate a safe and personalized weekly workout plan.

Return ONLY valid JSON.

Use exactly this structure:

{
  "fitnessGoal": "",
  "weeklyPlan": [
    {
      "day": "Monday",
      "workout": "",
      "duration": "",
      "intensity": ""
    },
    {
      "day": "Tuesday",
      "workout": "",
      "duration": "",
      "intensity": ""
    },
    {
      "day": "Wednesday",
      "workout": "",
      "duration": "",
      "intensity": ""
    },
    {
      "day": "Thursday",
      "workout": "",
      "duration": "",
      "intensity": ""
    },
    {
      "day": "Friday",
      "workout": "",
      "duration": "",
      "intensity": ""
    },
    {
      "day": "Saturday",
      "workout": "",
      "duration": "",
      "intensity": ""
    },
    {
      "day": "Sunday",
      "workout": "",
      "duration": "",
      "intensity": ""
    }
  ],
  "dailySteps": "",
  "cardioRecommendation": "",
  "strengthTraining": "",
  "stretching": "",
  "precautions": [],
  "motivation": ""
}

Medical Report:

${reportText}

-------------------------------------

AI Analysis:

${JSON.stringify(analysis, null, 2)}

-------------------------------------

Rules:

1. Recommend safe exercises based on the report.
2. If blood sugar is high, include walking and cardio.
3. If cholesterol is high, include aerobic exercise.
4. If Vitamin D is low, suggest outdoor walking and sunlight exposure.
5. If hemoglobin is low, avoid very intense workouts.
6. Keep the plan suitable for beginners unless the report suggests otherwise.
7. Return ONLY JSON.
`;

  const response = await model.invoke(prompt);

  return response.content;
}

module.exports = generateWorkoutPlan;