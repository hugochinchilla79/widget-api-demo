const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  // Alias para importar JSON u otros recursos desde /data
  webpack: (config) => {
    config.resolve.alias['@data'] = path.resolve(__dirname, 'data');
    return config;
  },

  // Configurar dominios permitidos si se usan imágenes externas
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // O usa un dominio específico como 'cdn.example.com'
      },
    ],
  },
};

module.exports = nextConfig;
