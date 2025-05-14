// src/lib/authOptions.ts
import { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { prisma } from './prisma'; // ต้อง import prisma เพื่อให้ฟังก์ชัน authorize ใช้ได้

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // ตรวจสอบผู้ใช้ที่นี่ (สมมุติใช้ Prisma)
        const user = await prisma.user.findUnique({
          where: { email: credentials?.email },
        });
        if (user && user.password === credentials?.password) {
          return user;
        }
        return null;
      }
    })
  ],
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    // แก้ตรงนี้ให้แน่ใจว่า session.user มี email และไม่เกิด undefined
    async session({ session, token }) {
      session.user = session.user || {}; // กันกรณี session.user เป็น undefined
      if (token?.email) {
        session.user.email = token.email as string; // cast email เป็น string เพื่อไม่ให้เกิด error
      }
      return session;
    },
    async jwt({ token, user }) {
      // ถ้ามี user ที่ล็อกอิน ให้เอา email ใส่ใน token
      if (user) token.email = user.email;
      return token;
    },
  },
};
