/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@saas-admin/design-system', '@saas-admin/ui'],
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:3001/api/:path*',
      },
    ];
  },
};

module.exports = nextConfig; 