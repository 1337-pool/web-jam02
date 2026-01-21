import { NextResponse } from "next/server";
import { aiModel } from "@/lib/gemeni";

export async function POST(req: Request) {
  try {
    const { message, codeContext } = await req.json();

    const chat = aiModel.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: `Here is the student's code context:\n${codeContext}` }],
        },
        {
            role: "model",
            parts: [{ text: "Understood. I am ready to grill the student."}]
        }
      ],
    });

    const result = await chat.sendMessage(message);
    const response = result.response.text();

    return NextResponse.json({ response });

  } catch (error) {
    console.error("AI Error:", error);
    return NextResponse.json({ error: "AI Service Failed" }, { status: 500 });
  }
}