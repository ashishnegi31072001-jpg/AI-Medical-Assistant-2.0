const { ChatOllama } = require("@langchain/ollama");

const model = new ChatOllama({
  baseUrl: "http://localhost:11434",
  model: "llama3.2",
  temperature: 0.2,
});

async function askReport(reportText, question) {
  const prompt = `
You are an expert AI Medical Assistant.

You must answer ONLY using the medical report provided below.

If the answer is not present in the report,
say:
"I cannot determine that from this medical report."

Explain medical terms in simple language.

Medical Report:

${reportText}

---------------------------------------

Patient Question:

${question}

---------------------------------------

Give:
1. Direct Answer
2. Short Explanation
3. Helpful Advice (if appropriate)

Keep the answer under 250 words.
`;

  const response = await model.invoke(prompt);

  return response.content;
}

module.exports = askReport;