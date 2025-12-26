/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["images1.apartments.com"], // add all domains your API images use

    remotePatterns: [
      {
        protocol: "https",
        hostname: "images1.apartments.com",
      },
      {
        protocol: "https",
        hostname: "apartments.com",
      },
    ],
  },
  reactCompiler: true,
};

export default nextConfig;
