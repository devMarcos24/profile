import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configurações de renderização
  reactStrictMode: true,
  swcMinify: true,
  
  // Configuração de redirecionamento para a página inicial
  async redirects() {
    return [
      {
        source: '/',
        destination: '/home',
        permanent: true,
      },
    ];
  },
  
  // Configuração de aliases
  webpack: (config) => {
    // Remove o plugin de favicon se existir
    config.plugins = config.plugins.filter(
      (plugin) => plugin.constructor.name !== 'FaviconsWebpackPlugin'
    );
    
    // Adiciona aliases
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, './src'),
    };
    
    return config;
  },
  
  // Configuração de headers
  async headers() {
    return [
      {
        source: '/favicon.ico',
        headers: [
          {
            key: 'Link',
            value: '</favicon.svg>; rel="icon"; type="image/svg+xml"',
          },
        ],
      },
      {
        source: '/site.webmanifest',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/manifest+json',
          },
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
