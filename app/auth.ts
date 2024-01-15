import GoogleProvider from "next-auth/providers/google";
import NextAuth from "next-auth/next";

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
};

export const authHandler = NextAuth(authOptions);
