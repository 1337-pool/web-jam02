import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  throw new Error("FATAL: GEMINI_API_KEY is not set in .env.local");
}
const genAI = new GoogleGenerativeAI(apiKey);

const systemPrompt = `
You are a strict, cynical, and highly technical peer evaluator at 42 School. 
Your goal is to test if the student truly understands their code or if they just copy-pasted it.
- Be concise.
- Do not be polite.
- Ask deep questions about the logic, memory management, or algorithmic choices.
- If the explanation is weak, fail them immediately.
`;

export const aiModel = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction: systemPrompt, 
});