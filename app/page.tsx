"use client";
import Image from "next/image";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import AIAssistantUI from "@/components/ui/chat/components/AIAssistantUI";
import { Button } from "@/components/ui/button";

export default function Home() {
  const { data: session } = useSession();
  
  if (session) {
    return (
      <div className="min-h-screen bg-zinc-950 text-zinc-100 p-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Welcome back!</h1>
              <p className="text-zinc-400">Signed in as {session.user?.email}</p>
              <p className="text-zinc-400">Login: {(session.user as any)?.login}</p>
            </div>
            <Button onClick={() => signOut()} variant="outline">Sign out</Button>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2">
            <Link href="/correction">
              <div className="p-6 border border-zinc-800 rounded-lg hover:border-blue-600 transition-colors cursor-pointer">
                <h2 className="text-xl font-semibold mb-2">Code Correction</h2>
                <p className="text-zinc-400 text-sm">
                  Start a correction session with the AI corrector. Paste your Python code and answer tough questions.
                </p>
              </div>
            </Link>
            
            <div className="p-6 border border-zinc-800 rounded-lg">
              <h2 className="text-xl font-semibold mb-2">AI Assistant</h2>
              <p className="text-zinc-400 text-sm">
                General purpose AI assistant chat.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex items-center justify-center">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">1337 Code Corrector</h1>
        <p className="text-zinc-400">Sign in to start a correction session</p>
        <Button onClick={() => signIn("42-school")} className="bg-blue-600 hover:bg-blue-700">
          Sign in with 42
        </Button>
      </div>
    </div>
  )
        
}
