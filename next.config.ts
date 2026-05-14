import type { NextConfig } from "next";


const nextConfig: NextConfig = {
  // Only use static export for GitHub Pages (set GITHUB_PAGES=true in that workflow)
  // On Vercel and local dev, API routes work normally
  ...(process.env.GITHUB_PAGES === 'true' ? { output: 'export' } : {}),
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
