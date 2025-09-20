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
  PinOff
} from 'lucide-react'
import { getImagePath } from '@/utils/paths'

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

// 积分趋势数据 (示例)
const pointsTrendData = [
  { month: '10月', points: 85.2 },
  { month: '11月', points: 82.1 },
  { month: '12月', points: 78.9 },
  { month: '1月', points: 75.3 },
  { month: '2月', points: 72.8 },
  { month: '3月', points: 70.4 }
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
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

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
            <h2 className="text-2xl md:text-3xl font-bold text-ski-navy mb-4">最新赛事成绩</h2>
            <p className="text-gray-600 text-sm md:text-base">实时更新的竞赛结果和积分排名</p>
          </div>
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

          {/* 积分趋势图表 */}
          <div className="mt-8">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-ski-navy">积分趋势</h3>
                <div className="text-sm text-gray-500">最近6个月</div>
              </div>

              {/* 简单的SVG趋势图 */}
              <div className="h-48 w-full">
                <svg viewBox="0 0 600 200" className="w-full h-full">
                  {/* 背景网格 */}
                  <defs>
                    <pattern id="grid" width="60" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 60 0 L 0 0 0 40" fill="none" stroke="#f3f4f6" strokeWidth="1"/>
                    </pattern>
                  </defs>
                  <rect width="600" height="200" fill="url(#grid)" />

                  {/* Y轴标签 */}
                  <text x="10" y="20" className="text-xs fill-gray-500">90</text>
                  <text x="10" y="60" className="text-xs fill-gray-500">80</text>
                  <text x="10" y="100" className="text-xs fill-gray-500">70</text>
                  <text x="10" y="140" className="text-xs fill-gray-500">60</text>
                  <text x="10" y="180" className="text-xs fill-gray-500">50</text>

                  {/* 趋势线 */}
                  <polyline
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="3"
                    points="60,60 160,75 260,95 360,115 460,130 560,145"
                  />

                  {/* 数据点 */}
                  {pointsTrendData.map((point, index) => (
                    <g key={index}>
                      <circle
                        cx={60 + index * 100}
                        cy={200 - (point.points - 50) * 3}
                        r="4"
                        fill="#3b82f6"
                        className="hover:r-6 transition-all cursor-pointer"
                      />
                      <text
                        x={60 + index * 100}
                        y={195}
                        textAnchor="middle"
                        className="text-xs fill-gray-600"
                      >
                        {point.month}
                      </text>
                    </g>
                  ))}

                  {/* 渐变填充 */}
                  <defs>
                    <linearGradient id="trendGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" style={{stopColor:'#3b82f6', stopOpacity:0.2}} />
                      <stop offset="100%" style={{stopColor:'#3b82f6', stopOpacity:0}} />
                    </linearGradient>
                  </defs>
                  <polygon
                    fill="url(#trendGradient)"
                    points="60,60 160,75 260,95 360,115 460,130 560,145 560,200 60,200"
                  />
                </svg>
              </div>

              <div className="mt-4 flex justify-between items-center text-sm text-gray-600">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                  <span>平均积分</span>
                </div>
                <div className="text-green-600 font-medium">
                  ↓ 14.8 分 (本季度改善)
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50 relative overflow-hidden">
        {/* 背景装饰元素 - 简化设计，去除圆形图片 */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-ski-blue/10 rounded-lg opacity-50"></div>
        <div className="absolute bottom-20 right-20 w-16 h-16 bg-sky-blue/10 rounded-lg opacity-40"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-blue-200/10 rounded-lg opacity-30"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="section-title">核心功能</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              基于中国滑雪协会标准的完整滑雪竞赛管理解决方案，从积分计算、运动员管理到赛事组织，
              覆盖高山滑雪运动的所有核心环节，为中国滑雪运动数字化发展提供强有力支持
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`card group hover:scale-105 transform transition-all duration-300 relative overflow-hidden ${
                  feature.status === 'coming-soon' ? 'card-disabled' : ''
                }`}
              >
                {/* 卡片装饰元素 - 简化为颜色块 */}
                <div className={`absolute top-0 right-0 w-8 h-8 rounded-lg opacity-20 ${
                  index % 4 === 0 ? 'bg-blue-500' :
                  index % 4 === 1 ? 'bg-green-500' :
                  index % 4 === 2 ? 'bg-purple-500' :
                  'bg-orange-500'
                }`}></div>

                <div className="flex items-center mb-4 relative z-10">
                  <div className={`p-3 rounded-lg bg-gradient-to-r ${
                    index % 4 === 0 ? 'from-blue-50 to-blue-100 border border-blue-200' :
                    index % 4 === 1 ? 'from-green-50 to-green-100 border border-green-200' :
                    index % 4 === 2 ? 'from-purple-50 to-purple-100 border border-purple-200' :
                    'from-orange-50 to-orange-100 border border-orange-200'
                  } ${feature.color} animate-float`}
                  style={{animationDelay: `${index * 0.2}s`}}>
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <div className="ml-4 flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {feature.title}
                    </h3>
                    {feature.status === 'coming-soon' && (
                      <span className="badge badge-coming-soon">即将上线</span>
                    )}
                    {feature.status === 'active' && (
                      <span className="badge badge-active animate-pulse">已上线</span>
                    )}
                  </div>
                </div>
                <p className="text-gray-600 mb-4 relative z-10">{feature.description}</p>
                {feature.status === 'active' ? (
                  <Link
                    href={feature.href}
                    className="inline-flex items-center text-ski-blue hover:text-primary-700 font-medium group-hover:translate-x-1 transition-transform duration-200 relative z-10"
                  >
                    立即使用
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                ) : (
                  <div className="text-gray-400 font-medium relative z-10">
                    敬请期待
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

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

      {/* Quick Links Section */}
      <section className="py-16 bg-gradient-to-br from-ski-blue to-primary-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">快速链接</h2>
            <p className="text-xl text-blue-100">快速访问系统核心功能</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {/* 积分查询 */}
            <div className="text-center">
              <Link
                href="/points/fis"
                className="block group"
              >
                <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 mb-4 hover:bg-white/30 transition-all duration-300 border border-white/20">
                  <Calculator className="h-10 w-10 text-white mx-auto mb-3" />
                  <h3 className="text-white font-semibold text-lg mb-2">积分查询</h3>
                  <p className="text-blue-100 text-sm">查看中国积分排名</p>
                </div>
                <div className="space-y-2">
                  <Link href="/points/fis" className="block text-blue-100 hover:text-white text-sm transition-colors">
                    • 中国积分查询
                  </Link>
                  <Link href="/points/rankings" className="block text-blue-100 hover:text-white text-sm transition-colors">
                    • 积分排行榜
                  </Link>
                  <Link href="/points/calculator" className="block text-blue-100 hover:text-white text-sm transition-colors">
                    • 积分计算器
                  </Link>
                </div>
              </Link>
            </div>

            {/* 运动员管理 */}
            <div className="text-center">
              <Link
                href="/athletes"
                className="block group"
              >
                <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 mb-4 hover:bg-white/30 transition-all duration-300 border border-white/20">
                  <Users className="h-10 w-10 text-white mx-auto mb-3" />
                  <h3 className="text-white font-semibold text-lg mb-2">运动员</h3>
                  <p className="text-blue-100 text-sm">运动员信息管理</p>
                </div>
                <div className="space-y-2">
                  <Link href="/athletes" className="block text-blue-100 hover:text-white text-sm transition-colors">
                    • 运动员档案
                  </Link>
                  <Link href="/athletes/rankings" className="block text-blue-100 hover:text-white text-sm transition-colors">
                    • 成绩排名
                  </Link>
                  <Link href="/athletes/history" className="block text-blue-100 hover:text-white text-sm transition-colors">
                    • 历史记录
                  </Link>
                </div>
              </Link>
            </div>

            {/* 比赛管理 */}
            <div className="text-center">
              <Link
                href="/competitions"
                className="block group"
              >
                <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 mb-4 hover:bg-white/30 transition-all duration-300 border border-white/20">
                  <Trophy className="h-10 w-10 text-white mx-auto mb-3" />
                  <h3 className="text-white font-semibold text-lg mb-2">比赛管理</h3>
                  <p className="text-blue-100 text-sm">竞赛信息管理</p>
                </div>
                <div className="space-y-2">
                  <Link href="/competitions" className="block text-blue-100 hover:text-white text-sm transition-colors">
                    • 比赛列表
                  </Link>
                  <Link href="/results-import" className="block text-blue-100 hover:text-white text-sm transition-colors">
                    • 成绩导入
                  </Link>
                  <Link href="/results-announcement" className="block text-blue-100 hover:text-white text-sm transition-colors">
                    • 成绩发布
                  </Link>
                </div>
              </Link>
            </div>

            {/* 系统工具 */}
            <div className="text-center">
              <Link
                href="/rules"
                className="block group"
              >
                <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 mb-4 hover:bg-white/30 transition-all duration-300 border border-white/20">
                  <FileText className="h-10 w-10 text-white mx-auto mb-3" />
                  <h3 className="text-white font-semibold text-lg mb-2">系统工具</h3>
                  <p className="text-blue-100 text-sm">规则和文档</p>
                </div>
                <div className="space-y-2">
                  <Link href="/rules/points" className="block text-blue-100 hover:text-white text-sm transition-colors">
                    • 积分规则
                  </Link>
                  <Link href="/registration" className="block text-blue-100 hover:text-white text-sm transition-colors">
                    • 在线报名
                  </Link>
                  <Link href="/results-query" className="block text-blue-100 hover:text-white text-sm transition-colors">
                    • 成绩查询
                  </Link>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}