import Credentials from "next-auth/providers/credentials";
import NextAuth from "next-auth";

import {z} from "zod";
import bcrypt from "bcrypt";

import prisma from "./prisma/client";
import {authConfig} from "./auth.config";

async function getUser(email: string): Promise<any> {
  try {
    const user = await prisma.user.findUnique({where: {email: email}});
    return user;
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
}

export const {auth, signIn, signOut, handlers} = NextAuth({
  ...authConfig,
  session: {strategy: "jwt"},
  providers: [
    Credentials({
      credentials: {
        email: {label: "Email"},
        password: {label: "Password", type: "password"},
      },
      async authorize(credentials) {
        const parsedCredentials = z
          .object({email: z.string().email(), password: z.string().min(6)})
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const {email, password} = parsedCredentials.data;

          const user = await getUser(email);
          if (!user) return null;

          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (passwordsMatch) return user;
        }
        return null;
      },
    }),
  ],
});
