/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Enable static exports for GitHub Pages
  images: {
    domains: ['spoonacular.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'spoonacular.com',
        pathname: '**',
      },
    ],
    unoptimized: true, // Required for static export
  },
};

export default nextConfig;

