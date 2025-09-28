/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove the default favicon.ico from the build
  webpack: (config) => {
    // This will prevent the favicon.ico from being copied to the output
    config.plugins = config.plugins.filter(
      (plugin) => plugin.constructor.name !== 'FaviconsWebpackPlugin'
    );
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
