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
    ],
  },
};

export default nextConfig;
