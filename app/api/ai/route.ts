// import { NextRequest, NextResponse } from 'next/server';
// import OpenAI from 'openai';

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// export async function POST(req: NextRequest) {
//   try {
//     const body = await req.json();
//     const prompt = body.prompt;

//     const response = await openai.chat.completions.create({
//       model: "gpt-4o-mini", 
//       messages: [
//         { role: "system", content: "You are a helpful assistant." },
//         { role: "user", content: prompt },
//       ],
//       temperature: 0.7,
//     });
   
//     return NextResponse.json({ result: response.choices[0].message.content });
//   } catch (err) {
//     console.error(err);
//     return NextResponse.json({ error: "Failed to generate response" }, { status: 500 });
//   }
// }
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

IMPORTANT RULES:
- Always return exactly 4 questions
- Each question must have exactly 4 options
- The correctAnswer can be either the exact text of the correct option OR the index (0-3)
- The title should be descriptive of the quiz topic
- Return ONLY the JSON, no additional text before or after
- Make sure the JSON is valid and properly formatted
`;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { prompt, messages = [] } = body;

    // Check if user is requesting a quiz
    const isQuizRequest = /quiz|questions|test|exam|assessment|create.*questions/i.test(prompt);
    
    // Use quiz system prompt if quiz is requested
    const activeSystemPrompt = isQuizRequest ? quizSystemPrompt : systemPrompt;
    
    // Enhance user prompt for quiz requests
    let enhancedPrompt = prompt;
    if (isQuizRequest) {
      enhancedPrompt = `${prompt}\n\nPlease respond with a JSON object containing exactly 4 questions, each with 4 options. Include a title for the quiz. Format: {"title": "...", "questions": [{"question": "...", "options": ["...", "...", "...", "..."], "correctAnswer": "..."}]}`;
    }

    // Build conversation history with system prompt
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
      // Return updated messages array so client can maintain history
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