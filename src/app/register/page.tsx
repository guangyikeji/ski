'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, User, Mail, Lock, UserPlus, Phone, IdCard } from 'lucide-react'
import { getImagePath } from '@/utils/paths'
import { useAuth } from '@/contexts/AuthContext'

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    realName: '',
    phone: '',
    userType: 'athlete' as 'athlete' | 'coach',
    agreementAccepted: false
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [validationError, setValidationError] = useState('')
  const { register, isLoading, error, isAuthenticated, clearError } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/profile')
    }
  }, [isAuthenticated, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    clearError()
    setValidationError('')

    // 验证
    if (formData.password !== formData.confirmPassword) {
      setValidationError('密码不一致')
      return
    }

    if (!formData.agreementAccepted) {
      setValidationError('请同意服务条款和隐私政策')
      return
    }

    try {
      await register(formData)
    } catch (err) {
      // 错误已由AuthContext处理
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    })
  }

  return (
    <div className="min-h-screen flex">
      {/* 左侧背景图片 */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-green-600/90 to-ski-blue/90"></div>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('${getImagePath('/images/skiing-1.jpg')}')`
          }}
        ></div>
        <div className="absolute inset-0 flex items-center justify-center p-12">
          <div className="text-white text-center max-w-md">
            <h1 className="text-4xl font-bold mb-6">加入我们</h1>
            <p className="text-xl text-green-100 mb-8">
              成为中国高山滑雪积分管理平台会员
            </p>
            <div className="space-y-4">
              <div className="flex items-center text-green-100">
                <div className="w-2 h-2 bg-green-300 rounded-full mr-3"></div>
                <span>获得专属会员积分记录</span>
              </div>
              <div className="flex items-center text-green-100">
                <div className="w-2 h-2 bg-green-300 rounded-full mr-3"></div>
                <span>参与国内滑雪赛事报名</span>
              </div>
              <div className="flex items-center text-green-100">
                <div className="w-2 h-2 bg-green-300 rounded-full mr-3"></div>
                <span>查看最新赛事资讯</span>
              </div>
              <div className="flex items-center text-green-100">
                <div className="w-2 h-2 bg-green-300 rounded-full mr-3"></div>
                <span>享受专业数据服务</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 右侧注册表单 */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">会员注册</h2>
            <p className="mt-2 text-gray-600">
              创建您的会员账户，开启滑雪之旅
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {(error || validationError) && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
                {error || validationError}
              </div>
            )}

            <div className="space-y-4">
              {/* 用户类型选择 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  用户类型
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <label className={`flex items-center justify-center p-3 border rounded-lg cursor-pointer ${
                    formData.userType === 'athlete'
                      ? 'border-ski-blue bg-ski-blue/5 text-ski-blue'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}>
                    <input
                      type="radio"
                      name="userType"
                      value="athlete"
                      checked={formData.userType === 'athlete'}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <User className="h-5 w-5 mr-2" />
                    <span className="font-medium">运动员</span>
                  </label>
                  <label className={`flex items-center justify-center p-3 border rounded-lg cursor-pointer ${
                    formData.userType === 'coach'
                      ? 'border-ski-blue bg-ski-blue/5 text-ski-blue'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}>
                    <input
                      type="radio"
                      name="userType"
                      value="coach"
                      checked={formData.userType === 'coach'}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <User className="h-5 w-5 mr-2" />
                    <span className="font-medium">教练员</span>
                  </label>
                </div>
              </div>

              {/* 真实姓名 */}
              <div>
                <label htmlFor="realName" className="block text-sm font-medium text-gray-700 mb-2">
                  真实姓名
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <IdCard className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="realName"
                    name="realName"
                    type="text"
                    required
                    value={formData.realName}
                    onChange={handleChange}
                    className="pl-10 w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ski-blue focus:border-transparent"
                    placeholder="请输入真实姓名"
                  />
                </div>
              </div>

              {/* 用户名 */}
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                  用户名
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    value={formData.username}
                    onChange={handleChange}
                    className="pl-10 w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ski-blue focus:border-transparent"
                    placeholder="请输入用户名"
                  />
                </div>
              </div>

              {/* 邮箱 */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  邮箱地址
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="pl-10 w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ski-blue focus:border-transparent"
                    placeholder="请输入邮箱地址"
                  />
                </div>
              </div>

              {/* 手机号 */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  手机号码（可选）
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    className="pl-10 w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ski-blue focus:border-transparent"
                    placeholder="请输入手机号码"
                  />
                </div>
              </div>

              {/* 密码 */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  密码
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="pl-10 pr-10 w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ski-blue focus:border-transparent"
                    placeholder="请输入密码（至少6位）"
                    minLength={6}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                </div>
              </div>

              {/* 确认密码 */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                  确认密码
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="pl-10 pr-10 w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ski-blue focus:border-transparent"
                    placeholder="请再次输入密码"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* 协议同意 */}
            <div className="flex items-start">
              <input
                id="agreementAccepted"
                name="agreementAccepted"
                type="checkbox"
                checked={formData.agreementAccepted}
                onChange={handleChange}
                className="h-4 w-4 text-ski-blue focus:ring-ski-blue border-gray-300 rounded mt-1"
              />
              <label htmlFor="agreementAccepted" className="ml-3 block text-sm text-gray-700">
                我已阅读并同意
                <Link href="/terms" className="text-ski-blue hover:text-ski-blue/80 mx-1">
                  《服务条款》
                </Link>
                和
                <Link href="/privacy" className="text-ski-blue hover:text-ski-blue/80 mx-1">
                  《隐私政策》
                </Link>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-white bg-ski-blue hover:bg-ski-blue/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ski-blue disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                  注册中...
                </>
              ) : (
                <>
                  <UserPlus className="h-5 w-5 mr-2" />
                  立即注册
                </>
              )}
            </button>

            <div className="text-center">
              <span className="text-gray-600">已有账户？</span>
              <Link href="/login" className="ml-2 text-ski-blue hover:text-ski-blue/80 font-medium">
                立即登录
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}