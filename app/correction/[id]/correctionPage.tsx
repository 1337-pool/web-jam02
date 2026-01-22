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
import { Courgette as Cossette_Texte } from "next/font/google";
import { toast } from "sonner";
import { createCorrection, updateCorrection } from "@/app/actions/postCorrection";

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

export default function CorrectionPage({id} : any) {
  
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
  const [score, setScore] = useState(0);
  
  useEffect(() => {
  if (id === "new" || !session?.user) return;

  const getData = async () => {
    setIsStarting(true);

    try {
      const response = await fetch(
        `/api/session?login=${(session.user as any).login}&id=${id}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to load correction session");
      }

      const data = await response.json();
      console.log(data);

      
      if (data.codeSnippet) {
        setCode(data.codeSnippet);
      }

      
      let questions;
      if (typeof data.questions === 'string') {
        questions = JSON.parse(data.questions);
      } else {
        questions = data.questions;
      }

      
      const quizDataObj: QuizData = {
        title: data.title || "Code Correction Quiz",
        questions: questions
      };

      
      if (
        !quizDataObj.title ||
        !Array.isArray(quizDataObj.questions) ||
        quizDataObj.questions.length === 0
      ) {
        throw new Error("Invalid quiz structure");
      }

      const isValid = quizDataObj.questions.every((q: any) =>
        q.question &&
        Array.isArray(q.options) &&
        q.options.length === 4 &&
        q.correctAnswer !== undefined
      );

      if (!isValid) {
        throw new Error("Invalid quiz format");
      }

      setQuizData(quizDataObj);
      setSessionId(data.id || Date.now().toString());
      setUserQuizAnswers({});
      setIsFinished(false);
    } catch (error) {
      console.error("Error loading correction session:", error);
      toast.error("Failed to load correction session. Please try again.");
    } finally {
      setIsStarting(false);
    }
  };

  getData();
}, [id, session]);

  

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
    
    
    try {
      
      const error = await fetch('https://emkc.org/api/v2/piston/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          language: 'python',
          version: '3.10.0',
          files: [{ content: code }]
        })
      });
      const err = await error.json()
      if(err.run.output.toString().split("line")[1])
        {
         toast.error("in line " + err.run.output.toString().split("line")[1])
          return  
        }
        
      setIsStarting(true);
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
      
      
      try {
        const jsonMatch = data.result.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const parsed = JSON.parse(jsonMatch[0]);
          
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
      toast.error("Failed to start correction. Please try again.")
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





  const finishCorrection = async () => {
    if (!sessionId || !quizData) return;
    
    
    const allAnswered = Object.keys(userQuizAnswers).length === quizData.questions.length;
    if (!allAnswered) {
      alert("Please answer all questions before finishing the correction.");
      return;
    }
    setIsFinished(true);
    if (id == "new")
    {
      toast.promise(createCorrection({score, title: quizData.title, questions: quizData.questions, login: session?.user.login, codeSnippet: code}), {
        loading: "saving score...",
        success: "saved seccussfully",
        error: (err: any) => `${err.message}`,
      });
    } else {
      toast.promise(updateCorrection({id, score}), {
        loading: "updating score...",
        success: "updated seccussfully",
        error: (err: any) => `${err.message}`,
      });
    }
  };

  if (!session) {
    return (
      <div className="flex h-screen items-center justify-center dark">
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
    <div className="h-screen flex flex-col bg-zinc-950 text-zinc-100 dark">
      
      <div className="border-b border-zinc-800 px-4 md:px-6 py-3 md:py-4 flex items-center justify-between flex-shrink-0">
        <div>
          <h1 className="text-xl md:text-2xl font-bold">Code Correction</h1>
          <p className="text-xs md:text-sm text-zinc-400">
            {sessionId ? "Session active" : "Ready to start"}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {!sessionId && (
            <Button
              onClick={startCorrection}
              disabled={isStarting}
              className="bg-blue-600 hover:bg-blue-700 text-sm md:text-base"
            >
              {isStarting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  <span className="hidden sm:inline">Starting...</span>
                  <span className="sm:hidden">...</span>
                </>
              ) : (
                <>
                  <Play className="mr-2 h-4 w-4" />
                  <span className="hidden sm:inline">Start Correction</span>
                  <span className="sm:hidden">Start</span>
                </>
              )}
            </Button>
          )}
          {sessionId && !isFinished && quizData && (
            <Button
              onClick={finishCorrection}
              disabled={isFinishing || Object.keys(userQuizAnswers).length !== quizData.questions.length}
              className="bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base"
            >
              {isFinishing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  <span className="hidden sm:inline">Processing...</span>
                  <span className="sm:hidden">...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  <span className="hidden sm:inline">Finish Correction</span>
                  <span className="sm:hidden">Finish</span>
                </>
              )}
            </Button>
          )}
        </div>
      </div>

      
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden min-h-0">
        
        <div className="h-[40vh] md:h-full w-full md:w-1/2 border-b md:border-b-0 md:border-r border-zinc-800 flex-shrink-0 md:flex-shrink">
          <CodeEditor
            code={code}
            onChange={(value) => setCode(value || "")}
            readOnly={!!sessionId}
          />
        </div>

        
        <div className="flex-1 md:w-1/2 flex flex-col min-h-0 overflow-hidden">
          
          <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
            {quizData ? (
              <div className="space-y-4">
                {isFinished && (
                  <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 md:p-6">
                    <h2 className="text-lg md:text-xl font-semibold mb-2 text-green-400">
                      Correction Complete!
                    </h2>
                    <p className="text-xs md:text-sm text-zinc-400 mb-4">
                      Review the quiz below to see the correct answers and your score.
                    </p>
                  </div>
                )}
                <MessageComponent role="assistant">
                  <Quiz
                    setScore={setScore}
                    quizData={quizData} 
                    showAnswersImmediately={isFinished}
                    userAnswers={isFinished ? userQuizAnswers : userQuizAnswers}
                    onAnswerChange={!isFinished ? (answers) => setUserQuizAnswers(answers) : undefined}
                  />
                </MessageComponent>
              </div>
            ) : messages.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center text-zinc-500 px-4">
                  <p className="text-base md:text-lg mb-2">No messages yet</p>
                  <p className="text-xs md:text-sm">
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
        </div>
      </div>
    </div>
  );
}
