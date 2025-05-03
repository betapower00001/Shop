import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true // ให้ Next.js ข้ามข้อผิดพลาดบางอย่างใน TypeScript
  }
  // เพิ่ม config อื่นๆ ที่คุณต้องการ
};

export default nextConfig;
