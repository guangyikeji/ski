/** @type {import('next').NextConfig} */
const isGitHubPages = process.env.GITHUB_PAGES === 'true';

const nextConfig = {
  ...(isGitHubPages && {
    output: 'export',
    trailingSlash: true,
    basePath: '/ski',
    assetPrefix: '/ski/',
    distDir: 'out',
  }),

  images: {
    unoptimized: true,
  },

  // 最小配置避免挂起
  experimental: {
    workerThreads: false,
    cpus: 1
  },
  swcMinify: false,
  compress: false,
  poweredByHeader: false,
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  }
}

module.exports = nextConfig