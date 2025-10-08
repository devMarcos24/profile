import { PrismaAdapter } from "@auth/prisma-adapter";
import { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import { prisma } from './prisma';
import { JWT } from 'next-auth/jwt';


declare module 'next-auth/jwt' {
  interface JWT {
    accessToken?: string;
    refreshToken?: string;
    accessTokenExpires?: number;
  }
}

async function refreshAccessToken(token: JWT): Promise<JWT> {
  try {
    // Implement your token refresh logic here if needed
    return token;
  } catch (error) {
    console.error('Error refreshing access token', error);
    return { ...token, error: 'RefreshAccessTokenError' } as JWT;
  }
}

export const authConfig: NextAuthConfig = {
  adapter: PrismaAdapter(prisma!),
  providers: [
    Google({
      clientId: process.env['GOOGLE_CLIENT_ID']!,
      clientSecret: process.env['GOOGLE_CLIENT_SECRET']!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    })
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user = {
          ...session.user,
          id: token.sub || '',
          name: token.name || '',
          email: token.email || '',
          image: token.picture || null,
        };
      }
      return session;
    },
    async jwt({ token, user, account }) {
      // Initial sign in
      if (account && user) {
        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          accessTokenExpires: account.expires_at ? account.expires_at * 1000 : Date.now() + 3600 * 1000,
        } as JWT;
      }

      // Return previous token if the access token has not expired yet
      if (token.accessTokenExpires && Date.now() < token.accessTokenExpires) {
        return token;
      }

      // Access token has expired, try to update it
      return refreshAccessToken(token);
    },
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  secret: process.env['NEXTAUTH_SECRET'],
  debug: process.env.NODE_ENV === 'development',
} satisfies NextAuthConfig;