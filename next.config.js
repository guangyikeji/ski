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
}

module.exports = nextConfig