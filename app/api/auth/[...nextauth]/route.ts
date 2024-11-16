import NextAuth, { User } from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import Credentials from 'next-auth/providers/credentials';
import { prisma } from '@/prisma/prisma-client';
import GoogleProvider from 'next-auth/providers/google';

const handler = NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID || '',
      clientSecret: process.env.GITHUB_SECRET || '',
      profile(profile) {
        return {
          id: String(profile.id),
          name: profile.name,
          email: profile.email,
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),

    Credentials({
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          required: true,
        },
        password: {
          label: 'Password',
          type: 'password',
          required: true,
        },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        const user = await prisma.user.findFirst({
          where: {
            mail: credentials.email,
          },
        });

        if (!user) {
          return null;
        }

        const isPasswordValid = credentials.password === user.password;

        if (!isPasswordValid) {
          return null;
        }

        const userAll = {
          id: user.id,
          name: user.name,
          email: user.mail,
        };

        return userAll as unknown as User;
      },
    }),
  ],
  pages: {
    signIn: '/signin',
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
