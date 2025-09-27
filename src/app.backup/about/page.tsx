'use client'

import { Mountain, CheckCircle, Users, Trophy, Calculator, Award, TrendingUp, Shield, Database, Clock } from 'lucide-react'

export default function AboutPage() {
  const features = [
    {
      title: '中国积分体系',
      description: '基于中国滑雪协会标准，建立独立的国内赛事积分计算体系',
      icon: Calculator,
      color: 'text-blue-600'
    },
    {
      title: '权威数据管理',
      description: '为中国高山滑雪竞赛提供权威、准确的数据管理和积分计算服务',
      icon: Database,
      color: 'text-green-600'
    },
    {
      title: '专业竞赛管理',
      description: '支持赛事组织、报名管理、成绩录入、积分计算全流程数字化',
      icon: Trophy,
      color: 'text-yellow-600'
    },
    {
      title: '多角色服务',
      description: '为运动员、教练员、赛事组织者、竞赛裁判提供专业化服务',
      icon: Users,
      color: 'text-purple-600'
    },
    {
      title: '实时积分更新',
      description: '21天积分更新周期，确保积分数据的时效性和准确性',
      icon: Clock,
      color: 'text-indigo-600'
    },
    {
      title: '数据安全保障',
      description: '专业的数据加密和权限管理，确保竞赛数据安全可靠',
      icon: Shield,
      color: 'text-red-600'
    }
  ]

  const advantages = [
    {
      title: '符合中国标准',
      description: '采用符合中国标准的积分计算算法，完全适配国内赛事特点',
      percentage: '100%'
    },
    {
      title: '覆盖全项目',
      description: '支持滑降、回转、大回转、超级大回转、全能等所有高山滑雪项目',
      percentage: '5+'
    },
    {
      title: '数字化管理',
      description: '从报名到成绩公布全流程数字化，提升赛事组织效率',
      percentage: '全流程'
    },
    {
      title: '实时统计分析',
      description: '提供实时的积分排名、趋势分析、成绩统计等数据服务',
      percentage: '实时'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-ski-navy via-ski-blue to-primary-600 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <Mountain className="h-16 w-16 text-white" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Alpine Skiing China
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-gray-100">
              中国高山滑雪积分管理平台
            </h2>
            <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto leading-relaxed">
              基于中国滑雪协会标准打造的专业竞赛管理平台，致力于推动中国滑雪运动的数字化、标准化发展
            </p>
          </div>
        </div>
      </div>

      {/* Platform Introduction */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-ski-navy mb-6">平台介绍</h2>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Alpine Skiing China（中国高山滑雪积分管理平台）是基于中国滑雪协会标准打造的专业竞赛管理平台。
            采用符合中国标准的积分计算算法，为中国高山滑雪竞赛提供权威、准确的数据管理和积分计算服务。
          </p>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed mt-4">
            我们致力于推动中国滑雪运动的数字化、标准化发展，为运动员、教练员、赛事组织者、竞赛裁判
            提供现代化的数据管理、积分计算、成绩统计工具，全面提升中国高山滑雪运动的组织水平和竞技水平。
          </p>
        </div>

        {/* Core Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className={`w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center mb-4`}>
                <feature.icon className={`h-6 w-6 ${feature.color}`} />
              </div>
              <h3 className="text-xl font-semibold text-ski-navy mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Platform Advantages */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-ski-navy mb-8 text-center">平台优势</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {advantages.map((advantage, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-ski-blue mb-2">{advantage.percentage}</div>
                <h3 className="text-lg font-semibold text-ski-navy mb-2">{advantage.title}</h3>
                <p className="text-gray-600 text-sm">{advantage.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Mission and Vision */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-ski-blue to-primary-600 text-white rounded-lg p-8">
            <h3 className="text-2xl font-bold mb-4">我们的使命</h3>
            <p className="text-lg leading-relaxed">
              建立中国自主的高山滑雪积分体系，为中国滑雪运动的发展提供科学、准确、权威的数据支撑，
              推动中国高山滑雪运动的数字化转型和竞技水平提升。
            </p>
          </div>
          <div className="bg-gradient-to-br from-ski-navy to-gray-800 text-white rounded-lg p-8">
            <h3 className="text-2xl font-bold mb-4">我们的愿景</h3>
            <p className="text-lg leading-relaxed">
              成为中国高山滑雪运动数字化发展的引领者，通过专业的技术服务和标准化管理，
              为中国滑雪运动在国际舞台上的竞争力提升贡献力量。
            </p>
          </div>
        </div>
      </div>

      {/* Service Objects */}
      <div className="bg-ski-ice py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-ski-navy mb-12 text-center">服务对象</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-lg p-6 text-center shadow-lg">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-ski-navy mb-2">运动员</h3>
              <p className="text-gray-600 text-sm">积分查询、成绩历史、排名追踪、赛事报名</p>
            </div>
            <div className="bg-white rounded-lg p-6 text-center shadow-lg">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-ski-navy mb-2">教练员</h3>
              <p className="text-gray-600 text-sm">队员管理、训练计划、成绩分析、数据统计</p>
            </div>
            <div className="bg-white rounded-lg p-6 text-center shadow-lg">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold text-ski-navy mb-2">赛事组织者</h3>
              <p className="text-gray-600 text-sm">赛事管理、报名统计、成绩录入、积分计算</p>
            </div>
            <div className="bg-white rounded-lg p-6 text-center shadow-lg">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-ski-navy mb-2">竞赛裁判</h3>
              <p className="text-gray-600 text-sm">成绩验证、规则查询、数据审核、公正执裁</p>
            </div>
          </div>
        </div>
      </div>

      {/* Technology Standards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-ski-navy mb-8 text-center">技术标准</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-ski-navy mb-4">积分计算标准</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  基于中国滑雪协会认定的计算规则
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  21天积分更新周期，适配中国赛事频率
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  精确到小数点后2位的计算精度
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  分阶段伤病保护机制
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-ski-navy mb-4">数据安全标准</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  企业级数据加密和权限管理
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  完整的操作审计日志记录
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  多重数据备份和恢复机制
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  99.9%系统可用性保障
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}