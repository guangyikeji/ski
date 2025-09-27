'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, User, Lock, LogIn } from 'lucide-react'
import { getImagePath } from '@/utils/paths'
import { useAuth } from '@/contexts/AuthContext'

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({
    email: '',
    password: ''
  })
  const [touched, setTouched] = useState({
    email: false,
    password: false
  })
  const { login, isLoading, error, isAuthenticated, clearError } = useAuth()
  const router = useRouter()

  // 表单验证函数
  const validateEmail = (email: string): string => {
    if (!email) return '请输入邮箱地址'
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) return '请输入有效的邮箱地址'
    return ''
  }

  const validatePassword = (password: string): string => {
    if (!password) return '请输入密码'
    if (password.length < 6) return '密码至少需要6个字符'
    return ''
  }

  const validateForm = () => {
    const emailError = validateEmail(formData.email)
    const passwordError = validatePassword(formData.password)

    setErrors({
      email: emailError,
      password: passwordError
    })

    return !emailError && !passwordError
  }

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/profile')
    }
  }, [isAuthenticated, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    clearError()

    // 标记所有字段为已触摸
    setTouched({
      email: true,
      password: true
    })

    // 表单验证
    if (!validateForm()) {
      return
    }

    try {
      await login(formData)
    } catch (err) {
      // 错误已由AuthContext处理
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })

    // 实时验证
    if (touched[name as keyof typeof touched]) {
      if (name === 'email') {
        setErrors(prev => ({ ...prev, email: validateEmail(value) }))
      } else if (name === 'password') {
        setErrors(prev => ({ ...prev, password: validatePassword(value) }))
      }
    }
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target
    setTouched(prev => ({ ...prev, [name]: true }))

    // 失焦时验证
    if (name === 'email') {
      setErrors(prev => ({ ...prev, email: validateEmail(formData.email) }))
    } else if (name === 'password') {
      setErrors(prev => ({ ...prev, password: validatePassword(formData.password) }))
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* 左侧背景图片 */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-ski-blue/90 to-blue-600/90"></div>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('${getImagePath('/images/ski-bg.jpg')}')`
          }}
        ></div>
        <div className="absolute inset-0 flex items-center justify-center p-12">
          <div className="text-white text-center max-w-md">
            <h1 className="text-4xl font-bold mb-6">欢迎回来</h1>
            <p className="text-xl text-blue-100 mb-8">
              登录您的中国高山滑雪积分管理平台账户
            </p>
            <div className="space-y-4">
              <div className="flex items-center text-blue-100">
                <div className="w-2 h-2 bg-blue-300 rounded-full mr-3"></div>
                <span>查看个人积分记录</span>
              </div>
              <div className="flex items-center text-blue-100">
                <div className="w-2 h-2 bg-blue-300 rounded-full mr-3"></div>
                <span>参与赛事报名</span>
              </div>
              <div className="flex items-center text-blue-100">
                <div className="w-2 h-2 bg-blue-300 rounded-full mr-3"></div>
                <span>查看积分排行榜</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 右侧登录表单 */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">会员登录</h2>
            <p className="mt-2 text-gray-600">
              请使用您的会员账户登录
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  邮箱地址
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`pl-10 w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-colors ${
                      errors.email
                        ? 'border-red-300 focus:ring-red-500'
                        : 'border-gray-300 focus:ring-ski-blue'
                    }`}
                    placeholder="请输入您的邮箱地址"
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <span className="inline-block w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                    {errors.email}
                  </p>
                )}
              </div>

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
                    onBlur={handleBlur}
                    className={`pl-10 pr-10 w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-colors ${
                      errors.password
                        ? 'border-red-300 focus:ring-red-500'
                        : 'border-gray-300 focus:ring-ski-blue'
                    }`}
                    placeholder="请输入您的密码"
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
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <span className="inline-block w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                    {errors.password}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-ski-blue focus:ring-ski-blue border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  记住我
                </label>
              </div>

              <Link href="/forgot-password" className="text-sm text-ski-blue hover:text-ski-blue/80">
                忘记密码？
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-white bg-ski-blue hover:bg-ski-blue/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ski-blue disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                  登录中...
                </>
              ) : (
                <>
                  <LogIn className="h-5 w-5 mr-2" />
                  登录
                </>
              )}
            </button>

            <div className="text-center">
              <span className="text-gray-600">还没有账户？</span>
              <Link href="/register" className="ml-2 text-ski-blue hover:text-ski-blue/80 font-medium">
                立即注册
              </Link>
            </div>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="text-center text-sm text-gray-500">
              <p>登录即表示您同意我们的</p>
              <div className="mt-1">
                <Link href="/terms" className="text-ski-blue hover:text-ski-blue/80">
                  服务条款
                </Link>
                <span className="mx-2">和</span>
                <Link href="/privacy" className="text-ski-blue hover:text-ski-blue/80">
                  隐私政策
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}