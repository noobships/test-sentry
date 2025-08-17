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
          // Using only CSP frame-ancestors directive which is more modern and flexible
          {
            key: 'Content-Security-Policy',
            value: "frame-ancestors *", // Allows embedding from any origin
          },
        ],
      },
    ]
  },
}

export default nextConfig
