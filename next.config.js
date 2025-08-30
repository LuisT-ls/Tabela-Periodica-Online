/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  experimental: {
    appDir: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
}

module.exports = nextConfig
