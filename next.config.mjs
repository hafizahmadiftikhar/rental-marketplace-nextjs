/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images1.apartments.com",
      },
      {
        protocol: "https",
        hostname: "**.apartments.com",
      },
    ],
    minimumCacheTTL: 60,
    unoptimized: true,
  },
  reactCompiler: true,
};

export default nextConfig;