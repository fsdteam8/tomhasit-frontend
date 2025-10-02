import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        // TODO: Replace with actual API call
        // const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        //   method: "POST",
        //   headers: { "Content-Type": "application/json" },
        //   body: JSON.stringify({
        //     email: credentials.email,
        //     password: credentials.password,
        //   }),
        // })

        // if (!response.ok) return null
        // const user = await response.json()

        // Mock user for development
        if (credentials.email === "admin@tomhasit.com" && credentials.password === "password") {
          return {
            id: "1",
            email: credentials.email,
            name: "Admin User",
          }
        }

        return null
      },
    }),
  ],
  pages: {
    signIn: "/login",
    error: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.email = user.email
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.email = token.email as string
      }
      return session
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
}
