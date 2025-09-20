'use client'

import { useState, useEffect } from 'react'
import { getImagePath } from '@/utils/paths'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  User,
  Award,
  Calendar,
  TrendingUp,
  TrendingDown,
  Trophy,
  Target,
  Clock,
  MapPin,
  Medal,
  Activity,
  BarChart3,
  Users,
  Flag,
  Star
} from 'lucide-react'

interface UserSession {
  id: string
  email: string
  name: string
  role: string
  fisCode: string
  loginTime: string
}

interface AthleteStats {
  currentPoints: number
  bestPoints: number
  rankingChange: number
  recentRaces: number
  bestResult: string
  disciplines: string[]
}

interface RecentResult {
  id: string
  competition: string
  discipline: string
  date: string
  rank: number
  time: string
  points: number
  location: string
}

interface UpcomingRace {
  id: string
  name: string
  discipline: string
  date: string
  location: string
  status: 'registered' | 'pending' | 'closed'
}

export default function AthleteDashboard() {
  const router = useRouter()
  const [user, setUser] = useState<UserSession | null>(null)
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState<AthleteStats>({
    currentPoints: 45.67,
    bestPoints: 35.42,
    rankingChange: -5,
    recentRaces: 8,
    bestResult: '第3名',
    disciplines: ['SL', 'GS', 'SG']
  })

  const [recentResults] = useState<RecentResult[]>([
    {
      id: '1',
      competition: '2024年全国高山滑雪锦标赛',
      discipline: 'SL',
      date: '2024-02-15',
      rank: 3,
      time: '1:45.67',
      points: 35.42,
      location: '长白山'
    },
    {
      id: '2',
      competition: '2024年亚洲杯高山滑雪赛',
      discipline: 'GS',
      date: '2024-02-01',
      rank: 8,
      time: '2:15.89',
      points: 52.18,
      location: '日本志贺高原'
    },
    {
      id: '3',
      competition: '2024年FIS积分赛',
      discipline: 'SG',
      date: '2024-01-20',
      rank: 12,
      time: '1:28.34',
      points: 68.95,
      location: '崇礼'
    }
  ])

  const [upcomingRaces] = useState<UpcomingRace[]>([
    {
      id: '1',
      name: '2024年世界杯高山滑雪赛',
      discipline: 'SL',
      date: '2024-03-15',
      location: '奥地利因斯布鲁克',
      status: 'registered'
    },
    {
      id: '2',
      name: '2024年全国春季锦标赛',
      discipline: 'GS',
      date: '2024-03-25',
      location: '崇礼',
      status: 'pending'
    },
    {
      id: '3',
      name: '2024年亚洲锦标赛',
      discipline: 'SG',
      date: '2024-04-08',
      location: '韩国龙平',
      status: 'closed'
    }
  ])

  useEffect(() => {
    // 检查用户登录状态
    const userSession = localStorage.getItem('ski_user_session')
    if (!userSession) {
      router.push('/auth/login')
      return
    }

    try {
      const userData = JSON.parse(userSession)
      if (userData.role !== 'athlete') {
        router.push('/auth/login')
        return
      }
      setUser(userData)
    } catch (error) {
      router.push('/auth/login')
      return
    }

    setLoading(false)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('ski_user_session')
    router.push('/auth/login')
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'registered': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'closed': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'registered': return '已报名'
      case 'pending': return '待审核'
      case 'closed': return '已截止'
      default: return status
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-ski-blue"></div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 头部导航 */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="text-xl font-bold text-ski-navy">
                Alpine Ski Points
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">欢迎，{user.name}</span>
              <button
                onClick={handleLogout}
                className="text-gray-500 hover:text-ski-blue"
              >
                退出登录
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 主内容 */}
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* 用户信息卡片 */}
        <div className="bg-gradient-to-r from-ski-blue to-ski-navy rounded-lg p-6 mb-8 text-white">
          <div className="flex items-center space-x-4">
            <div className="bg-white/20 rounded-full p-3">
              <User className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">{user.name}</h1>
              <p className="text-blue-100">FIS编号: {user.fisCode}</p>
              <div className="flex items-center space-x-4 mt-2">
                <span className="text-blue-100">运动员</span>
                <span className="text-blue-100">•</span>
                <span className="text-blue-100">专项: {stats.disciplines.join(', ')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* 统计卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Award className="h-8 w-8 text-ski-blue" />
              </div>
              <div className="ml-5">
                <p className="text-sm font-medium text-gray-500">当前积分</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.currentPoints}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Star className="h-8 w-8 text-yellow-500" />
              </div>
              <div className="ml-5">
                <p className="text-sm font-medium text-gray-500">最佳积分</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.bestPoints}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                {stats.rankingChange >= 0 ? (
                  <TrendingUp className="h-8 w-8 text-green-500" />
                ) : (
                  <TrendingDown className="h-8 w-8 text-red-500" />
                )}
              </div>
              <div className="ml-5">
                <p className="text-sm font-medium text-gray-500">排名变化</p>
                <p className={`text-2xl font-semibold ${
                  stats.rankingChange >= 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stats.rankingChange >= 0 ? '+' : ''}{stats.rankingChange}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Trophy className="h-8 w-8 text-amber-500" />
              </div>
              <div className="ml-5">
                <p className="text-sm font-medium text-gray-500">最佳成绩</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.bestResult}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 近期成绩 */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 flex items-center">
                <Activity className="h-5 w-5 text-ski-blue mr-2" />
                近期成绩
              </h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentResults.map((result) => (
                  <div key={result.id} className="flex items-center justify-between border-l-4 border-ski-blue pl-4 py-2">
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{result.competition}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                        <span className="flex items-center">
                          <Flag className="h-3 w-3 mr-1" />
                          {result.discipline}
                        </span>
                        <span className="flex items-center">
                          <MapPin className="h-3 w-3 mr-1" />
                          {result.location}
                        </span>
                        <span className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {result.date}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        result.rank <= 3 ? 'bg-yellow-100 text-yellow-800' :
                        result.rank <= 10 ? 'bg-green-100 text-green-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        <Medal className="h-3 w-3 mr-1" />
                        第{result.rank}名
                      </div>
                      <p className="text-sm text-gray-500 mt-1">{result.points}分</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 即将到来的比赛 */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 flex items-center">
                <Calendar className="h-5 w-5 text-ski-blue mr-2" />
                即将到来的比赛
              </h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {upcomingRaces.map((race) => (
                  <div key={race.id} className="border rounded-lg p-4 hover:bg-gray-50">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900">{race.name}</h4>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(race.status)}`}>
                        {getStatusText(race.status)}
                      </span>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span className="flex items-center">
                        <Flag className="h-3 w-3 mr-1" />
                        {race.discipline}
                      </span>
                      <span className="flex items-center">
                        <MapPin className="h-3 w-3 mr-1" />
                        {race.location}
                      </span>
                      <span className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {race.date}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 快捷操作 */}
        <div className="mt-8">
          <h3 className="text-lg font-medium text-gray-900 mb-4">快捷操作</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              href="/registration/online"
              className="flex items-center p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
            >
              <Target className="h-8 w-8 text-ski-blue mr-3" />
              <div>
                <p className="font-medium text-gray-900">报名比赛</p>
                <p className="text-sm text-gray-500">参加新的比赛</p>
              </div>
            </Link>

            <Link
              href="/points/rankings"
              className="flex items-center p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
            >
              <BarChart3 className="h-8 w-8 text-ski-blue mr-3" />
              <div>
                <p className="font-medium text-gray-900">积分排名</p>
                <p className="text-sm text-gray-500">查看排名情况</p>
              </div>
            </Link>

            <Link
              href="/athletes/history"
              className="flex items-center p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
            >
              <Activity className="h-8 w-8 text-ski-blue mr-3" />
              <div>
                <p className="font-medium text-gray-900">历史成绩</p>
                <p className="text-sm text-gray-500">查看详细记录</p>
              </div>
            </Link>

            <Link
              href="/results-query"
              className="flex items-center p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
            >
              <Users className="h-8 w-8 text-ski-blue mr-3" />
              <div>
                <p className="font-medium text-gray-900">成绩查询</p>
                <p className="text-sm text-gray-500">查询比赛结果</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}