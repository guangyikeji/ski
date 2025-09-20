/** @type {import('next').NextConfig} */
const nextConfig = {
  // 根据环境决定是否静态导出
  ...(process.env.GITHUB_PAGES === 'true' && {
    output: 'export',
    trailingSlash: true,
    basePath: '/ski',
    assetPrefix: '/ski/',
  }),
  images: {
    unoptimized: true,
  },
  // 性能优化配置
  experimental: {
    optimizeCss: true,
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
  // 自定义头部优化
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
}

module.exports = nextConfig