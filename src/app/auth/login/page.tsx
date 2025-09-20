'use client'

import { useState } from 'react'
import { getImagePath } from '@/utils/paths'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  User,
  Lock,
  Eye,
  EyeOff,
  LogIn,
  UserPlus,
  Shield,
  Mountain,
  Mail
} from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'

interface LoginForm {
  email: string
  password: string
  rememberMe: boolean
}

// 获取注册用户数据
const getRegisteredUsers = () => {
  const users = localStorage.getItem('ski_users')
  return users ? JSON.parse(users) : []
}

export default function LoginPage() {
  const router = useRouter()
  const { login } = useAuth()
  const [form, setForm] = useState<LoginForm>({
    email: '',
    password: '',
    rememberMe: false
  })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    // 验证登录信息
    const registeredUsers = getRegisteredUsers()
    const user = registeredUsers.find((u: any) => u.email === form.email && u.password === form.password)

    if (user) {
      // 使用AuthContext进行登录
      const userSession = {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        fisCode: user.fisCode,
        loginTime: new Date().toISOString()
      }

      login(userSession)

      // 根据角色跳转不同页面
      setTimeout(() => {
        switch (user.role) {
          case 'admin':
            router.push('/admin/dashboard')
            break
          case 'coach':
            router.push('/coach/dashboard')
            break
          case 'athlete':
            router.push('/athlete/dashboard')
            break
          default:
            router.push('/')
        }
      }, 1000)
    } else {
      setError('邮箱或密码错误，请检查您的登录信息或先注册账号')
      setLoading(false)
    }
  }

  const handleInputChange = (field: keyof LoginForm, value: string | boolean) => {
    setForm(prev => ({ ...prev, [field]: value }))
    if (error) setError('')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-ski-blue/10 to-white flex items-center justify-center py-12 px-4 relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute top-0 left-0 w-96 h-96 opacity-10 rounded-full overflow-hidden">
        <img src={getImagePath("/images/ski-bg.jpg")} alt="" className="w-full h-full object-cover" />
      </div>
      <div className="absolute bottom-0 right-0 w-80 h-80 opacity-10 rounded-full overflow-hidden">
        <img src={getImagePath("/images/giant-slalom.jpg")} alt="" className="w-full h-full object-cover" />
      </div>

      <div className="max-w-md w-full space-y-8 relative z-10">
        {/* Logo和标题 */}
        <div className="text-center">
          <div className="flex justify-center">
            <div className="bg-ski-blue rounded-full p-3 mb-4">
              <Mountain className="h-8 w-8 text-white" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-ski-navy">欢迎回来</h2>
          <p className="mt-2 text-gray-600">登录到高山滑雪管理系统</p>
        </div>

        {/* 登录表单 */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center">
                <Shield className="h-5 w-5 text-red-600 mr-2" />
                <span className="text-red-700 text-sm">{error}</span>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                邮箱地址
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ski-blue focus:border-transparent"
                  placeholder="请输入邮箱地址"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                密码
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={form.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ski-blue focus:border-transparent"
                  placeholder="请输入密码"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={form.rememberMe}
                  onChange={(e) => handleInputChange('rememberMe', e.target.checked)}
                  className="h-4 w-4 text-ski-blue focus:ring-ski-blue border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-700">
                  记住我
                </label>
              </div>

              <div className="text-sm">
                <Link href="/auth/forgot-password" className="text-ski-blue hover:text-ski-blue/80">
                  忘记密码？
                </Link>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-ski-blue hover:bg-ski-blue/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ski-blue disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                <>
                  <LogIn className="h-5 w-5 mr-2" />
                  登录
                </>
              )}
            </button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">还没有账号？</span>
              </div>
            </div>

            <div className="mt-6">
              <Link
                href="/auth/register"
                className="w-full flex justify-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                <UserPlus className="h-5 w-5 mr-2" />
                注册新账号
              </Link>
            </div>
          </div>
        </div>

        {/* 注册提示 */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h4 className="text-sm font-medium text-green-900 mb-2">还没有账号？</h4>
          <p className="text-xs text-green-800">
            立即注册成为高山滑雪平台的一员，享受专业的积分管理和竞赛服务。
          </p>
          <Link
            href="/auth/register"
            className="inline-block mt-2 text-xs text-green-700 hover:text-green-900 underline"
          >
            点击注册新账号 →
          </Link>
        </div>

        <div className="text-center">
          <Link
            href="/"
            className="text-sm text-gray-500 hover:text-ski-blue"
          >
            ← 返回首页
          </Link>
        </div>
      </div>
    </div>
  )
}