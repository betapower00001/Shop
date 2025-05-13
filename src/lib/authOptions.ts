import { PrismaAdapter } from '@next-auth/prisma-adapter';
import CredentialsProvider from 'next-auth/providers/credentials';
import { prisma } from './prisma'; // เชื่อมต่อกับ Prisma
import NextAuth from 'next-auth'; // นำเข้า NextAuth สำหรับการตั้งค่า
import { JWT } from 'next-auth/jwt'; // ใช้ประเภท JWT ถ้าจำเป็น

export const authOptions = {
  adapter: PrismaAdapter(prisma), // ใช้ PrismaAdapter สำหรับ NextAuth
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        // ตรวจสอบว่า credentials มีค่า email และ password หรือไม่
        if (!credentials?.email || !credentials.password) return null;

        // ค้นหาผู้ใช้ในฐานข้อมูล
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        // เปรียบเทียบรหัสผ่านที่ได้รับกับฐานข้อมูล (ในกรณีนี้เป็นรหัสผ่านที่ไม่ได้เข้ารหัส)
        if (user && user.password === credentials.password) {
          return {
            id: user.id.toString(), // แปลง id เป็น string
            name: user.name,
            email: user.email,
          };
        }

        return null; // ถ้าไม่พบผู้ใช้หรือรหัสผ่านไม่ถูกต้อง
      },
    }),
  ],
  session: {
    strategy: 'jwt', // ใช้ JWT สำหรับการจัดการ session
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: any }) {
      if (user) {
        token.id = user.id; // เพิ่ม id ลงใน token
        token.email = user.email; // เพิ่ม email ลงใน token
      }
      return token;
    },
    async session({ session, token }: { session: any; token: JWT }) {
      if (session.user) {
        session.user.id = token.id as string; // กำหนด id ของผู้ใช้ใน session
        session.user.email = token.email as string; // กำหนด email ของผู้ใช้ใน session
      }
      return session;
    },
  },
};
