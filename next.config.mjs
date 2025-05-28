/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  env: {
    API_URL: process.env.API_URL,
    EXTERNAL_URL: process.env.EXTERNAL_URL,
  },
};

export default nextConfig
