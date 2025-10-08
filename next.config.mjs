/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure path aliases
  webpack: (config) => {
    // This will prevent the favicon.ico from being copied to the output
    config.plugins = config.plugins.filter(
      (plugin) => plugin.constructor.name !== 'FaviconsWebpackPlugin'
    );
    
    // Add path aliases
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': require('path').resolve(__dirname, './src'),
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
