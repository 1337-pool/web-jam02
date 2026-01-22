"use client";

import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import CodeEditor from "@/components/elements/editor";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Send, Play, Loader2, CheckCircle2 } from "lucide-react";
import MessageComponent from "@/components/ui/chat/components/Message.jsx";
import Quiz, { QuizData } from "@/components/ui/chat/components/Quiz";

interface MessageType {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt: Date | string;
}

interface ApiMessage {
  role: "user" | "assistant";
  content: string;
}

export default function CorrectionPage() {
  const { data: session } = useSession();
  const [code, setCode] = useState(`def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

print(fibonacci(10))`);
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [conversationHistory, setConversationHistory] = useState<ApiMessage[]>([]);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isStarting, setIsStarting] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  const [isFinishing, setIsFinishing] = useState(false);
  const [quizData, setQuizData] = useState<QuizData | null>(null);
  const [isFinished, setIsFinished] = useState(false);
  const [userQuizAnswers, setUserQuizAnswers] = useState<Record<number, number>>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const startCorrection = async () => {
    if (!code.trim()) {
      alert("Please provide some Python code to correct");
      return;
    }

    setIsStarting(true);
    try {
      // Generate quiz based on the code
      const quizPrompt = `Based on this Python code, create a quiz with 4 questions to test understanding. The quiz should cover key concepts, logic, and functionality of the code. Return ONLY a JSON object with this format:
{
  "title": "Quiz Title",
  "questions": [
    {
      "question": "Question text?",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctAnswer": "Option A"
    }
  ]
}

Code:
${code}`;

      const response = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          prompt: quizPrompt,
          messages: []
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to start correction");
      }

      const data = await response.json();
      
      // Try to parse quiz JSON from response
      try {
        const jsonMatch = data.result.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const parsed = JSON.parse(jsonMatch[0]);
          // Validate quiz structure
          if (parsed.title && Array.isArray(parsed.questions) && parsed.questions.length > 0) {
            const isValid = parsed.questions.every((q: any) => 
              q.question && 
              Array.isArray(q.options) && 
              q.options.length === 4 && 
              (q.correctAnswer !== undefined)
            );
            if (isValid) {
              setQuizData(parsed as QuizData);
              setSessionId(Date.now().toString());
              setUserQuizAnswers({});
              setIsFinished(false);
            } else {
              throw new Error("Invalid quiz format");
            }
          } else {
            throw new Error("Invalid quiz structure");
          }
        } else {
          throw new Error("No JSON found in response");
        }
      } catch (parseError) {
        console.error("Error parsing quiz:", parseError);
        alert("Failed to parse quiz. The AI response may not be in the correct format.");
      }
    } catch (error) {
      console.error("Error starting correction:", error);
      alert("Failed to start correction. Please try again.");
    } finally {
      setIsStarting(false);
    }
  };

  const sendMessage = async () => {
    if (!inputMessage.trim() || !sessionId || isLoading) return;

    const userMessage: MessageType = {
      id: Date.now().toString(),
      role: "user",
      content: inputMessage,
      createdAt: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: inputMessage,
          messages: conversationHistory,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      const data = await response.json();
      
      const assistantMessage: MessageType = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.result,
        createdAt: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setConversationHistory(data.messages || []);
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Failed to send message. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const finishCorrection = () => {
    if (!sessionId || !quizData) return;
    
    // Check if all questions are answered
    const allAnswered = Object.keys(userQuizAnswers).length === quizData.questions.length;
    if (!allAnswered) {
      alert("Please answer all questions before finishing the correction.");
      return;
    }
    
    setIsFinished(true);
  };

  if (!session) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Card className="p-8">
          <h2 className="text-xl font-semibold mb-4">Authentication Required</h2>
          <p className="text-zinc-500 mb-4">
            Please sign in to start a correction session.
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-zinc-950 text-zinc-100">
      {/* Header */}
      <div className="border-b border-zinc-800 px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Code Correction</h1>
          <p className="text-sm text-zinc-400">
            {sessionId ? "Session active" : "Ready to start"}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {!sessionId && (
            <Button
              onClick={startCorrection}
              disabled={isStarting}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isStarting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Starting...
                </>
              ) : (
                <>
                  <Play className="mr-2 h-4 w-4" />
                  Start Correction
                </>
              )}
            </Button>
          )}
          {sessionId && !isFinished && quizData && (
            <Button
              onClick={finishCorrection}
              disabled={isFinishing || Object.keys(userQuizAnswers).length !== quizData.questions.length}
              className="bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isFinishing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  Finish Correction
                </>
              )}
            </Button>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Code Editor */}
        <div className="w-1/2 border-r border-zinc-800">
          <CodeEditor
            code={code}
            onChange={(value) => setCode(value || "")}
            readOnly={!!sessionId}
          />
        </div>

        {/* Chat Panel */}
        <div className="w-1/2 flex flex-col">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {quizData ? (
              <div className="space-y-4">
                {isFinished && (
                  <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
                    <h2 className="text-xl font-semibold mb-2 text-green-400">
                      Correction Complete!
                    </h2>
                    <p className="text-sm text-zinc-400 mb-4">
                      Review the quiz below to see the correct answers and your score.
                    </p>
                  </div>
                )}
                <MessageComponent role="assistant">
                  <Quiz 
                    quizData={quizData} 
                    showAnswersImmediately={isFinished}
                    userAnswers={isFinished ? userQuizAnswers : userQuizAnswers}
                    onAnswerChange={!isFinished ? (answers) => setUserQuizAnswers(answers) : undefined}
                  />
                </MessageComponent>
              </div>
            ) : messages.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center text-zinc-500">
                  <p className="text-lg mb-2">No messages yet</p>
                  <p className="text-sm">
                    Click "Start Correction" to begin the evaluation
                  </p>
                </div>
              </div>
            ) : (
              <>
                {messages.map((message) => (
                  <div key={message.id} className="space-y-2">
                    <MessageComponent role={message.role}>
                      <div className="whitespace-pre-wrap">{message.content}</div>
                    </MessageComponent>
                  </div>
                ))}
                {isLoading && (
                  <MessageComponent role="assistant">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 animate-bounce rounded-full bg-zinc-400 [animation-delay:-0.3s]"></div>
                      <div className="h-2 w-2 animate-bounce rounded-full bg-zinc-400 [animation-delay:-0.15s]"></div>
                      <div className="h-2 w-2 animate-bounce rounded-full bg-zinc-400"></div>
                      <span className="text-sm text-zinc-500 ml-2">
                        Corrector is thinking...
                      </span>
                    </div>
                  </MessageComponent>
                )}
                <div ref={messagesEndRef} />
              </>
            )}
          </div>

          {/* Input */}
          {sessionId && !isFinished && (
            <div className="border-t border-zinc-800 p-4">
              <div className="flex gap-2">
                <Textarea
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      sendMessage();
                    }
                  }}
                  placeholder="Answer the corrector's question..."
                  className="min-h-[60px] resize-none bg-zinc-900 border-zinc-800 text-zinc-100"
                  disabled={isLoading}
                />
                <Button
                  onClick={sendMessage}
                  disabled={isLoading || !inputMessage.trim()}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}