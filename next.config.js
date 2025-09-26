/** @type {import('next').NextConfig} */
const isGitHubPages = process.env.GITHUB_PAGES === 'true';
const isDirectDeploy = process.env.DIRECT_DEPLOY === 'true';

const nextConfig = {
  // 根据环境决定是否静态导出
  ...((isGitHubPages || isDirectDeploy) && {
    output: 'export',
    trailingSlash: true,
    basePath: isDirectDeploy ? '' : '/ski',
    assetPrefix: isDirectDeploy ? '' : '/ski/',
    distDir: isDirectDeploy ? 'docs' : 'out',
    skipTrailingSlashRedirect: true,
  }),
  images: {
    unoptimized: true,
  },
  // 性能优化配置
  experimental: {
    optimizeServerReact: true,
  },
  // 压缩配置
  compress: true,
  // 静态资源优化
  generateEtags: true,
  // 构建优化
  swcMinify: true,
  // PWA和缓存优化
  poweredByHeader: false,
  // 自定义头部优化（仅在非静态导出时启用）
  ...(!isGitHubPages && {
    async headers() {
      return [
        {
          source: '/(.*)',
          headers: [
            {
              key: 'X-Content-Type-Options',
              value: 'nosniff',
            },
            {
              key: 'X-Frame-Options',
              value: 'DENY',
            },
            {
              key: 'X-XSS-Protection',
              value: '1; mode=block',
            },
            {
              key: 'Cache-Control',
              value: 'public, max-age=31536000, stale-while-revalidate=86400',
            },
          ],
        },
      ]
    },
  }),
}

module.exports = nextConfig