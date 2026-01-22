import NextAuth from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      login?: string;
      name?: string;
      email?: string;
      image?: string;
    }
  }
}