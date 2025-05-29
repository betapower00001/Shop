/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: [
      'your-project-id.supabase.co',
      'localhost',
      'cdn.example.com',
      'encrypted-tbn0.gstatic.com',
      'res.cloudinary.com',
      'www.smartraum.de',
      'www.istore.co.za',
      'down-th.img.susercontent.com',
    ],
  },
};

export default nextConfig;

