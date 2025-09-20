'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import {
  Calculator,
  Trophy,
  Users,
  FileText,
  UserPlus,
  TrendingUp,
  Award,
  Database,
  ChevronRight,
  Clock,
  CheckCircle,
  Pin,
  PinOff,
  Lock,
  LogIn
} from 'lucide-react'
import { getImagePath } from '@/utils/paths'
import { useAuth } from '@/contexts/AuthContext'
import { Resource, Action } from '@/types/auth'

const features = [
  {
    title: '平台介绍',
    description: '了解中国高山滑雪积分体系',
    icon: FileText,
    href: '/about',
    status: 'active',
    color: 'text-blue-600'
  },
  {
    title: '会员注册',
    description: '注册成为平台会员，查看个人积分',
    icon: UserPlus,
    href: '/register',
    status: 'active',
    color: 'text-green-600'
  },
  {
    title: '赛事公告',
    description: '查看最新的赛事安排和公告',
    icon: Pin,
    href: '/events',
    status: 'active',
    color: 'text-yellow-600'
  },
  {
    title: '积分规则',
    description: '查看中国高山滑雪积分计算规则',
    icon: Calculator,
    href: '/rules/points',
    status: 'active',
    color: 'text-purple-600'
  },
  {
    title: '竞赛管理',
    description: '管理比赛信息、成绩录入和统计',
    icon: Award,
    href: '/competitions',
    status: 'active',
    color: 'text-indigo-600'
  },
  {
    title: '运动员档案',
    description: '运动员信息管理和积分历史',
    icon: Users,
    href: '/athletes',
    status: 'active',
    color: 'text-gray-600'
  },
  {
    title: '在线报名',
    description: '便捷的赛事报名和费用管理',
    icon: UserPlus,
    href: '/registration',
    status: 'active',
    color: 'text-red-600'
  },
  {
    title: '数据分析',
    description: '深度数据分析和可视化报表',
    icon: TrendingUp,
    href: '/competitions/stats',
    status: 'active',
    color: 'text-indigo-600'
  }
]

const stats = [
  { label: '支持项目', value: '5+', icon: Award },
  { label: '积分规则', value: '100%', description: '符合中国标准', icon: CheckCircle },
  { label: '更新频率', value: '21天', description: '积分周期', icon: Clock },
  { label: '数据来源', value: '中国', description: '官方数据', icon: Database }
]


// 动态新闻数据
const newsItems = [
  {
    id: 1,
    title: '2024全国锦标赛',
    subtitle: '大回转项目 · 正在进行',
    status: 'live',
    pinned: true
  },
  {
    id: 2,
    title: '积分排名更新',
    subtitle: '14天周期 · 已发布',
    status: 'updated'
  },
  {
    id: 3,
    title: '新赛季规则',
    subtitle: '技术委员会 · 已更新',
    status: 'updated'
  },
  {
    id: 4,
    title: '选手注册开启',
    subtitle: '2024-25赛季 · 开放报名',
    status: 'updated'
  },
  {
    id: 5,
    title: '训练营通知',
    subtitle: '冬训计划 · 即将开始',
    status: 'updated'
  }
]

export default function HomePage() {
  const { hasPermission, isAuthenticated, user } = useAuth()
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [isClient, setIsClient] = useState(false)

  // 确保只在客户端渲染权限相关内容
  useEffect(() => {
    setIsClient(true)
  }, [])

  // 自动轮播功能
  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        setCurrentNewsIndex((prev) => (prev + 1) % newsItems.length)
      }, 4000) // 每4秒切换

      return () => clearInterval(interval)
    }
  }, [isPaused])

  const handlePauseToggle = () => {
    setIsPaused(!isPaused)
  }

  const getCurrentNews = () => {
    return newsItems[currentNewsIndex]
  }

  const goToNews = (index: number) => {
    setCurrentNewsIndex(index)
    setIsPaused(true)
    // 3秒后自动恢复轮播
    setTimeout(() => setIsPaused(false), 3000)
  }
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-black/50"></div>
          <div
            className="w-full h-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('${getImagePath('/images/ski-bg.jpg')}')`
            }}
          ></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
                <span className="text-gradient bg-gradient-ski">Alpine Skiing China</span>
                <span className="block text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl">中国高山滑雪管理平台</span>
              </h1>
              <div className="mb-8">
                <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-200 mb-6 leading-relaxed font-semibold">
                  传承雪山精神，追求卓越竞技
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 text-sm md:text-base lg:text-lg">
                  <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3 border border-white/20">
                    <div className="w-3 h-3 bg-ski-blue rounded-full mr-3 flex-shrink-0"></div>
                    <span className="text-white font-medium">中国积分体系标准</span>
                  </div>
                  <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3 border border-white/20">
                    <div className="w-3 h-3 bg-green-400 rounded-full mr-3 flex-shrink-0"></div>
                    <span className="text-white font-medium">国家级数据管理服务</span>
                  </div>
                  <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3 border border-white/20">
                    <div className="w-3 h-3 bg-yellow-400 rounded-full mr-3 flex-shrink-0"></div>
                    <span className="text-white font-medium">中国滑雪官方平台</span>
                  </div>
                </div>

                {/* 登录注册引导 */}
                {isClient && !isAuthenticated && (
                  <div className="mt-8">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Link
                        href="/register"
                        className="inline-flex items-center justify-center px-6 py-3 bg-ski-blue text-white rounded-lg hover:bg-ski-blue/90 transition-colors font-semibold text-lg"
                      >
                        <UserPlus className="h-5 w-5 mr-2" />
                        免费注册会员
                      </Link>
                      <Link
                        href="/login"
                        className="inline-flex items-center justify-center px-6 py-3 border-2 border-white text-white rounded-lg hover:bg-white hover:text-ski-navy transition-colors font-semibold text-lg"
                      >
                        <LogIn className="h-5 w-5 mr-2" />
                        会员登录
                      </Link>
                    </div>
                    <p className="text-gray-300 text-sm mt-4">
                      注册成为会员，解锁积分查询、赛事报名、数据分析等专业功能
                    </p>
                  </div>
                )}
              </div>
            </div>
            <div className="lg:block">
              <div className="relative">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 md:p-6 lg:p-8 border border-white/20 mt-8 lg:mt-0">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-white">实时动态</h3>
                    <button
                      onClick={handlePauseToggle}
                      className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                      title={isPaused ? "继续轮播" : "暂停轮播"}
                    >
                      {isPaused ? (
                        <Clock className="h-4 w-4 text-orange-400" />
                      ) : (
                        <CheckCircle className="h-4 w-4 text-green-400" />
                      )}
                    </button>
                  </div>
                  <div className="space-y-4">
                    {/* 当前显示的动态 */}
                    <div className="flex items-center p-4 bg-white/10 rounded-lg border border-white/20">
                      <div className="flex-1">
                        <div className="text-white font-semibold">{getCurrentNews().title}</div>
                        <div className="text-gray-300 text-sm">{getCurrentNews().subtitle}</div>
                      </div>
                      <div className={`w-3 h-3 rounded-full ${
                        getCurrentNews().status === 'live'
                          ? 'bg-red-400 animate-pulse'
                          : 'bg-green-400'
                      }`}></div>
                    </div>

                    {/* 其他动态预览 */}
                    {newsItems.slice(0, 3).map((item, index) => (
                      index !== currentNewsIndex && (
                        <div
                          key={item.id}
                          className="flex items-center p-3 bg-white/5 rounded-lg cursor-pointer hover:bg-white/10 transition-colors"
                          onClick={() => goToNews(index)}
                        >
                          <div className="flex-1">
                            <div className="text-white/80 font-medium text-sm">{item.title}</div>
                            <div className="text-gray-400 text-xs">{item.subtitle}</div>
                          </div>
                        </div>
                      )
                    ))}
                  </div>

                  {/* 指示器 */}
                  <div className="mt-6 flex justify-center space-x-2">
                    {newsItems.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => goToNews(index)}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          index === currentNewsIndex ? 'bg-white' : 'bg-white/30'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* 滚动指示器 */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full animate-bounce mt-2"></div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-ski-navy mb-4">平台数据概览</h2>
            <p className="text-gray-600 text-sm md:text-base">实时更新的系统数据和运行状态</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center bg-gray-50 rounded-lg p-4 md:p-6 hover:shadow-lg transition-shadow">
                <div className="flex justify-center mb-3 md:mb-4">
                  <div className={`p-2 md:p-3 rounded-full ${
                    index % 4 === 0 ? 'bg-blue-100' :
                    index % 4 === 1 ? 'bg-green-100' :
                    index % 4 === 2 ? 'bg-yellow-100' :
                    'bg-purple-100'
                  }`}>
                    <stat.icon className={`h-5 w-5 md:h-6 md:w-6 ${
                      index % 4 === 0 ? 'text-blue-600' :
                      index % 4 === 1 ? 'text-green-600' :
                      index % 4 === 2 ? 'text-yellow-600' :
                      'text-purple-600'
                    }`} />
                  </div>
                </div>
                <div className="text-2xl md:text-3xl font-bold text-ski-navy mb-2">
                  {stat.value}
                </div>
                <div className="text-xs md:text-sm font-medium text-gray-900 mb-1">
                  {stat.label}
                </div>
                {stat.description && (
                  <div className="text-xs text-gray-500">
                    {stat.description}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Live Competition Results Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-ski-navy mb-4">
              {isClient && isAuthenticated ? '最新赛事成绩' : '平台核心功能'}
            </h2>
            <p className="text-gray-600 text-sm md:text-base">
              {isClient && isAuthenticated
                ? '实时更新的竞赛结果和积分排名'
                : '注册成为会员，解锁所有专业功能'
              }
            </p>
          </div>

          {isClient && isAuthenticated ? (
            <div>
              {/* 会员个人化欢迎 */}
              <div className="bg-gradient-to-r from-ski-blue to-blue-600 rounded-lg p-6 mb-8 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold mb-2">
                      欢迎回来，{user?.username || '会员'}！
                    </h3>
                    <p className="text-blue-100">
                      {user?.role === 'admin' ? '管理员' :
                       user?.role === 'coach' ? '教练' : '运动员'} ·
                      {user?.status === 'active' ? '账户正常' : '待审核状态'}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">
                      {user?.role === 'athlete' ? '85.2' : '--'}
                    </div>
                    <div className="text-blue-100 text-sm">
                      {user?.role === 'athlete' ? '当前积分' : '系统权限'}
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex space-x-4">
                  <Link
                    href="/profile"
                    className="inline-flex items-center px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors text-sm"
                  >
                    查看档案
                  </Link>
                  {user?.role === 'athlete' && (
                    <Link
                      href="/points/fis"
                      className="inline-flex items-center px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors text-sm"
                    >
                      积分详情
                    </Link>
                  )}
                  {user?.role === 'admin' && (
                    <Link
                      href="/admin"
                      className="inline-flex items-center px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors text-sm"
                    >
                      管理后台
                    </Link>
                  )}
                </div>
              </div>

              {/* 会员专享内容 */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            {/* Recent Competition Results */}
            <div className="bg-white rounded-lg shadow-lg p-4 md:p-6">
              <div className="flex items-center justify-between mb-4 md:mb-6">
                <h3 className="text-lg md:text-xl font-semibold text-ski-navy">最新成绩</h3>
                <div className="flex items-center text-sm text-green-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                  实时更新
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-semibold text-gray-900">2024全国锦标赛</div>
                    <div className="text-sm text-gray-600">男子大回转 · 天池雪场</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-ski-blue">正在进行</div>
                    <div className="text-xs text-gray-500">12-15 14:30</div>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-semibold text-gray-900">中国杯高山滑雪公开赛</div>
                    <div className="text-sm text-gray-600">女子回转 · 万龙雪场</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-green-600">已完成</div>
                    <div className="text-xs text-gray-500">12-14 16:45</div>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-semibold text-gray-900">东北三省联赛</div>
                    <div className="text-sm text-gray-600">混合全能 · 亚布力雪场</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-green-600">已完成</div>
                    <div className="text-xs text-gray-500">12-13 15:20</div>
                  </div>
                </div>
              </div>
              <div className="mt-6 text-center">
                <Link href="/competitions" className="text-ski-blue hover:text-ski-blue/80 font-medium">
                  查看更多赛事 →
                </Link>
              </div>
            </div>

            {/* Top Athletes Rankings */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-ski-navy">积分排行榜</h3>
                <div className="text-sm text-gray-500">更新于: 12-15</div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center p-4 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg border border-yellow-200">
                  <div className="w-8 h-8 bg-yellow-500 text-white rounded-full flex items-center justify-center font-bold text-sm mr-4">1</div>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">张伟</div>
                    <div className="text-sm text-gray-600">男子大回转</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-ski-navy">0.00</div>
                    <div className="text-xs text-gray-500">中国积分</div>
                  </div>
                </div>
                <div className="flex items-center p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border border-gray-200">
                  <div className="w-8 h-8 bg-gray-400 text-white rounded-full flex items-center justify-center font-bold text-sm mr-4">2</div>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">李雪</div>
                    <div className="text-sm text-gray-600">女子回转</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-ski-navy">8.45</div>
                    <div className="text-xs text-gray-500">中国积分</div>
                  </div>
                </div>
                <div className="flex items-center p-4 bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg border border-orange-200">
                  <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-sm mr-4">3</div>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">王冰</div>
                    <div className="text-sm text-gray-600">女子大回转</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-ski-navy">12.30</div>
                    <div className="text-xs text-gray-500">中国积分</div>
                  </div>
                </div>
                <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center font-bold text-sm mr-4">4</div>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">刘强</div>
                    <div className="text-sm text-gray-600">男子回转</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-ski-navy">15.67</div>
                    <div className="text-xs text-gray-500">中国积分</div>
                  </div>
                </div>
              </div>
              <div className="mt-6 text-center">
                <Link href="/points/rankings" className="text-ski-blue hover:text-ski-blue/80 font-medium">
                  查看完整排名 →
                </Link>
              </div>
            </div>
            </div>
            </div>
          ) : (
            // 未登录用户看到的会员价值展示
            <div>
              {/* 会员价值提醒条 */}
              <div className="bg-gradient-to-r from-sky-100 to-blue-100 border border-sky-200 rounded-lg p-6 mb-8">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-sky-500 rounded-full flex items-center justify-center mr-4">
                      <Lock className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-sky-900 mb-1">
                        解锁所有专业功能
                      </h3>
                      <p className="text-sky-700 text-sm">
                        注册成为会员，享受完整的积分管理和赛事服务
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Link
                      href="/login"
                      className="px-4 py-2 border border-sky-300 text-sky-700 rounded-lg hover:bg-sky-50 transition-colors text-sm font-medium"
                    >
                      登录
                    </Link>
                    <Link
                      href="/register"
                      className="px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors text-sm font-medium"
                    >
                      免费注册
                    </Link>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* 积分系统 */}
              <div className="bg-white rounded-lg shadow-lg p-6 border-2 border-gray-200 hover:border-ski-blue/50 transition-colors relative">
                <div className="absolute top-4 right-4">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-blue-100 rounded-full">
                    <Calculator className="h-8 w-8 text-blue-600" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-ski-navy mb-3 text-center">积分系统</h3>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li>• 个人积分查询与历史追踪</li>
                  <li>• 实时积分排行榜</li>
                  <li>• 积分计算器工具</li>
                  <li>• 积分变化趋势分析</li>
                </ul>
                <div className="mt-6 text-center">
                  <Link
                    href="/register"
                    className="inline-flex items-center px-4 py-2 bg-ski-blue text-white rounded-lg hover:bg-ski-blue/90 transition-colors"
                  >
                    <LogIn className="h-4 w-4 mr-2" />
                    注册解锁
                  </Link>
                </div>
              </div>

              {/* 赛事管理 */}
              <div className="bg-white rounded-lg shadow-lg p-6 border-2 border-gray-200 hover:border-ski-blue/50 transition-colors relative">
                <div className="absolute top-4 right-4">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-green-100 rounded-full">
                    <Trophy className="h-8 w-8 text-green-600" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-ski-navy mb-3 text-center">赛事管理</h3>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li>• 查看比赛列表和赛事日程</li>
                  <li>• 在线报名参赛</li>
                  <li>• 实时成绩查看</li>
                  <li>• 赛事成绩通知</li>
                </ul>
                <div className="mt-6 text-center">
                  <Link
                    href="/register"
                    className="inline-flex items-center px-4 py-2 bg-ski-blue text-white rounded-lg hover:bg-ski-blue/90 transition-colors"
                  >
                    <LogIn className="h-4 w-4 mr-2" />
                    注册解锁
                  </Link>
                </div>
              </div>

              {/* 专业功能 */}
              <div className="bg-white rounded-lg shadow-lg p-6 border-2 border-gray-200 hover:border-ski-blue/50 transition-colors relative">
                <div className="absolute top-4 right-4">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-purple-100 rounded-full">
                    <Users className="h-8 w-8 text-purple-600" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-ski-navy mb-3 text-center">专业功能</h3>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li>• 个人运动员档案管理</li>
                  <li>• 积分规则详解</li>
                  <li>• 数据统计分析</li>
                  <li>• 技术支持服务</li>
                </ul>
                <div className="mt-6 text-center">
                  <Link
                    href="/register"
                    className="inline-flex items-center px-4 py-2 bg-ski-blue text-white rounded-lg hover:bg-ski-blue/90 transition-colors"
                  >
                    <LogIn className="h-4 w-4 mr-2" />
                    注册解锁
                  </Link>
                </div>
              </div>
            </div>
          )}

        </div>
      </section>

      {/* Features Section */}

      {/* About Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-ski-blue/10 to-blue-200/10 rounded-xl opacity-30"></div>
        <div className="absolute bottom-10 left-10 w-24 h-24 bg-gradient-to-br from-green-100/20 to-ski-blue/10 rounded-xl opacity-25"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
            <div>
              <h2 className="section-title">关于平台</h2>
              <div className="space-y-6 text-gray-600">
                <p>
                  Alpine Skiing China(中国高山滑雪积分管理平台)是基于中国滑雪协会标准打造的专业竞赛管理平台。
                  采用符合中国标准的积分计算算法，为中国高山滑雪竞赛提供权威、准确的数据管理和积分计算服务。
                </p>
                <p>
                  我们致力于推动中国滑雪运动的数字化、标准化发展，为运动员、教练员、赛事组织者、竞赛裁判
                  提供现代化的数据管理、积分计算、成绩统计工具，全面提升中国高山滑雪运动的组织水平和竞技水平。
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
                  <div className="border-l-4 border-ski-blue pl-4">
                    <div className="font-semibold text-ski-navy">中国标准算法</div>
                    <div className="text-sm">采用中国积分计算规则</div>
                  </div>
                  <div className="border-l-4 border-green-500 pl-4">
                    <div className="font-semibold text-ski-navy">实时同步</div>
                    <div className="text-sm">14天积分周期更新</div>
                  </div>
                  <div className="border-l-4 border-purple-500 pl-4">
                    <div className="font-semibold text-ski-navy">权威数据</div>
                    <div className="text-sm">国家级赛事数据管理</div>
                  </div>
                  <div className="border-l-4 border-orange-500 pl-4">
                    <div className="font-semibold text-ski-navy">全面覆盖</div>
                    <div className="text-sm">支持高山滑雪全部项目</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-10 lg:mt-0 relative">
              <div className="bg-gradient-to-br from-ski-blue to-primary-700 rounded-lg p-8 text-white relative overflow-hidden">
                <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-white/10 rounded-2xl opacity-30"></div>
                <h3 className="text-2xl font-bold mb-6">系统特色</h3>
                <ul className="space-y-4">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-300 mr-3 flex-shrink-0" />
                    <span>采用中国积分计算标准</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-300 mr-3 flex-shrink-0" />
                    <span>支持回转、大回转、超大、滑降、全能项目</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-300 mr-3 flex-shrink-0" />
                    <span>运动员历史成绩追踪管理</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-300 mr-3 flex-shrink-0" />
                    <span>赛事日程管理和在线报名</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-300 mr-3 flex-shrink-0" />
                    <span>积分排行榜和数据可视化分析</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-300 mr-3 flex-shrink-0" />
                    <span>Web端和移动端全平台适配</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}