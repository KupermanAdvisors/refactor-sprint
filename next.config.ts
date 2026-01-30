import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        // When visiting kupermanadvisors.com root, show /ka content
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
        // Also handle www subdomain root
        source: '/',
        destination: '/ka',
        has: [
          {
            type: 'host',
            value: 'www.kupermanadvisors.com',
          },
        ],
      },
      {
        // Handle all other paths for kupermanadvisors.com
        source: '/:path*',
        destination: '/:path*',
        has: [
          {
            type: 'host',
            value: 'kupermanadvisors.com',
          },
        ],
      },
      {
        // Handle all other paths for www.kupermanadvisors.com
        source: '/:path*',
        destination: '/:path*',
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
