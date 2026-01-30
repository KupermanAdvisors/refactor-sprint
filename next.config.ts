import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        // When visiting kupermanadvisors.com, show /ka content
        source: '/',
        destination: '/ka',
        has: [
          {
            type: 'host',
            value: 'kupermanadvisors.com',
          },
        ],
      },
      {
        // Also handle www subdomain
        source: '/',
        destination: '/ka',
        has: [
          {
            type: 'host',
            value: 'www.kupermanadvisors.com',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
