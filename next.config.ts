import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,  // เปิดใช้งาน React Strict Mode
  typescript: {
    ignoreBuildErrors: true,  // ให้ Next.js ข้ามข้อผิดพลาดบางอย่างใน TypeScript
  },
};

export default nextConfig;
