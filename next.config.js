/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  basePath: process.env.NODE_ENV === 'production' ? '/Tennis-WebApp' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/Tennis-WebApp/' : '',
  images: {
    domains: ['localhost', 'images.unsplash.com'],
    unoptimized: true, // Required for static export
  },
  output: 'export', // Enable static exports
}

module.exports = nextConfig 