/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN', // Allows embedding on same origin, use 'ALLOWALL' for any origin
          },
          {
            key: 'Content-Security-Policy',
            value: "frame-ancestors 'self' *", // Allows embedding from any origin
          },
        ],
      },
    ]
  },
}

export default nextConfig
