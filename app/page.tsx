"use client";
import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";
import AIAssistantUI from "@/components/ui/chat/components/AIAssistantUI";

export default function Home() {
  const { data: session } = useSession();
  
  if (session) {
    return (
      <div>
        <p>Signed in as {session.user?.email}</p>
        <p>Login: {(session.user as any)?.login}</p>
        <button onClick={() => signOut()}>Sign out</button>

      <AIAssistantUI /> 
      </div>
    );
  }
  
  
  return (
    <>
      <button onClick={() => signIn("42-school")}>Sign in with 42</button>
      {/* <AIAssistantUI />  */}
    </>
  )
        
}
