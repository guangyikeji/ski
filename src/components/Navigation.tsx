'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import {
  Menu,
  X,
  Mountain,
  Calculator,
  Trophy,
  Users,
  FileText,
  UserPlus,
  ChevronDown,
  LogIn,
  User,
  LogOut,
  Settings,
  Calendar,
  BarChart3,
  Award,
  TrendingUp
} from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { Resource, Action } from '@/types/auth'

const navigationItems = [
  {
    name: '首页',
    href: '/',
    icon: Mountain,
    active: true,
    resource: Resource.HOME,
    action: Action.READ
  },
  {
    name: '积分系统',
    href: '/points',
    icon: Calculator,
    active: true,
    resource: Resource.POINTS_QUERY,
    action: Action.READ,
    children: [
      { name: '中国积分查询', href: '/points/fis', active: true, resource: Resource.POINTS_QUERY, action: Action.READ },
      { name: '积分计算器', href: '/points/calculator', active: true, resource: Resource.POINTS_CALCULATOR, action: Action.READ },
      { name: '积分排行榜', href: '/points/rankings', active: true, resource: Resource.POINTS_RANKING, action: Action.READ },
      { name: '积分变化趋势', href: '/points/trends', active: true, resource: Resource.POINTS_TRENDS, action: Action.READ }
    ]
  },
  {
    name: '赛事管理',
    href: '/competitions',
    icon: Trophy,
    active: true,
    resource: Resource.COMPETITIONS,
    action: Action.READ,
    children: [
      { name: '赛事日程', href: '/competitions/schedule', active: true, resource: Resource.COMPETITIONS_SCHEDULE, action: Action.READ },
      { name: '比赛列表', href: '/competitions', active: true, resource: Resource.COMPETITIONS, action: Action.READ },
      { name: '成绩导入', href: '/results-import', active: true, resource: Resource.RESULTS_IMPORT, action: Action.READ },
      { name: '成绩公布', href: '/results-announcement', active: true, resource: Resource.RESULTS_ANNOUNCEMENT, action: Action.READ },
      { name: '数据分析', href: '/competitions/stats', active: true, resource: Resource.STATISTICS, action: Action.READ }
    ]
  },
  {
    name: '运动员管理',
    href: '/athletes',
    icon: Users,
    active: true,
    resource: Resource.USER_MANAGEMENT,
    action: Action.READ,
    children: [
      { name: '运动员档案', href: '/athletes', active: true, resource: Resource.USER_MANAGEMENT, action: Action.READ },
      { name: '成绩历史', href: '/athletes/history', active: true, resource: Resource.POINTS_QUERY, action: Action.READ },
      { name: '积分排名', href: '/athletes/rankings', active: true, resource: Resource.POINTS_RANKING, action: Action.READ },
      { name: '成绩统计', href: '/athletes/stats', active: true, resource: Resource.STATISTICS, action: Action.READ }
    ]
  },
  {
    name: '报名系统',
    href: '/registration',
    icon: UserPlus,
    active: true,
    resource: Resource.REGISTRATION,
    action: Action.READ,
    children: [
      { name: '在线报名', href: '/registration', active: true, resource: Resource.REGISTRATION, action: Action.WRITE },
      { name: '报名管理', href: '/registration/manage', active: true, resource: Resource.REGISTRATION, action: Action.UPDATE },
      { name: '资格审查', href: '/registration/verification', active: true, resource: Resource.REGISTRATION, action: Action.UPDATE },
      { name: '费用管理', href: '/registration/fees', active: true, resource: Resource.REGISTRATION, action: Action.UPDATE }
    ]
  },
  {
    name: '规则文档',
    href: '/rules',
    icon: FileText,
    active: true,
    resource: Resource.RULES_POINTS,
    action: Action.READ,
    children: [
      { name: '中国积分规则', href: '/rules/points', active: true, resource: Resource.RULES_POINTS, action: Action.READ },
      { name: '竞赛规则', href: '/rules/competition', active: true, resource: Resource.RULES_POINTS, action: Action.READ },
      { name: '技术规范', href: '/rules/technical', active: true, resource: Resource.RULES_POINTS, action: Action.READ },
      { name: '中英对照', href: '/rules/bilingual', active: true, resource: Resource.RULES_POINTS, action: Action.READ }
    ]
  }
]

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const { user, logout, isLoading, hasPermission, isAuthenticated } = useAuth()

  const toggleDropdown = (name: string) => {
    setOpenDropdown(openDropdown === name ? null : name)
  }

  const handleLogout = () => {
    logout()
    setUserMenuOpen(false)
    router.push('/')
  }

  const getRoleDisplayName = (role: string) => {
    const roleMap: { [key: string]: string } = {
      admin: '管理员',
      coach: '教练员',
      athlete: '运动员',
      user: '用户'
    }
    return roleMap[role] || '用户'
  }

  // 过滤权限不足的导航项
  const filterNavigationItems = (items: typeof navigationItems) => {
    return items.filter(item => {
      // 首页始终显示
      if (item.name === '首页') return true

      // 检查是否包含公开的子菜单项
      const hasPublicChildren = item.children?.some(child =>
        ['积分排行榜', '中国积分规则', '竞赛规则', '赛事日程'].includes(child.name)
      )

      // 如果包含公开子菜单或用户有权限，则显示主菜单
      if (hasPublicChildren || (item.resource && item.action && hasPermission(item.resource, item.action))) {
        return true
      }

      // 对于其他项目，检查权限
      if (item.resource && item.action) {
        return hasPermission(item.resource, item.action)
      }
      return true
    }).map(item => ({
      ...item,
      // 对于未登录用户，保留所有子菜单但标记为需要登录
      children: item.children ? item.children.filter(child => {
        // 如果用户已登录，按权限过滤
        if (isAuthenticated && child.resource && child.action) {
          return hasPermission(child.resource, child.action)
        }
        // 如果用户未登录，保留所有子项但会在UI中显示需要登录
        return true
      }).map(child => ({
        ...child,
        // 公开页面不需要登录 - 积分排名、积分规则、赛事日程
        needsAuth: !isAuthenticated && child.resource && child.action &&
                  !['积分排行榜', '中国积分规则', '竞赛规则', '赛事日程'].includes(child.name)
      })) : undefined,
      // 如果包含公开子菜单，主菜单也不需要认证标记
      needsAuth: !isAuthenticated && item.resource && item.action && item.name !== '首页' &&
                !item.children?.some(child => ['积分排行榜', '中国积分规则', '竞赛规则', '赛事日程'].includes(child.name))
    }))
  }

  const filteredNavigationItems = filterNavigationItems(navigationItems)

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Mountain className="h-8 w-8 text-ski-blue" />
              <span className="text-xl font-bold text-ski-navy whitespace-nowrap">
                中国滑雪赛事积分系统
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 flex-1 justify-center ml-8 whitespace-nowrap">
            {filteredNavigationItems.map((item) => (
              <div key={item.name} className="relative">
                {item.children ? (
                  <div className="relative">
                    <button
                      onClick={() => toggleDropdown(item.name)}
                      className={`flex items-center space-x-1 nav-link whitespace-nowrap ${
                        pathname?.startsWith(item.href) ||
                        (item.children && item.children.some(child => pathname === child.href)) ? 'active' : ''
                      } ${!item.active || item.needsAuth ? 'opacity-75' : ''}`}
                      disabled={!item.active}
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.name}</span>
                      <ChevronDown className="h-3 w-3" />
                    </button>

                    {openDropdown === item.name && (
                      <div className="dropdown-menu">
                        {item.children.map((child) => (
                          child.needsAuth ? (
                            <div
                              key={child.name}
                              className="dropdown-item text-gray-400 cursor-not-allowed"
                            >
                              <div className="flex items-center justify-between">
                                <span>{child.name}</span>
                                <span className="text-xs text-sky-500">需要登录</span>
                              </div>
                            </div>
                          ) : (
                            <Link
                              key={child.name}
                              href={child.href}
                              className={`dropdown-item ${
                                child.active
                                  ? `text-gray-700 hover:text-ski-blue ${
                                      pathname === child.href ? 'bg-ski-ice text-ski-blue font-medium' : ''
                                    }`
                                  : 'text-gray-400 cursor-not-allowed'
                              }`}
                              onClick={() => child.active && setOpenDropdown(null)}
                            >
                              <div className="flex items-center justify-between">
                                <span>{child.name}</span>
                                {!child.active && (
                                  <span className="badge badge-coming-soon text-xs">即将上线</span>
                                )}
                              </div>
                            </Link>
                          )
                        ))}
                        {item.needsAuth && (
                          <div className="border-t border-gray-100 mt-1 pt-1">
                            <Link
                              href="/login"
                              className="dropdown-item text-sky-500 hover:text-sky-600 text-sm"
                              onClick={() => setOpenDropdown(null)}
                            >
                              <div className="flex items-center">
                                <LogIn className="h-3 w-3 mr-2" />
                                <span>登录解锁功能</span>
                              </div>
                            </Link>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className={`flex items-center space-x-1 nav-link whitespace-nowrap ${
                      pathname === item.href || pathname?.startsWith(item.href + '/') ? 'active' : ''
                    } ${!item.active ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.name}</span>
                    {!item.active && (
                      <span className="badge badge-coming-soon text-xs ml-2">即将上线</span>
                    )}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Auth Links */}
          <div className="hidden md:flex items-center space-x-4 whitespace-nowrap">
            {isLoading ? (
              <div className="animate-pulse bg-gray-200 h-8 w-20 rounded"></div>
            ) : user ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center space-x-2 text-gray-700 hover:text-ski-blue px-3 py-2 rounded-md text-sm font-medium"
                >
                  <div className="w-8 h-8 bg-ski-blue text-white rounded-full flex items-center justify-center text-sm font-semibold">
                    {user.username.charAt(0).toUpperCase()}
                  </div>
                  <span>{user.username}</span>
                  <ChevronDown className="h-4 w-4" />
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg border border-gray-100 py-1 z-50">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <div className="text-sm font-medium text-gray-900">{user.username}</div>
                      <div className="text-xs text-gray-500">{user.email}</div>
                      <div className="text-xs text-ski-blue">{getRoleDisplayName(user.role)}</div>
                    </div>
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      <div className="flex items-center">
                        <Settings className="h-4 w-4 mr-2" />
                        个人设置
                      </div>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full px-4 py-2 text-sm text-left text-red-600 hover:bg-red-50"
                    >
                      <div className="flex items-center">
                        <LogOut className="h-4 w-4 mr-2" />
                        退出登录
                      </div>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  href="/login"
                  className="flex items-center space-x-1 text-gray-700 hover:text-ski-blue px-3 py-2 rounded-md text-sm font-medium whitespace-nowrap"
                >
                  <LogIn className="h-4 w-4" />
                  <span>登录</span>
                </Link>
                <Link
                  href="/register"
                  className="flex items-center space-x-1 bg-ski-blue text-white hover:bg-ski-blue/90 px-3 py-2 rounded-md text-sm font-medium whitespace-nowrap"
                >
                  <User className="h-4 w-4" />
                  <span>注册</span>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 hover:text-ski-blue p-2"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {filteredNavigationItems.map((item) => (
              <div key={item.name}>
                <Link
                  href={item.needsAuth ? '/login' : item.href}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium ${
                    pathname?.startsWith(item.href) ||
                    (item.children && item.children.some(child => pathname === child.href))
                      ? 'text-ski-blue bg-ski-ice'
                      : 'text-gray-700 hover:text-ski-blue hover:bg-gray-50'
                  } ${!item.active || item.needsAuth ? 'opacity-75' : ''}`}
                  onClick={() => (item.active && !item.needsAuth) && setIsMobileMenuOpen(false)}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.name}</span>
                  {item.needsAuth && (
                    <span className="text-xs text-sky-500">需要登录</span>
                  )}
                  {!item.active && (
                    <span className="badge badge-coming-soon text-xs">即将上线</span>
                  )}
                </Link>

                {item.children && (item.active || item.needsAuth) && (
                  <div className="ml-6 space-y-1">
                    {item.children.map((child) => (
                      child.needsAuth ? (
                        <div
                          key={child.name}
                          className="block px-3 py-2 rounded-md text-sm text-gray-400 cursor-not-allowed"
                        >
                          <div className="flex items-center justify-between">
                            <span>{child.name}</span>
                            <span className="text-xs text-sky-500">需要登录</span>
                          </div>
                        </div>
                      ) : (
                        <Link
                          key={child.name}
                          href={child.href}
                          className={`block px-3 py-2 rounded-md text-sm ${
                            child.active
                              ? `text-gray-600 hover:text-ski-blue hover:bg-gray-50 ${
                                  pathname === child.href ? 'text-ski-blue bg-ski-ice font-medium' : ''
                                }`
                              : 'text-gray-400 cursor-not-allowed'
                          }`}
                          onClick={() => child.active && setIsMobileMenuOpen(false)}
                        >
                          <div className="flex items-center justify-between">
                            <span>{child.name}</span>
                            {!child.active && (
                              <span className="badge badge-coming-soon text-xs">即将上线</span>
                            )}
                          </div>
                        </Link>
                      )
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Mobile Auth Links */}
            <div className="border-t border-gray-200 pt-3 mt-3">
              {user ? (
                <>
                  <div className="px-3 py-2 mb-2">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-ski-blue text-white rounded-full flex items-center justify-center text-sm font-semibold">
                        {user.username.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{user.username}</div>
                        <div className="text-xs text-gray-500">{getRoleDisplayName(user.role)}</div>
                      </div>
                    </div>
                  </div>
                  <Link
                    href="/profile"
                    className="flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-ski-blue hover:bg-gray-50"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Settings className="h-5 w-5" />
                    <span>个人设置</span>
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout()
                      setIsMobileMenuOpen(false)
                    }}
                    className="flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50 w-full text-left mt-2"
                  >
                    <LogOut className="h-5 w-5" />
                    <span>退出登录</span>
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-ski-blue hover:bg-gray-50"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <LogIn className="h-5 w-5" />
                    <span>登录</span>
                  </Link>
                  <Link
                    href="/register"
                    className="flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium bg-ski-blue text-white hover:bg-ski-blue/90 mt-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <User className="h-5 w-5" />
                    <span>注册</span>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}