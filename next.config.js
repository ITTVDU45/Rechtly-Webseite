/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Deaktiviere ESLint während des Builds
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Deaktiviere TypeScript-Prüfungen während des Builds
    ignoreBuildErrors: true,
  },
  output: 'standalone',
  poweredByHeader: false,
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = nextConfig;
