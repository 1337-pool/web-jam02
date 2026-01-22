"use client";
import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";
import HeroSection from "@/components/hero-section";

export default function Home() {
  const { data: session } = useSession();
  
  if (session) {
    return (
      <div>

      <HeroSection /> 

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
