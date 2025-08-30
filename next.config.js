/** @type {import('next').NextConfig} */
const nextConfig = {
  // Otimizações para produção
  swcMinify: true,
  
  // Configurações de TypeScript
  typescript: {
    ignoreBuildErrors: false,
  },
  
  // Configurações de ESLint
  eslint: {
    ignoreDuringBuilds: false,
  },
  
  // Otimizações de performance
  compress: true,
  
  // Configurações de headers para arquivos estáticos
  async headers() {
    return [
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
}

module.exports = nextConfig
