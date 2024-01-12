import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/prisma/client";
import bcrypt from "bcrypt";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        //formularz dla uzytkownika
        email: { label: "Email", type: "email", placeholder: "Email" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      },
      //funkcja do autoryzowania ma dwa parametry
      async authorize(credentials, req) {
        //sprawdzamy czy uzytkownik jest zweryfikowany
        //sprawdzamy czy ma email i hasło
        if (!credentials?.email || !credentials.password)
          //jesli nie jest zwracamy null
          return null;
        //jesli req określonego uzytkownika
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });
        //jesli uzytkownik nie istnieje zwracamy null
        if (!user) return null;
        //jesli istnieje sprawdzamy czy hasła się zgadzają (to przekazane w credentials (formulurzu) i to modelu uzytkownika)
        //zwracamy const bool
        const passwordsMatch = await bcrypt.compare(
          credentials.password,
          user.hashedPassword!
        );
        //jesli hasła się zgadzają zwracamy user object, jeśli nie null
        return passwordsMatch ? user : null;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: "jwt",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
