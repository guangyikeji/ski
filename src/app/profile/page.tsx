'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import {
  User,
  Mail,
  Shield,
  Edit,
  Save,
  Key,
  Bell,
  Settings,
  Award,
  Calendar,
  MapPin
} from 'lucide-react'
import { getImagePath } from '@/utils/paths'

export default function ProfilePage() {
  const { user, logout } = useAuth()
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    fisCode: '',
    bio: ''
  })

  useEffect(() => {
    if (!user) {
      router.push('/auth/login')
      return
    }

    setFormData({
      name: user.name || '',
      email: user.email || '',
      fisCode: user.fisCode || '',
      bio: ''
    })
  }, [user, router])

  const handleSave = () => {
    // 模拟保存功能
    alert('个人信息已保存')
    setIsEditing(false)
  }

  if (!user) {
    return <div>Loading...</div>
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

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* 背景装饰 */}
      <div className="absolute top-0 right-0 w-40 h-40 opacity-10 rounded-full overflow-hidden">
        <img
          src={getImagePath("/images/ski-action-2.jpg")}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="section-title">个人设置</h1>
        <p className="text-gray-600">管理您的账户信息和偏好设置</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 左侧个人信息卡片 */}
        <div className="lg:col-span-1">
          <div className="card text-center">
            <div className="w-24 h-24 bg-ski-blue text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <h3 className="text-xl font-bold text-ski-navy mb-2">{user.name}</h3>
            <p className="text-sm text-gray-600 mb-1">{user.email}</p>
            <div className="inline-flex items-center px-3 py-1 bg-ski-blue/10 text-ski-blue rounded-full text-sm">
              <Shield className="h-4 w-4 mr-1" />
              {getRoleDisplayName(user.role)}
            </div>

            {user.fisCode && (
              <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
                <div className="flex items-center justify-center text-sm">
                  <Award className="h-4 w-4 text-yellow-600 mr-1" />
                  <span className="text-yellow-800">FIS码: {user.fisCode}</span>
                </div>
              </div>
            )}

            <div className="mt-4 text-xs text-gray-500">
              注册时间: {new Date(user.loginTime).toLocaleDateString()}
            </div>
          </div>
        </div>

        {/* 右侧设置表单 */}
        <div className="lg:col-span-2 space-y-6">
          {/* 基本信息 */}
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-ski-navy">基本信息</h3>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="flex items-center space-x-1 text-ski-blue hover:text-ski-blue/80"
              >
                <Edit className="h-4 w-4" />
                <span>{isEditing ? '取消' : '编辑'}</span>
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  姓名
                </label>
                <div className="relative">
                  <User className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    disabled={!isEditing}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ski-blue focus:border-transparent disabled:bg-gray-50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  邮箱地址
                </label>
                <div className="relative">
                  <Mail className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    disabled={!isEditing}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ski-blue focus:border-transparent disabled:bg-gray-50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  FIS码
                </label>
                <div className="relative">
                  <Award className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    type="text"
                    value={formData.fisCode}
                    onChange={(e) => setFormData({...formData, fisCode: e.target.value})}
                    disabled={!isEditing}
                    placeholder="输入您的FIS码"
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ski-blue focus:border-transparent disabled:bg-gray-50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  个人简介
                </label>
                <textarea
                  value={formData.bio}
                  onChange={(e) => setFormData({...formData, bio: e.target.value})}
                  disabled={!isEditing}
                  rows={3}
                  placeholder="介绍一下您的滑雪经历..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ski-blue focus:border-transparent disabled:bg-gray-50"
                />
              </div>

              {isEditing && (
                <div className="flex space-x-3">
                  <button
                    onClick={handleSave}
                    className="flex items-center space-x-1 px-4 py-2 bg-ski-blue text-white rounded-lg hover:bg-ski-blue/90"
                  >
                    <Save className="h-4 w-4" />
                    <span>保存</span>
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    取消
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* 账户安全 */}
          <div className="card">
            <h3 className="text-lg font-semibold text-ski-navy mb-6">账户安全</h3>
            <div className="space-y-4">
              <button className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                <div className="flex items-center">
                  <Key className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <div className="text-sm font-medium text-gray-900">修改密码</div>
                    <div className="text-xs text-gray-500">定期更新密码以保护账户安全</div>
                  </div>
                </div>
                <span className="text-gray-400">›</span>
              </button>
            </div>
          </div>

          {/* 通知设置 */}
          <div className="card">
            <h3 className="text-lg font-semibold text-ski-navy mb-6">通知设置</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Bell className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <div className="text-sm font-medium text-gray-900">成绩通知</div>
                    <div className="text-xs text-gray-500">比赛成绩公布时通知我</div>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-ski-blue/25 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-ski-blue"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <div className="text-sm font-medium text-gray-900">赛事提醒</div>
                    <div className="text-xs text-gray-500">比赛报名和开始提醒</div>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-ski-blue/25 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-ski-blue"></div>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}