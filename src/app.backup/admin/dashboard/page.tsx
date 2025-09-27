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
  Activity,
  BarChart3,
  FileText,
  Settings,
  Shield,
  Database,
  Globe,
  TrendingUp,
  UserCheck,
  Award,
  AlertTriangle,
  CheckCircle,
  Clock,
  Target,
  Monitor,
  Zap
} from 'lucide-react'

interface UserSession {
  id: string
  email: string
  name: string
  role: string
  fisCode: string
  loginTime: string
}

interface SystemStats {
  totalUsers: number
  activeUsers: number
  totalCompetitions: number
  pendingApprovals: number
  systemUptime: number
  dataProcessed: number
  recentAlerts: number
  successRate: number
}

interface RecentActivity {
  id: string
  type: 'user_registration' | 'competition_created' | 'result_uploaded' | 'system_update'
  description: string
  timestamp: string
  user?: string
  status: 'success' | 'warning' | 'error'
}

interface SystemAlert {
  id: string
  type: 'info' | 'warning' | 'error'
  title: string
  message: string
  timestamp: string
  resolved: boolean
}

export default function AdminDashboard() {
  const router = useRouter()
  const [user, setUser] = useState<UserSession | null>(null)
  const [loading, setLoading] = useState(true)
  const [stats] = useState<SystemStats>({
    totalUsers: 1247,
    activeUsers: 863,
    totalCompetitions: 156,
    pendingApprovals: 12,
    systemUptime: 99.8,
    dataProcessed: 45782,
    recentAlerts: 3,
    successRate: 98.5
  })

  const [recentActivities] = useState<RecentActivity[]>([
    {
      id: '1',
      type: 'user_registration',
      description: '新用户注册: 李明 (运动员)',
      timestamp: '2024-02-20 14:30',
      user: '李明',
      status: 'success'
    },
    {
      id: '2',
      type: 'competition_created',
      description: '创建比赛: 2024年春季锦标赛',
      timestamp: '2024-02-20 10:15',
      user: '张教练',
      status: 'success'
    },
    {
      id: '3',
      type: 'result_uploaded',
      description: '成绩导入: 全国高山滑雪锦标赛',
      timestamp: '2024-02-19 16:45',
      user: '王管理员',
      status: 'warning'
    },
    {
      id: '4',
      type: 'system_update',
      description: '系统维护: 积分计算算法更新',
      timestamp: '2024-02-19 02:00',
      status: 'success'
    }
  ])

  const [systemAlerts] = useState<SystemAlert[]>([
    {
      id: '1',
      type: 'warning',
      title: '数据备份提醒',
      message: '建议执行定期数据备份操作',
      timestamp: '2024-02-20 08:00',
      resolved: false
    },
    {
      id: '2',
      type: 'info',
      title: 'v4.0规则更新',
      message: '中国滑雪协会发布新的积分计算规则',
      timestamp: '2024-02-19 14:20',
      resolved: false
    },
    {
      id: '3',
      type: 'error',
      title: '数据同步异常',
      message: '部分比赛数据同步失败，需要手动处理',
      timestamp: '2024-02-18 22:15',
      resolved: true
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
      if (userData.role !== 'admin') {
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

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'user_registration': return <UserCheck className="h-4 w-4" />
      case 'competition_created': return <Trophy className="h-4 w-4" />
      case 'result_uploaded': return <FileText className="h-4 w-4" />
      case 'system_update': return <Settings className="h-4 w-4" />
      default: return <Activity className="h-4 w-4" />
    }
  }

  const getActivityColor = (status: string) => {
    switch (status) {
      case 'success': return 'text-green-600'
      case 'warning': return 'text-yellow-600'
      case 'error': return 'text-red-600'
      default: return 'text-gray-600'
    }
  }

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'info': return <CheckCircle className="h-4 w-4 text-blue-500" />
      case 'warning': return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      case 'error': return <AlertTriangle className="h-4 w-4 text-red-500" />
      default: return <CheckCircle className="h-4 w-4 text-gray-500" />
    }
  }

  const getAlertBorderColor = (type: string) => {
    switch (type) {
      case 'info': return 'border-blue-200'
      case 'warning': return 'border-yellow-200'
      case 'error': return 'border-red-200'
      default: return 'border-gray-200'
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
              <span className="text-gray-700">管理员：{user.name}</span>
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
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg p-6 mb-8 text-white">
          <div className="flex items-center space-x-4">
            <div className="bg-white/20 rounded-full p-3">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">{user.name}</h1>
              <p className="text-purple-100">系统管理员 • FIS编号: {user.fisCode}</p>
              <div className="flex items-center space-x-4 mt-2">
                <span className="text-purple-100">系统监控</span>
                <span className="text-purple-100">•</span>
                <span className="text-purple-100">数据管理</span>
              </div>
            </div>
          </div>
        </div>

        {/* 统计卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Users className="h-8 w-8 text-purple-500" />
              </div>
              <div className="ml-5">
                <p className="text-sm font-medium text-gray-500">注册用户</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.totalUsers.toLocaleString()}</p>
                <p className="text-xs text-green-600">{stats.activeUsers} 活跃用户</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Trophy className="h-8 w-8 text-yellow-500" />
              </div>
              <div className="ml-5">
                <p className="text-sm font-medium text-gray-500">总比赛数</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.totalCompetitions}</p>
                <p className="text-xs text-yellow-600">{stats.pendingApprovals} 待审批</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Monitor className="h-8 w-8 text-green-500" />
              </div>
              <div className="ml-5">
                <p className="text-sm font-medium text-gray-500">系统运行时间</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.systemUptime}%</p>
                <p className="text-xs text-green-600">稳定运行</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Database className="h-8 w-8 text-blue-500" />
              </div>
              <div className="ml-5">
                <p className="text-sm font-medium text-gray-500">数据处理量</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.dataProcessed.toLocaleString()}</p>
                <p className="text-xs text-blue-600">本月</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 系统活动 */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 flex items-center">
                <Activity className="h-5 w-5 text-purple-500 mr-2" />
                系统活动
              </h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <div className={`flex-shrink-0 p-1 ${getActivityColor(activity.status)}`}>
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">
                        {activity.description}
                      </p>
                      <div className="flex items-center space-x-2 text-xs text-gray-500 mt-1">
                        <Clock className="h-3 w-3" />
                        <span>{activity.timestamp}</span>
                        {activity.user && (
                          <>
                            <span>•</span>
                            <span>{activity.user}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 系统告警 */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900 flex items-center">
                <AlertTriangle className="h-5 w-5 text-purple-500 mr-2" />
                系统告警
              </h3>
              <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                {systemAlerts.filter(alert => !alert.resolved).length} 待处理
              </span>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {systemAlerts.map((alert) => (
                  <div key={alert.id} className={`border-l-4 ${getAlertBorderColor(alert.type)} pl-4 py-2 ${alert.resolved ? 'opacity-50' : ''}`}>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-2">
                        {getAlertIcon(alert.type)}
                        <div>
                          <h4 className="font-medium text-gray-900">{alert.title}</h4>
                          <p className="text-sm text-gray-600 mt-1">{alert.message}</p>
                          <p className="text-xs text-gray-500 mt-2">{alert.timestamp}</p>
                        </div>
                      </div>
                      {alert.resolved && (
                        <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded">
                          已解决
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 管理工具 */}
        <div className="mt-8">
          <h3 className="text-lg font-medium text-gray-900 mb-4">管理工具</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              href="/admin/users"
              className="flex items-center p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
            >
              <Users className="h-8 w-8 text-purple-500 mr-3" />
              <div>
                <p className="font-medium text-gray-900">用户管理</p>
                <p className="text-sm text-gray-500">管理系统用户</p>
              </div>
            </Link>

            <Link
              href="/admin/competitions"
              className="flex items-center p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
            >
              <Trophy className="h-8 w-8 text-purple-500 mr-3" />
              <div>
                <p className="font-medium text-gray-900">比赛管理</p>
                <p className="text-sm text-gray-500">审批和管理比赛</p>
              </div>
            </Link>

            <Link
              href="/admin/data"
              className="flex items-center p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
            >
              <Database className="h-8 w-8 text-purple-500 mr-3" />
              <div>
                <p className="font-medium text-gray-900">数据管理</p>
                <p className="text-sm text-gray-500">备份和同步</p>
              </div>
            </Link>

            <Link
              href="/admin/settings"
              className="flex items-center p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
            >
              <Settings className="h-8 w-8 text-purple-500 mr-3" />
              <div>
                <p className="font-medium text-gray-900">系统设置</p>
                <p className="text-sm text-gray-500">配置系统参数</p>
              </div>
            </Link>

            <Link
              href="/admin/reports"
              className="flex items-center p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
            >
              <BarChart3 className="h-8 w-8 text-purple-500 mr-3" />
              <div>
                <p className="font-medium text-gray-900">报表中心</p>
                <p className="text-sm text-gray-500">生成统计报告</p>
              </div>
            </Link>

            <Link
              href="/admin/monitoring"
              className="flex items-center p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
            >
              <Monitor className="h-8 w-8 text-purple-500 mr-3" />
              <div>
                <p className="font-medium text-gray-900">系统监控</p>
                <p className="text-sm text-gray-500">性能监控</p>
              </div>
            </Link>

            <Link
              href="/admin/fis-sync"
              className="flex items-center p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
            >
              <Globe className="h-8 w-8 text-purple-500 mr-3" />
              <div>
                <p className="font-medium text-gray-900">FIS同步</p>
                <p className="text-sm text-gray-500">国际数据同步</p>
              </div>
            </Link>

            <Link
              href="/admin/audit"
              className="flex items-center p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
            >
              <Shield className="h-8 w-8 text-purple-500 mr-3" />
              <div>
                <p className="font-medium text-gray-900">审计日志</p>
                <p className="text-sm text-gray-500">操作记录</p>
              </div>
            </Link>
          </div>
        </div>

        {/* 快速操作 */}
        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">快速操作</h3>
          <div className="flex flex-wrap gap-3">
            <button className="inline-flex items-center px-4 py-2 border border-purple-300 rounded-md shadow-sm text-sm font-medium text-purple-700 bg-white hover:bg-purple-50">
              <Zap className="h-4 w-4 mr-2" />
              系统备份
            </button>
            <button className="inline-flex items-center px-4 py-2 border border-purple-300 rounded-md shadow-sm text-sm font-medium text-purple-700 bg-white hover:bg-purple-50">
              <TrendingUp className="h-4 w-4 mr-2" />
              生成月报
            </button>
            <button className="inline-flex items-center px-4 py-2 border border-purple-300 rounded-md shadow-sm text-sm font-medium text-purple-700 bg-white hover:bg-purple-50">
              <Target className="h-4 w-4 mr-2" />
              批量审批
            </button>
            <button className="inline-flex items-center px-4 py-2 border border-purple-300 rounded-md shadow-sm text-sm font-medium text-purple-700 bg-white hover:bg-purple-50">
              <FileText className="h-4 w-4 mr-2" />
              导出数据
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}