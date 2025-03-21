/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', 'images.unsplash.com'],
    unoptimized: true, // Required for static export
  },
  output: 'export', // Enable static exports
}

module.exports = nextConfig 