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
  UserPlus,
  Shield,
  Mountain,
  Mail,
  Calendar,
  Flag,
  Award,
  Loader2
} from 'lucide-react'

interface RegisterForm {
  email: string
  password: string
  confirmPassword: string
  name: string
  role: 'athlete' | 'coach' | 'admin'
  fisCode?: string
  birthDate: string
  nationality: string
  team?: string
  agreeTerms: boolean
}

export default function RegisterPage() {
  const router = useRouter()
  const [form, setForm] = useState<RegisterForm>({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    role: 'athlete',
    fisCode: '',
    birthDate: '',
    nationality: 'CHN',
    team: '',
    agreeTerms: false
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [step, setStep] = useState(1)

  const validateForm = () => {
    if (!form.email || !form.password || !form.confirmPassword || !form.name) {
      setError('请填写所有必填字段')
      return false
    }

    if (form.password !== form.confirmPassword) {
      setError('两次输入的密码不一致')
      return false
    }

    if (form.password.length < 6) {
      setError('密码至少需要6位字符')
      return false
    }

    if (!form.agreeTerms) {
      setError('请同意用户协议和隐私政策')
      return false
    }

    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setLoading(true)
    setError('')

    // 模拟注册API调用
    try {
      // 检查邮箱是否已存在
      const existingUsers = JSON.parse(localStorage.getItem('ski_users') || '[]')
      if (existingUsers.find((u: any) => u.email === form.email)) {
        setError('该邮箱已被注册')
        setLoading(false)
        return
      }

      // 生成新用户ID
      const newUser = {
        id: Date.now().toString(),
        email: form.email,
        password: form.password, // 实际应用中应该加密
        name: form.name,
        role: form.role,
        fisCode: form.fisCode || `${form.role.toUpperCase()}${Date.now()}`,
        birthDate: form.birthDate,
        nationality: form.nationality,
        team: form.team,
        avatar: '',
        createdAt: new Date().toISOString(),
        isActive: true
      }

      // 保存到localStorage (模拟数据库)
      existingUsers.push(newUser)
      localStorage.setItem('ski_users', JSON.stringify(existingUsers))

      // 自动登录
      const userSession = {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        role: newUser.role,
        fisCode: newUser.fisCode,
        loginTime: new Date().toISOString(),
        rememberMe: false
      }

      localStorage.setItem('ski_user_session', JSON.stringify(userSession))

      setTimeout(() => {
        // 注册成功，跳转到相应页面
        switch (form.role) {
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

    } catch (error) {
      console.error('Registration error:', error)
      setError('注册失败，请稍后重试')
      setLoading(false)
    }
  }

  const handleInputChange = (field: keyof RegisterForm, value: string | boolean) => {
    setForm(prev => ({ ...prev, [field]: value }))
    if (error) setError('')
  }

  const nextStep = () => {
    if (step === 1) {
      if (!form.email || !form.password || !form.confirmPassword) {
        setError('请完成基本信息填写')
        return
      }
      if (form.password !== form.confirmPassword) {
        setError('两次输入的密码不一致')
        return
      }
      if (form.password.length < 6) {
        setError('密码至少需要6位字符')
        return
      }
    }
    setError('')
    setStep(step + 1)
  }

  const prevStep = () => {
    setError('')
    setStep(step - 1)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-ski-blue/10 to-white flex items-center justify-center py-12 px-4 relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute top-0 left-0 w-96 h-96 opacity-10 rounded-full overflow-hidden">
        <img src={getImagePath("/images/ski-bg.jpg")} alt="" className="w-full h-full object-cover" />
      </div>
      <div className="absolute bottom-0 right-0 w-80 h-80 opacity-10 rounded-full overflow-hidden">
        <img src={getImagePath("/images/skiing-1.jpg")} alt="" className="w-full h-full object-cover" />
      </div>

      <div className="max-w-md w-full space-y-8 relative z-10">
        {/* Logo和标题 */}
        <div className="text-center">
          <div className="flex justify-center">
            <div className="bg-ski-blue rounded-full p-3 mb-4">
              <Mountain className="h-8 w-8 text-white" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-ski-navy">加入我们</h2>
          <p className="mt-2 text-gray-600">创建您的高山滑雪账户</p>
        </div>

        {/* 步骤指示器 */}
        <div className="flex justify-center space-x-4 mb-8">
          <div className={`w-3 h-3 rounded-full ${step >= 1 ? 'bg-ski-blue' : 'bg-gray-300'}`}></div>
          <div className={`w-3 h-3 rounded-full ${step >= 2 ? 'bg-ski-blue' : 'bg-gray-300'}`}></div>
        </div>

        {/* 注册表单 */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center">
                <Shield className="h-5 w-5 text-red-600 mr-2" />
                <span className="text-red-700 text-sm">{error}</span>
              </div>
            )}

            {step === 1 && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    邮箱地址 *
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
                    密码 *
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

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    确认密码 *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      required
                      value={form.confirmPassword}
                      onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                      className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ski-blue focus:border-transparent"
                      placeholder="请再次输入密码"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={nextStep}
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-ski-blue hover:bg-ski-blue/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ski-blue"
                >
                  下一步
                </button>
              </>
            )}

            {step === 2 && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    姓名 *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ski-blue focus:border-transparent"
                      placeholder="请输入真实姓名"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    用户角色 *
                  </label>
                  <select
                    value={form.role}
                    onChange={(e) => handleInputChange('role', e.target.value as any)}
                    className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ski-blue focus:border-transparent"
                  >
                    <option value="athlete">运动员</option>
                    <option value="coach">教练员</option>
                    <option value="admin">管理员</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    出生日期 *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Calendar className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="date"
                      required
                      value={form.birthDate}
                      onChange={(e) => handleInputChange('birthDate', e.target.value)}
                      className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ski-blue focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    国籍
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Flag className="h-5 w-5 text-gray-400" />
                    </div>
                    <select
                      value={form.nationality}
                      onChange={(e) => handleInputChange('nationality', e.target.value)}
                      className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ski-blue focus:border-transparent"
                    >
                      <option value="CHN">中国</option>
                      <option value="USA">美国</option>
                      <option value="AUT">奥地利</option>
                      <option value="SUI">瑞士</option>
                      <option value="FRA">法国</option>
                      <option value="ITA">意大利</option>
                      <option value="NOR">挪威</option>
                      <option value="SWE">瑞典</option>
                      <option value="CAN">加拿大</option>
                      <option value="GER">德国</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    FIS编号
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Award className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      value={form.fisCode}
                      onChange={(e) => handleInputChange('fisCode', e.target.value)}
                      className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ski-blue focus:border-transparent"
                      placeholder="如无则自动生成"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    所属队伍/机构
                  </label>
                  <input
                    type="text"
                    value={form.team}
                    onChange={(e) => handleInputChange('team', e.target.value)}
                    className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ski-blue focus:border-transparent"
                    placeholder="选填"
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={form.agreeTerms}
                    onChange={(e) => handleInputChange('agreeTerms', e.target.checked)}
                    className="h-4 w-4 text-ski-blue focus:ring-ski-blue border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-700">
                    我同意 <Link href="/terms" className="text-ski-blue hover:text-ski-blue/80">用户协议</Link> 和 <Link href="/privacy" className="text-ski-blue hover:text-ski-blue/80">隐私政策</Link>
                  </label>
                </div>

                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="flex-1 py-3 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ski-blue"
                  >
                    上一步
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-ski-blue hover:bg-ski-blue/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ski-blue disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <>
                        <UserPlus className="h-5 w-5 mr-2" />
                        注册
                      </>
                    )}
                  </button>
                </div>
              </>
            )}
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">已有账号？</span>
              </div>
            </div>

            <div className="mt-6">
              <Link
                href="/auth/login"
                className="w-full flex justify-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                <Shield className="h-5 w-5 mr-2" />
                立即登录
              </Link>
            </div>
          </div>
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