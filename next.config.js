/** @type {import('next').NextConfig} */
const isGitHubPages = process.env.GITHUB_PAGES === 'true';

const nextConfig = {
  // GitHub Pages静态导出配置
  ...(isGitHubPages && {
    output: 'export',
    trailingSlash: true,
    basePath: '/ski',
    assetPrefix: '/ski/',
    distDir: 'out',
    skipTrailingSlashRedirect: true,
  }),

  images: {
    unoptimized: true,
  },

  // 基础配置
  compress: true,
  swcMinify: true,
  poweredByHeader: false,
}

module.exports = nextConfig