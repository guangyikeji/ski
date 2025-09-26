'use client'

import { Users, Shield, Award, Settings, Copy, Check } from 'lucide-react'
import { useState } from 'react'

const testAccounts = [
  {
    title: '管理员账号',
    role: 'ADMIN',
    email: 'admin@ski.com',
    password: 'admin123',
    description: '所有功能完整访问',
    features: [
      '用户管理、积分计算、成绩导入',
      '系统配置、数据统计',
      '赛事管理、报名审核',
      '管理员专享功能'
    ],
    icon: Settings,
    color: 'text-red-600',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200'
  },
  {
    title: '运动员账号',
    role: 'ATHLETE',
    email: 'athlete@ski.com',
    password: 'athlete123',
    description: '会员基础功能',
    features: [
      '积分查询、积分排行榜',
      '积分计算器、赛事报名',
      '个人档案、成绩历史',
      '积分变化趋势'
    ],
    icon: Award,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200'
  },
  {
    title: '教练账号',
    role: 'COACH',
    email: 'coach@ski.com',
    password: 'coach123',
    description: '教练管理功能',
    features: [
      '运动员管理、赛事报名',
      '积分查询、数据分析',
      '队员成绩统计',
      '训练计划管理'
    ],
    icon: Users,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200'
  },
  {
    title: '公众用户',
    role: 'PUBLIC',
    email: '无需登录',
    password: '无需密码',
    description: '基础浏览功能',
    features: [
      '首页浏览、平台介绍',
      '新闻查看、联系方式',
      '积分规则查看',
      '公开信息访问'
    ],
    icon: Shield,
    color: 'text-gray-600',
    bgColor: 'bg-gray-50',
    borderColor: 'border-gray-200'
  }
]

export default function TestAccountsPage() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

  const copyToClipboard = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedIndex(index)
      setTimeout(() => setCopiedIndex(null), 2000)
    } catch (err) {
      console.error('复制失败:', err)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-ski-navy mb-4">测试账号配置</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          以下是不同权限级别的测试账号，用于验证系统功能和权限控制。每个账号对应不同的用户角色和访问权限。
        </p>
      </div>

      {/* 重要提示 */}
      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg p-6 mb-8">
        <div className="flex items-start">
          <Shield className="h-6 w-6 text-yellow-600 mt-1 mr-3 flex-shrink-0" />
          <div>
            <h3 className="text-lg font-semibold text-yellow-800 mb-2">测试说明</h3>
            <div className="text-yellow-700 text-sm space-y-1">
              <div>• 这些账号仅用于功能测试和演示，请勿在生产环境中使用</div>
              <div>• 不同角色的菜单项和功能权限会有明显差异</div>
              <div>• 登录后可在页眉右上角看到当前用户角色标识</div>
              <div>• 未登录状态下部分功能会显示&quot;需要登录&quot;提示</div>
            </div>
          </div>
        </div>
      </div>

      {/* 测试账号卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {testAccounts.map((account, index) => (
          <div key={index} className={`bg-white rounded-lg shadow-lg border-2 ${account.borderColor} overflow-hidden`}>
            {/* 卡片头部 */}
            <div className={`${account.bgColor} p-6 border-b ${account.borderColor}`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className={`w-12 h-12 ${account.bgColor} rounded-lg flex items-center justify-center mr-4`}>
                    <account.icon className={`h-6 w-6 ${account.color}`} />
                  </div>
                  <div>
                    <h3 className={`text-xl font-bold ${account.color}`}>{account.title}</h3>
                    <p className="text-sm text-gray-600">{account.description}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${account.color} ${account.bgColor} border ${account.borderColor}`}>
                  {account.role}
                </span>
              </div>
            </div>

            {/* 登录信息 */}
            <div className="p-6">
              {account.email !== '无需登录' ? (
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">邮箱地址</label>
                    <div className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                      <code className="text-sm font-mono text-gray-800">{account.email}</code>
                      <button
                        onClick={() => copyToClipboard(account.email, index * 2)}
                        className="ml-2 p-1 hover:bg-gray-200 rounded transition-colors"
                      >
                        {copiedIndex === index * 2 ? (
                          <Check className="h-4 w-4 text-green-600" />
                        ) : (
                          <Copy className="h-4 w-4 text-gray-500" />
                        )}
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">密码</label>
                    <div className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                      <code className="text-sm font-mono text-gray-800">{account.password}</code>
                      <button
                        onClick={() => copyToClipboard(account.password, index * 2 + 1)}
                        className="ml-2 p-1 hover:bg-gray-200 rounded transition-colors"
                      >
                        {copiedIndex === index * 2 + 1 ? (
                          <Check className="h-4 w-4 text-green-600" />
                        ) : (
                          <Copy className="h-4 w-4 text-gray-500" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 text-center">
                    无需登录，直接访问公开功能
                  </p>
                </div>
              )}

              {/* 功能权限 */}
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-3">功能权限</h4>
                <ul className="space-y-2">
                  {account.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                      <div className={`w-2 h-2 ${account.color.replace('text-', 'bg-')} rounded-full mr-3`}></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 权限测试指南 */}
      <div className="mt-12 bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-ski-navy mb-6">权限测试指南</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-ski-navy mb-4">测试步骤</h3>
            <ol className="space-y-2 text-sm text-gray-600">
              <li>1. 使用不同账号分别登录系统</li>
              <li>2. 检查导航菜单项的显示/隐藏逻辑</li>
              <li>3. 验证页面访问权限控制</li>
              <li>4. 确认操作按钮和功能的权限限制</li>
              <li>5. 测试未登录状态的功能引导</li>
            </ol>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-ski-navy mb-4">验证要点</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• 菜单项权限控制是否正确</li>
              <li>• 页面内容是否按角色显示</li>
              <li>• 操作权限是否符合设计</li>
              <li>• 错误提示信息是否友好</li>
              <li>• 登录状态切换是否正常</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 快速登录区域 */}
      <div className="mt-8 text-center">
        <div className="inline-flex flex-col sm:flex-row gap-4">
          <a
            href="/login"
            className="inline-flex items-center px-6 py-3 bg-ski-blue text-white rounded-lg hover:bg-ski-blue/90 transition-colors font-semibold"
          >
            <Shield className="h-5 w-5 mr-2" />
            前往登录页面
          </a>
          <a
            href="/"
            className="inline-flex items-center px-6 py-3 border-2 border-ski-blue text-ski-blue rounded-lg hover:bg-ski-blue hover:text-white transition-colors font-semibold"
          >
            返回首页
          </a>
        </div>
      </div>
    </div>
  )
}