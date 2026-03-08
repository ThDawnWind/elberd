/** @type {import('next').NextConfig} */

const nextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'tasty-team.ru', 
      },
      {
        protocol: 'https',
        hostname: 'fitlabs.ru', 
      },
    ],
  },
};

export default nextConfig;
