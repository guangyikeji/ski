'use client'

import { useState, useEffect } from 'react'
import { getImagePath } from '@/utils/paths'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  User,
  Users,
  Calendar,
  Trophy,
  Target,
  Clock,
  MapPin,
  Medal,
  Activity,
  BarChart3,
  FileText,
  Plus,
  TrendingUp,
  UserCheck,
  Award,
  BookOpen,
  Settings
} from 'lucide-react'

interface UserSession {
  id: string
  email: string
  name: string
  role: string
  fisCode: string
  loginTime: string
}

interface CoachStats {
  totalAthletes: number
  activeAthletes: number
  upcomingRaces: number
  recentAchievements: number
  teamAveragePoints: number
  improvementRate: number
}

interface AthleteOverview {
  id: string
  name: string
  fisCode: string
  currentPoints: number
  lastRaceDate: string
  lastRaceResult: string
  status: 'active' | 'injured' | 'inactive'
  specialty: string[]
}

interface TeamEvent {
  id: string
  type: 'race' | 'training' | 'meeting'
  title: string
  date: string
  location: string
  athletes: number
  status: 'scheduled' | 'completed' | 'cancelled'
}

export default function CoachDashboard() {
  const router = useRouter()
  const [user, setUser] = useState<UserSession | null>(null)
  const [loading, setLoading] = useState(true)
  const [stats] = useState<CoachStats>({
    totalAthletes: 12,
    activeAthletes: 10,
    upcomingRaces: 5,
    recentAchievements: 3,
    teamAveragePoints: 58.34,
    improvementRate: 15.2
  })

  const [athletes] = useState<AthleteOverview[]>([
    {
      id: '1',
      name: '张伟',
      fisCode: '125001',
      currentPoints: 45.67,
      lastRaceDate: '2024-02-15',
      lastRaceResult: '第3名',
      status: 'active',
      specialty: ['SL', 'GS']
    },
    {
      id: '2',
      name: '李芳',
      fisCode: '125002',
      currentPoints: 52.18,
      lastRaceDate: '2024-02-12',
      lastRaceResult: '第8名',
      status: 'active',
      specialty: ['GS', 'SG']
    },
    {
      id: '3',
      name: '王磊',
      fisCode: '125003',
      currentPoints: 68.95,
      lastRaceDate: '2024-01-28',
      lastRaceResult: '第12名',
      status: 'injured',
      specialty: ['DH', 'SG']
    },
    {
      id: '4',
      name: '陈晨',
      fisCode: '125004',
      currentPoints: 39.42,
      lastRaceDate: '2024-02-18',
      lastRaceResult: '第2名',
      status: 'active',
      specialty: ['SL']
    }
  ])

  const [teamEvents] = useState<TeamEvent[]>([
    {
      id: '1',
      type: 'race',
      title: '2024年世界杯预选赛',
      date: '2024-03-15',
      location: '崇礼',
      athletes: 6,
      status: 'scheduled'
    },
    {
      id: '2',
      type: 'training',
      title: '技术训练营',
      date: '2024-03-08',
      location: '长白山训练基地',
      athletes: 10,
      status: 'scheduled'
    },
    {
      id: '3',
      type: 'meeting',
      title: '战术分析会议',
      date: '2024-03-01',
      location: '北京体育大学',
      athletes: 12,
      status: 'completed'
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
      if (userData.role !== 'coach') {
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
      case 'active': return 'bg-green-100 text-green-800'
      case 'injured': return 'bg-red-100 text-red-800'
      case 'inactive': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return '活跃'
      case 'injured': return '伤病'
      case 'inactive': return '休息'
      default: return status
    }
  }

  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case 'race': return <Trophy className="h-4 w-4" />
      case 'training': return <Target className="h-4 w-4" />
      case 'meeting': return <Users className="h-4 w-4" />
      default: return <Calendar className="h-4 w-4" />
    }
  }

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'race': return 'text-yellow-600'
      case 'training': return 'text-blue-600'
      case 'meeting': return 'text-purple-600'
      default: return 'text-gray-600'
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
              <span className="text-gray-700">欢迎，{user.name} 教练</span>
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
        <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg p-6 mb-8 text-white">
          <div className="flex items-center space-x-4">
            <div className="bg-white/20 rounded-full p-3">
              <BookOpen className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">{user.name}</h1>
              <p className="text-emerald-100">教练员 • FIS编号: {user.fisCode}</p>
              <div className="flex items-center space-x-4 mt-2">
                <span className="text-emerald-100">队伍管理</span>
                <span className="text-emerald-100">•</span>
                <span className="text-emerald-100">技术指导</span>
              </div>
            </div>
          </div>
        </div>

        {/* 统计卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Users className="h-8 w-8 text-emerald-500" />
              </div>
              <div className="ml-5">
                <p className="text-sm font-medium text-gray-500">管理运动员</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.totalAthletes}</p>
                <p className="text-xs text-green-600">{stats.activeAthletes} 人活跃</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Calendar className="h-8 w-8 text-blue-500" />
              </div>
              <div className="ml-5">
                <p className="text-sm font-medium text-gray-500">即将比赛</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.upcomingRaces}</p>
                <p className="text-xs text-blue-600">本月安排</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Award className="h-8 w-8 text-yellow-500" />
              </div>
              <div className="ml-5">
                <p className="text-sm font-medium text-gray-500">团队平均积分</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.teamAveragePoints}</p>
                <p className="text-xs text-yellow-600">较上月提升</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <TrendingUp className="h-8 w-8 text-green-500" />
              </div>
              <div className="ml-5">
                <p className="text-sm font-medium text-gray-500">进步率</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.improvementRate}%</p>
                <p className="text-xs text-green-600">较上月</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 运动员管理 */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900 flex items-center">
                <UserCheck className="h-5 w-5 text-emerald-500 mr-2" />
                运动员管理
              </h3>
              <Link
                href="/coach/athletes"
                className="text-emerald-600 hover:text-emerald-700 text-sm"
              >
                查看全部
              </Link>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {athletes.map((athlete) => (
                  <div key={athlete.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                    <div className="flex items-center space-x-3">
                      <div className="bg-emerald-100 rounded-full p-2">
                        <User className="h-4 w-4 text-emerald-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{athlete.name}</p>
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          <span>{athlete.fisCode}</span>
                          <span>•</span>
                          <span>{athlete.specialty.join(', ')}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(athlete.status)}`}>
                        {getStatusText(athlete.status)}
                      </span>
                      <p className="text-sm text-gray-500 mt-1">{athlete.currentPoints}分</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 团队活动 */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900 flex items-center">
                <Activity className="h-5 w-5 text-emerald-500 mr-2" />
                团队活动
              </h3>
              <button className="text-emerald-600 hover:text-emerald-700 text-sm flex items-center">
                <Plus className="h-4 w-4 mr-1" />
                添加活动
              </button>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {teamEvents.map((event) => (
                  <div key={event.id} className="border-l-4 border-emerald-400 pl-4 py-2">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span className={getEventTypeColor(event.type)}>
                          {getEventTypeIcon(event.type)}
                        </span>
                        <h4 className="font-medium text-gray-900">{event.title}</h4>
                      </div>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        event.status === 'scheduled' ? 'bg-blue-100 text-blue-800' :
                        event.status === 'completed' ? 'bg-green-100 text-green-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {event.status === 'scheduled' ? '计划中' :
                         event.status === 'completed' ? '已完成' : '已取消'}
                      </span>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span className="flex items-center">
                        <MapPin className="h-3 w-3 mr-1" />
                        {event.location}
                      </span>
                      <span className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {event.date}
                      </span>
                      <span className="flex items-center">
                        <Users className="h-3 w-3 mr-1" />
                        {event.athletes} 人参与
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
          <h3 className="text-lg font-medium text-gray-900 mb-4">教练工具</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              href="/registration/manage"
              className="flex items-center p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
            >
              <Target className="h-8 w-8 text-emerald-500 mr-3" />
              <div>
                <p className="font-medium text-gray-900">报名管理</p>
                <p className="text-sm text-gray-500">管理队员报名</p>
              </div>
            </Link>

            <Link
              href="/results-import"
              className="flex items-center p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
            >
              <FileText className="h-8 w-8 text-emerald-500 mr-3" />
              <div>
                <p className="font-medium text-gray-900">成绩导入</p>
                <p className="text-sm text-gray-500">导入比赛成绩</p>
              </div>
            </Link>

            <Link
              href="/athletes/rankings"
              className="flex items-center p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
            >
              <BarChart3 className="h-8 w-8 text-emerald-500 mr-3" />
              <div>
                <p className="font-medium text-gray-900">排名分析</p>
                <p className="text-sm text-gray-500">队员排名变化</p>
              </div>
            </Link>

            <Link
              href="/competitions/stats"
              className="flex items-center p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
            >
              <Settings className="h-8 w-8 text-emerald-500 mr-3" />
              <div>
                <p className="font-medium text-gray-900">赛事统计</p>
                <p className="text-sm text-gray-500">团队数据分析</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}