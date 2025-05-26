// types/next-auth.d.ts
import NextAuth from "next-auth";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;  // เพิ่ม role
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    role: string;  // เพิ่ม role
  }
}
