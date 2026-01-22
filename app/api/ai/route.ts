import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const systemPrompt = `
You are a technical evaluator checking basic understanding of Python code.
Your goal is to verify the student actually wrote and understands their own code, not just copied it.

NORMAL MODE:
- Ask straightforward questions about what the code does and why they made specific choices.
- Focus on basic logic, function purpose, and core concepts.
- Keep it direct but professional.

ANGRY MODE (triggered when student says "I don't know" or can't explain their own code):
- Get frustrated and direct. Call them out.
- "Why are you submitting code you don't understand?"
- "Did you write this or just copy it?"
- "You can't explain your own function? Seriously?"
- Make it clear this is unacceptable - they're wasting everyone's time.
- If they still can't explain after being called out, fail them immediately.

The standard is simple: if you wrote it, you should be able to explain what it does. No excuses.
`;

const quizSystemPrompt = `
You are an educational assistant that creates quizzes. When the user requests a quiz, you MUST respond with ONLY a valid JSON object in the following format:

{
  "title": "Quiz Title Here",
  "questions": [
    {
      "question": "Question text here?",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctAnswer": "Option A"
    }
  ]
}

IMPORTANT RULES FOR QUESTION COUNT:
- Simple code (1-10 lines, basic operations): 2-3 questions
- Moderate code (11-30 lines, functions, conditionals): 4-6 questions
- Complex code (31-60 lines, classes, multiple functions): 7-10 questions
- Adjust based on unique concepts present (loops, recursion, data structures, etc.)

OTHER RULES:
- Each question must have exactly 4 options
- The correctAnswer must be the exact text of the correct option
- The title should be descriptive of the quiz topic
- Return ONLY the JSON, no additional text before or after
- Make sure the JSON is valid and properly formatted
- Questions should cover different aspects: syntax, logic, output, purpose, edge cases
`;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { prompt, messages = [] } = body;
    const isQuizRequest = /quiz|questions|test|exam|assessment|create.*questions/i.test(prompt);
    const activeSystemPrompt = isQuizRequest ? quizSystemPrompt : systemPrompt;
    
    let enhancedPrompt = prompt;
    if (isQuizRequest) {
      enhancedPrompt = `${prompt}\n\nAnalyze the code complexity and respond with a JSON object containing an appropriate number of questions based on the following guidelines:

      QUESTION COUNT BY COMPLEXITY:
      - Simple code (1-10 lines, basic operations): 2-3 questions
      - Moderate code (11-30 lines, functions, conditionals): 4-6 questions
      - Complex code (31-60 lines, classes, multiple functions): 7-10 questions
      - Advanced code (60+ lines, complex logic, OOP, algorithms): 10-15 questions

      Each question must have exactly 4 options. Include a descriptive title for the quiz.

      Format: {"title": "...", "questions": [{"question": "...", "options": ["...", "...", "...", "..."], "correctAnswer": "..."}]}

      Ensure questions cover various aspects: syntax, logic, output prediction, purpose, and edge cases.`;
}

    const conversationMessages = [
      { role: "system", content: activeSystemPrompt },
      ...messages,
      { role: "user", content: enhancedPrompt },
    ];

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini", 
      messages: conversationMessages,
      temperature: 0.7,
      ...(isQuizRequest && { response_format: { type: "json_object" } }),
    });
    return NextResponse.json({ 
      result: response.choices[0].message.content,
      messages: [
        ...messages,
        { role: "user", content: prompt },
        { role: "assistant", content: response.choices[0].message.content },
      ]
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to generate response" }, { status: 500 });
  }
}