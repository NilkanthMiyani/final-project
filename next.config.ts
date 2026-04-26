import type { NextConfig } from "next";


const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      {
        protocol: "https",
        hostname: "**.ufs.sh",
      },
    ],
  },
};

export default nextConfig;
