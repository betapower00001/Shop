/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: [
      'your-project-id.supabase.co',
      'localhost',
      'cdn.example.com',
      'encrypted-tbn0.gstatic.com', // เพิ่มโดเมนนี้เพราะ error ของ next/image
      'res.cloudinary.com',          // ถ้าใช้ Cloudinary 
      'www.smartraum.de',
      'www.istore.co.za',
      'down-th.img.susercontent.com',
      // เพิ่มโดเมนอื่น ๆ ที่คุณจะใช้เก็บรูป
    ],
  },
};

export default nextConfig;
