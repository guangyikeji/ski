'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  Calculator,
  Trophy,
  BarChart3,
  Clock,
  Target,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  Info,
  Snowflake,
  Mountain,
  Zap
} from 'lucide-react'

// 四大积分系统配置
const scoringSystems = [
  {
    id: 'alpine',
    title: '高山滑雪积分系统',
    subtitle: 'Alpine Points System',
    description: '基于时间的v4.0积分计算，积分越低越好',
    icon: Mountain,
    color: 'blue',
    features: [
      '时间基础积分计算：P = F × (Tx/To - 1)',
      '判罚分动态计算系统',
      'A级(1.0)、B级(0.6)、C级(0.3)赛事系数',
      '赛季取最好两次成绩平均值',
      '支持速降、回转、大回转、超级大回转、全能项目'
    ],
    disciplines: ['速降(DH)', '回转(SL)', '大回转(GS)', '超级大回转(SG)', '全能(AC)'],
    pointsDirection: '积分越低越好',
    calculationBasis: '基于比赛时间',
    seasonStrategy: '最好两次成绩平均值',
    example: {
      input: '运动员用时: 128.45秒, 冠军用时: 125.20秒',
      output: '积分: 26.18分 (大回转, A级赛事)'
    }
  },
  {
    id: 'snowboard-alpine',
    title: '单板平行项目积分系统',
    subtitle: 'Snowboard Alpine Points System',
    description: '类似高山滑雪逻辑，积分越低越好',
    icon: Snowflake,
    color: 'cyan',
    features: [
      '时间基础积分计算，专用项目系数',
      '平行回转(PSL)系数600，平行大回转(PGS)系数730',
      '赛事级别系数体系(A/B/C级)',
      '赛季积分管理和排名',
      '跨项目积分比较功能'
    ],
    disciplines: ['平行回转(PSL)', '平行大回转(PGS)'],
    pointsDirection: '积分越低越好',
    calculationBasis: '基于比赛时间',
    seasonStrategy: '最好两次成绩平均值',
    example: {
      input: '运动员用时: 45.20秒, 冠军用时: 43.80秒',
      output: '积分: 15.35分 (平行回转, B级赛事)'
    }
  },
  {
    id: 'snowboard-ranking',
    title: '单板技巧积分系统',
    subtitle: 'Snowboard Ranking Points System',
    description: '基于排名的240/360/120分档积分体系',
    icon: Target,
    color: 'green',
    features: [
      '排名基础积分分配：第1名100%，第2名80%，第3名60%',
      '三档积分标准：一类360分档、二类240分档、三类120分档',
      '赛季最好成绩累计系统',
      '技巧项目专项分析',
      '支持大跳台、坡面障碍技巧、U型场地'
    ],
    disciplines: ['大跳台(BA)', '坡面障碍技巧(SS)', 'U型场地(HP)'],
    pointsDirection: '积分越高越好',
    calculationBasis: '基于最终排名',
    seasonStrategy: '最好成绩累计',
    example: {
      input: '最终排名: 第2名',
      output: '积分: 288.00分 (大跳台, 一类赛事360分档)'
    }
  },
  {
    id: 'freestyle-ranking',
    title: '自由式滑雪积分系统',
    subtitle: 'Freestyle Ranking Points System',
    description: '基于排名的240/360/120分档积分体系',
    icon: Zap,
    color: 'purple',
    features: [
      '排名基础积分分配系统',
      '三档积分标准(360/240/120分档)',
      '项目特定分析和评估',
      '技术要素评估系统',
      '赛季积分管理和趋势分析'
    ],
    disciplines: ['大跳台(BA)', '坡面障碍技巧(SS)', 'U型场地(HP)'],
    pointsDirection: '积分越高越好',
    calculationBasis: '基于最终排名',
    seasonStrategy: '最好成绩累计',
    example: {
      input: '最终排名: 第1名',
      output: '积分: 360.00分 (坡面障碍技巧, 一类赛事360分档)'
    }
  }
]

// 积分档次表格数据
const pointsTable = [
  { rank: 1, percentage: '100%', category1: 360, category2: 240, category3: 120 },
  { rank: 2, percentage: '80%', category1: 288, category2: 192, category3: 96 },
  { rank: 3, percentage: '60%', category1: 216, category2: 144, category3: 72 },
  { rank: 4, percentage: '50%', category1: 180, category2: 120, category3: 60 },
  { rank: 5, percentage: '45%', category1: 162, category2: 108, category3: 54 },
  { rank: 6, percentage: '40%', category1: 144, category2: 96, category3: 48 },
  { rank: 7, percentage: '36%', category1: 130, category2: 86, category3: 43 },
  { rank: 8, percentage: '32%', category1: 115, category2: 77, category3: 38 }
]

export default function ScoringSystemsPage() {
  const [selectedSystem, setSelectedSystem] = useState(scoringSystems[0])
  const [activeTab, setActiveTab] = useState('overview')

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'border-blue-500 bg-blue-50 text-blue-700',
      cyan: 'border-cyan-500 bg-cyan-50 text-cyan-700',
      green: 'border-green-500 bg-green-50 text-green-700',
      purple: 'border-purple-500 bg-purple-50 text-purple-700'
    }
    return colors[color as keyof typeof colors] || colors.blue
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <section className="bg-gradient-to-r from-ski-blue to-blue-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              中国滑雪赛事四大积分系统
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8">
              China Skiing Competition Four Scoring Systems
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <div className="text-2xl font-bold">4</div>
                <div className="text-sm text-blue-100">积分系统</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <div className="text-2xl font-bold">13</div>
                <div className="text-sm text-blue-100">支持项目</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <div className="text-2xl font-bold">2</div>
                <div className="text-sm text-blue-100">计算方式</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <div className="text-2xl font-bold">100%</div>
                <div className="text-sm text-blue-100">官方标准</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* System Overview Cards */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-ski-navy mb-4">四大积分系统概览</h2>
            <p className="text-gray-600 text-lg">
              支持高山滑雪、自由式滑雪、单板滑雪全项目的专业积分计算体系
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {scoringSystems.map((system) => {
              const IconComponent = system.icon
              return (
                <div
                  key={system.id}
                  className={`bg-white rounded-lg shadow-lg p-6 cursor-pointer transition-all duration-200 hover:shadow-xl border-2 ${
                    selectedSystem.id === system.id
                      ? getColorClasses(system.color)
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedSystem(system)}
                >
                  <div className="flex items-center justify-center mb-4">
                    <div className={`p-3 rounded-full ${
                      selectedSystem.id === system.id
                        ? `bg-${system.color}-100`
                        : 'bg-gray-100'
                    }`}>
                      <IconComponent className={`h-8 w-8 ${
                        selectedSystem.id === system.id
                          ? `text-${system.color}-600`
                          : 'text-gray-600'
                      }`} />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-center mb-2">
                    {system.title}
                  </h3>
                  <p className="text-sm text-gray-600 text-center mb-3">
                    {system.subtitle}
                  </p>
                  <p className="text-xs text-gray-500 text-center">
                    {system.description}
                  </p>
                </div>
              )
            })}
          </div>

          {/* Detailed System Information */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Tabs */}
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6">
                {[
                  { id: 'overview', label: '系统概览', icon: Info },
                  { id: 'calculation', label: '计算方式', icon: Calculator },
                  { id: 'example', label: '计算示例', icon: BarChart3 }
                ].map((tab) => {
                  const TabIcon = tab.icon
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                        activeTab === tab.id
                          ? 'border-ski-blue text-ski-blue'
                          : 'border-transparent text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <TabIcon className="h-4 w-4" />
                        <span>{tab.label}</span>
                      </div>
                    </button>
                  )
                })}
              </nav>
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {activeTab === 'overview' && (
                <div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-2xl font-bold text-ski-navy mb-4">
                        {selectedSystem.title}
                      </h3>
                      <p className="text-gray-600 mb-6">{selectedSystem.description}</p>

                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <span className="font-medium">积分方向</span>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            selectedSystem.pointsDirection.includes('低')
                              ? 'bg-red-100 text-red-700'
                              : 'bg-green-100 text-green-700'
                          }`}>
                            {selectedSystem.pointsDirection}
                          </span>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <span className="font-medium">计算基础</span>
                          <span className="text-gray-700">{selectedSystem.calculationBasis}</span>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <span className="font-medium">赛季策略</span>
                          <span className="text-gray-700">{selectedSystem.seasonStrategy}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-ski-navy mb-4">系统特点</h4>
                      <ul className="space-y-3 mb-6">
                        {selectedSystem.features.map((feature, index) => (
                          <li key={index} className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{feature}</span>
                          </li>
                        ))}
                      </ul>

                      <h4 className="text-lg font-semibold text-ski-navy mb-4">适用项目</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedSystem.disciplines.map((discipline, index) => (
                          <span
                            key={index}
                            className={`px-3 py-1 rounded-full text-sm font-medium ${getColorClasses(selectedSystem.color)}`}
                          >
                            {discipline}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'calculation' && (
                <div>
                  {selectedSystem.id === 'alpine' || selectedSystem.id === 'snowboard-alpine' ? (
                    <div className="space-y-6">
                      <h3 className="text-xl font-bold text-ski-navy">时间基础积分计算</h3>

                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                        <h4 className="font-semibold text-blue-900 mb-3">核心公式</h4>
                        <div className="font-mono text-lg bg-white p-4 rounded border">
                          P = F × (Tx/To - 1)
                        </div>
                        <div className="mt-4 space-y-2 text-sm text-blue-800">
                          <p><strong>P</strong> = 基础比赛积分</p>
                          <p><strong>F</strong> = 项目系数 (高山滑雪: DH=1250, SL=730, GS=1010, SG=1190, AC=1360)</p>
                          <p><strong>Tx</strong> = 运动员时间</p>
                          <p><strong>To</strong> = 冠军时间</p>
                        </div>
                      </div>

                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                        <h4 className="font-semibold text-gray-900 mb-3">最终积分计算</h4>
                        <div className="font-mono text-lg bg-white p-4 rounded border mb-4">
                          最终积分 = (基础积分 + 判罚分) × 赛事系数
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-center">
                          <div className="bg-white p-4 rounded border">
                            <div className="text-2xl font-bold text-blue-600">1.0</div>
                            <div className="text-sm text-gray-600">A级赛事</div>
                          </div>
                          <div className="bg-white p-4 rounded border">
                            <div className="text-2xl font-bold text-green-600">0.6</div>
                            <div className="text-sm text-gray-600">B级赛事</div>
                          </div>
                          <div className="bg-white p-4 rounded border">
                            <div className="text-2xl font-bold text-orange-600">0.3</div>
                            <div className="text-sm text-gray-600">C级赛事</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <h3 className="text-xl font-bold text-ski-navy">排名基础积分分配</h3>

                      <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                        <h4 className="font-semibold text-green-900 mb-3">积分分配原则</h4>
                        <p className="text-green-800 mb-4">
                          根据最终排名按固定比例分配积分，第1名获得100%积分，其他名次按比例递减
                        </p>
                        <div className="overflow-x-auto">
                          <table className="min-w-full bg-white rounded border">
                            <thead className="bg-gray-50">
                              <tr>
                                <th className="px-4 py-2 text-left">排名</th>
                                <th className="px-4 py-2 text-left">积分比例</th>
                                <th className="px-4 py-2 text-left">一类赛事(360)</th>
                                <th className="px-4 py-2 text-left">二类赛事(240)</th>
                                <th className="px-4 py-2 text-left">三类赛事(120)</th>
                              </tr>
                            </thead>
                            <tbody>
                              {pointsTable.map((row, index) => (
                                <tr key={index} className="border-t">
                                  <td className="px-4 py-2 font-medium">第{row.rank}名</td>
                                  <td className="px-4 py-2">{row.percentage}</td>
                                  <td className="px-4 py-2 text-blue-600 font-medium">{row.category1}</td>
                                  <td className="px-4 py-2 text-green-600 font-medium">{row.category2}</td>
                                  <td className="px-4 py-2 text-orange-600 font-medium">{row.category3}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'example' && (
                <div>
                  <h3 className="text-xl font-bold text-ski-navy mb-6">计算示例</h3>

                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">输入数据</h4>
                        <div className="bg-white p-4 rounded border">
                          <p className="text-gray-700">{selectedSystem.example.input}</p>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">计算结果</h4>
                        <div className="bg-white p-4 rounded border">
                          <p className="text-gray-700 font-medium">{selectedSystem.example.output}</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded">
                      <div className="flex items-center">
                        <AlertCircle className="h-5 w-5 text-blue-600 mr-2" />
                        <span className="text-blue-800 font-medium">积分说明</span>
                      </div>
                      <p className="text-blue-700 mt-2">
                        {selectedSystem.pointsDirection.includes('低')
                          ? '在低分制系统中，积分越低表示成绩越好，排名越高'
                          : '在高分制系统中，积分越高表示成绩越好，排名越高'
                        }
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Technical Implementation Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-ski-navy mb-4">技术实现</h2>
            <p className="text-gray-600 text-lg">
              基于TypeScript + Next.js的现代化积分计算引擎
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calculator className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-ski-navy mb-3">统一计算引擎</h3>
              <p className="text-gray-600">
                四大积分系统使用统一的接口调用，自动路由到对应的积分系统，确保计算准确性
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-ski-navy mb-3">跨系统比较</h3>
              <p className="text-gray-600">
                支持不同积分系统之间的成绩比较和分析，提供全面的运动员表现评估
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-ski-navy mb-3">数据可视化</h3>
              <p className="text-gray-600">
                丰富的图表和统计分析功能，直观展示积分变化趋势和运动员表现
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/rules/points"
              className="inline-flex items-center px-6 py-3 bg-ski-blue text-white rounded-lg hover:bg-ski-blue/90 transition-colors font-semibold"
            >
              查看详细规则
              <ArrowRight className="h-5 w-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}