'use client'

import { Calculator, FileText, Trophy, Users, Award, Star, Target, Clock, BookOpen, ExternalLink } from 'lucide-react'
import Link from 'next/link'

// 规则模块
const ruleModules = [
  {
    title: '中国高山滑雪积分规则 v4.0',
    description: '全新简化的积分计算体系，基于三步计算公式，去除复杂系数',
    icon: Calculator,
    href: '/rules/points',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    features: [
      '简化三步计算公式',
      '三级赛事体系(A/B/C)',
      '扩展青少年年龄组',
      '提高计算透明度'
    ]
  },
  {
    title: '竞赛规则说明 v4.0',
    description: '了解v4.0新版竞赛规则和扩展青少年体系，完整参赛指导',
    icon: Trophy,
    href: '/rules/competition',
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
    features: [
      '比赛项目介绍',
      'v4.0年龄分组体系',
      '参赛指南流程',
      '安全技术规范'
    ]
  },
  {
    title: '中国积分规则文档',
    description: '查看最新的v4.0简化积分规则文档和计算器工具',
    icon: FileText,
    href: '/rules/fis',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
    features: [
      'v4.0规则详解',
      '公式组件说明',
      '在线积分计算器',
      'PDF文档下载'
    ]
  }
]

// v4.0核心特点
const v4Features = [
  {
    title: '简化计算',
    description: '去除复杂的质量系数、人数系数、附加分等要素',
    icon: Target,
    color: 'text-blue-600'
  },
  {
    title: '三级体系',
    description: 'A级(1.0)、B级(0.6)、C级(0.3)三级赛事分类',
    icon: Star,
    color: 'text-green-600'
  },
  {
    title: '扩展青少年',
    description: 'U15-U18核心年龄段，精准培养支持',
    icon: Users,
    color: 'text-purple-600'
  },
  {
    title: '高效透明',
    description: '三步计算公式，提高效率和透明度',
    icon: Clock,
    color: 'text-orange-600'
  }
]

// 快速链接
const quickLinks = [
  { name: 'v4.0积分计算器', href: '/points/calculator', icon: Calculator },
  { name: '积分规则查询', href: '/points/rankings', icon: Award },
  { name: '赛事数据管理', href: '/data', icon: FileText },
  { name: '中国滑雪协会', href: 'https://www.csa.org.cn', icon: ExternalLink, external: true }
]

export default function RulesMainPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-ski-navy mb-4">
          中国高山滑雪规则文档 v4.0
        </h1>
        <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
          查看最新的v4.0简化规则体系，包含积分计算、竞赛管理、青少年培养等完整规则文档
        </p>
        <div className="flex justify-center items-center space-x-4 mt-4 text-sm text-gray-500">
          <span className="flex items-center">
            <Award className="h-4 w-4 mr-1" />
            官方v4.0标准
          </span>
          <span className="flex items-center">
            <Target className="h-4 w-4 mr-1" />
            简化计算体系
          </span>
          <span className="flex items-center">
            <Users className="h-4 w-4 mr-1" />
            扩展青少年体系
          </span>
        </div>
      </div>

      {/* v4.0简化公式展示 */}
      <div className="bg-gradient-to-r from-ski-blue to-primary-700 text-white rounded-lg p-8 mb-12">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">v4.0核心公式</h2>
          <div className="text-2xl font-mono font-bold mb-6 bg-white/20 rounded-lg py-4">
            最终积分 = (基础比赛积分 + 判罚分) × 赛事系数
          </div>
          <p className="text-lg opacity-90">
            相比v2.0复杂体系，v4.0去除了质量系数、人数系数、附加分等复杂要素，
            采用简化三步计算法，提高效率和透明度
          </p>
        </div>
      </div>

      {/* 规则模块 */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-ski-navy mb-8 text-center">规则模块</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {ruleModules.map((module, index) => (
            <Link key={index} href={module.href}>
              <div className={`bg-white rounded-lg shadow-lg border-2 ${module.borderColor} p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer h-full`}>
                <div className="flex items-center mb-4">
                  <div className={`w-12 h-12 ${module.bgColor} rounded-lg flex items-center justify-center mr-4`}>
                    <module.icon className={`h-6 w-6 ${module.color}`} />
                  </div>
                  <h3 className="text-xl font-bold text-ski-navy">{module.title}</h3>
                </div>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {module.description}
                </p>
                <div className="space-y-2">
                  {module.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center text-sm text-gray-700">
                      <div className={`w-2 h-2 rounded-full ${module.color.replace('text-', 'bg-')} mr-2 flex-shrink-0`}></div>
                      {feature}
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className={`inline-flex items-center text-sm font-medium ${module.color}`}>
                    查看详情
                    <ExternalLink className="h-3 w-3 ml-1" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* v4.0核心特点 */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-ski-navy mb-8 text-center">v4.0核心特点</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {v4Features.map((feature, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-6 text-center">
              <feature.icon className={`h-12 w-12 ${feature.color} mx-auto mb-4`} />
              <h3 className="text-lg font-semibold text-ski-navy mb-3">{feature.title}</h3>
              <p className="text-sm text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 快速链接 */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-ski-navy mb-8 text-center">快速链接</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickLinks.map((link, index) => (
            link.external ? (
              <a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-lg shadow-lg p-4 text-center hover:shadow-xl transition-shadow duration-300"
              >
                <link.icon className="h-8 w-8 text-ski-blue mx-auto mb-2" />
                <span className="text-sm font-medium text-gray-900">{link.name}</span>
              </a>
            ) : (
              <Link key={index} href={link.href}>
                <div className="bg-white rounded-lg shadow-lg p-4 text-center hover:shadow-xl transition-shadow duration-300 cursor-pointer">
                  <link.icon className="h-8 w-8 text-ski-blue mx-auto mb-2" />
                  <span className="text-sm font-medium text-gray-900">{link.name}</span>
                </div>
              </Link>
            )
          ))}
        </div>
      </div>

      {/* v4.0升级说明 */}
      <div className="bg-gradient-to-r from-ski-navy to-gray-800 text-white rounded-lg p-8 mb-12">
        <h2 className="text-3xl font-bold mb-6 text-center">v4.0升级说明</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">主要改进</h3>
            <ul className="space-y-2 text-gray-300">
              <li>• 简化积分计算公式，去除复杂系数</li>
              <li>• 三级赛事体系，管理更加清晰</li>
              <li>• 扩展青少年年龄组，全程培养支持</li>
              <li>• 提高计算透明度和效率</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">技术优势</h3>
            <ul className="space-y-2 text-gray-300">
              <li>• 三步计算法，易于理解和实施</li>
              <li>• 标准化管理，与国际接轨</li>
              <li>• 数字化支持，在线工具完善</li>
              <li>• 开放透明，公平公正竞争</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 重要提示 */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-800 mb-4">重要提示</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-blue-700">
          <div>
            <h4 className="font-semibold mb-2">📋 规则版本</h4>
            <ul className="space-y-1">
              <li>• 当前版本：v4.0（最新）</li>
              <li>• 实施日期：2024-2025赛季</li>
              <li>• 适用范围：中国国内赛事</li>
              <li>• 更新周期：根据实践情况调整</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">🔧 使用指南</h4>
            <ul className="space-y-1">
              <li>• 建议从积分规则开始了解</li>
              <li>• 使用在线计算器验证计算</li>
              <li>• 关注青少年体系扩展政策</li>
              <li>• 及时获取规则更新信息</li>
            </ul>
          </div>
        </div>
        <div className="mt-6 p-4 bg-blue-100 rounded-lg">
          <p className="text-blue-800 text-sm">
            <strong>🚀 技术支持：</strong>
            本规则体系基于国际先进经验，结合中国实际情况制定，旨在为中国高山滑雪运动发展提供科学、公平、高效的规则支撑。
            如有疑问或建议，请通过相关渠道联系我们。
          </p>
        </div>
      </div>
    </div>
  )
}