import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable Turbopack for now to avoid conflicts
  experimental: {
    turbo: false
  },
  
  // Configure path aliases
  webpack: (config) => {
    // This will prevent the favicon.ico from being copied to the output
    config.plugins = config.plugins.filter(
      (plugin) => plugin.constructor.name !== 'FaviconsWebpackPlugin'
    );
    
    // Add path aliases
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, './src'),
    };
    
    return config;
  },
  
  // Configure the favicon
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
    ];
  },
};

export default nextConfig;
