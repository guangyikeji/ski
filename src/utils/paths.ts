// 路径工具函数，处理GitHub Pages和本地开发环境的路径差异

/**
 * 获取图片的完整路径
 * @param imagePath 相对图片路径，如 '/images/ski-bg.jpg'
 * @returns 完整的图片路径
 */
export function getImagePath(imagePath: string): string {
  // 确保路径以 / 开头
  const cleanPath = imagePath.startsWith('/') ? imagePath : `/${imagePath}`

  // 检查是否为GitHub Pages环境
  const isGitHubPages = process.env.GITHUB_PAGES === 'true' ||
                        (typeof window !== 'undefined' && window.location.pathname.startsWith('/ski/'))

  // 如果是GitHub Pages环境，添加basePath前缀
  if (isGitHubPages) {
    return `/ski${cleanPath}`
  }

  // 本地开发或其他环境直接返回
  return cleanPath
}

/**
 * 获取页面链接的完整路径
 * @param pagePath 相对页面路径，如 '/about'
 * @returns 完整的页面路径
 */
export function getPagePath(pagePath: string): string {
  // 确保路径以 / 开头
  const cleanPath = pagePath.startsWith('/') ? pagePath : `/${pagePath}`

  // 检查是否为GitHub Pages环境
  const isGitHubPages = process.env.GITHUB_PAGES === 'true' ||
                        (typeof window !== 'undefined' && window.location.pathname.startsWith('/ski/'))

  // 如果是GitHub Pages环境，添加basePath前缀
  if (isGitHubPages) {
    return `/ski${cleanPath}`
  }

  // 本地开发或其他环境直接返回
  return cleanPath
}

/**
 * 获取当前是否在GitHub Pages环境
 */
export function isGitHubPages(): boolean {
  return process.env.GITHUB_PAGES === 'true' ||
         (typeof window !== 'undefined' && window.location.pathname.startsWith('/ski/'))
}

/**
 * 获取基础路径
 */
export function getBasePath(): string {
  return isGitHubPages() ? '/ski' : ''
}