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

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { prompt, messages = [] } = body;

    // Build conversation history with system prompt
    const conversationMessages = [
      { role: "system", content: systemPrompt },
      ...messages,
      { role: "user", content: prompt },
    ];

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini", 
      messages: conversationMessages,
      temperature: 0.7,
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