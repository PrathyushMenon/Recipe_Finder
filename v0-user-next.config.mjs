/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['spoonacular.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'spoonacular.com',
        pathname: '**',
      },
    ],
  },
};

export default nextConfig;

