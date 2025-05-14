// src/app/api/auth/route.ts
import NextAuth from "next-auth/next"; // ✅ จุดสำคัญคือ "/next"
import { authOptions } from "@/lib/authOptions";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
