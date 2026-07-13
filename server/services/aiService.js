const { ChatOllama } = require("@langchain/ollama");
const {
  HumanMessage,
  SystemMessage,
} = require("@langchain/core/messages");

const llm = new ChatOllama({
  model: "llama3.2",
  temperature: 0,
  baseUrl: "http://localhost:11434",
});

const askAI = async (question, context) => {

  const systemPrompt = `
You are MedAssist AI.

You MUST answer ONLY using the medical report below.

Never use your own medical knowledge.

Never say:
"I don't have access to your medical records."

Because the medical records are already provided below.

If the answer exists in the report,
return the exact value.

If it does not exist,
reply exactly:

I could not find this information in your uploaded medical reports.

Medical Report:

${context}
`;

  const response = await llm.invoke([
    new SystemMessage(systemPrompt),
    new HumanMessage(question),
  ]);

  return response.content;
};

module.exports = {
  askAI,
};