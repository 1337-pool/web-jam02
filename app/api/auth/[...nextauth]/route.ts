import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    {
      id: "42-school",
      name: "42 School",
      type: "oauth",
      authorization: {
        url: "https://api.intra.42.fr/oauth/authorize",
        params: { scope: "public" },
      },
      token: "https://api.intra.42.fr/oauth/token",
      userinfo: "https://api.intra.42.fr/v2/me",
      clientId: process.env.FORTY_TWO_CLIENT_ID,
      clientSecret: process.env.FORTY_TWO_CLIENT_SECRET,
      profile(profile) {
        return {
          id: profile.id.toString(),
          name: profile.usual_full_name || profile.displayname,
          email: profile.email,
          image: profile.image?.link || profile.image_url,
          login: profile.login,
        };
      },
    },
  ],
  callbacks: {
    async jwt({ token, user, account, profile }) {
      if (account && profile) {
        token.login = (profile as any).login;
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).login = token.login;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
