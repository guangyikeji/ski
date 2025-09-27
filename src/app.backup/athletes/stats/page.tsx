'use client'

import { useState } from 'react'
import { getImagePath } from '@/utils/paths'
import {
  BarChart3,
  TrendingUp,
  Calendar,
  Trophy,
  Target,
  Users,
  Medal,
  Award,
  Filter,
  Download,
  PieChart,
  Activity,
  Star
} from 'lucide-react'

// 模拟统计数据
const mockStats = {
  overview: {
    totalAthletes: 127,
    activeAthletes: 89,
    totalRaces: 245,
    totalPodiums: 78
  },
  disciplines: [
    { name: '大回转', athletes: 45, races: 89, podiums: 28, avgPoints: 35.6 },
    { name: '回转', athletes: 42, races: 76, podiums: 24, avgPoints: 38.2 },
    { name: '速降', athletes: 28, races: 48, podiums: 16, avgPoints: 42.8 },
    { name: '超级大回转', athletes: 31, races: 32, podiums: 10, avgPoints: 41.3 }
  ],
  provinces: [
    { name: '黑龙江', athletes: 23, bestPoints: 8.45, podiums: 18 },
    { name: '吉林', athletes: 19, bestPoints: 12.30, podiums: 15 },
    { name: '北京', athletes: 16, bestPoints: 15.67, podiums: 12 },
    { name: '河北', athletes: 14, bestPoints: 18.92, podiums: 10 },
    { name: '新疆', athletes: 12, bestPoints: 21.45, podiums: 8 },
    { name: '其他', athletes: 43, bestPoints: 28.76, podiums: 15 }
  ],
  ageGroups: [
    { range: '18-22', count: 32, avgPoints: 45.2, podiums: 12 },
    { range: '23-27', count: 48, avgPoints: 38.6, podiums: 35 },
    { range: '28-32', count: 34, avgPoints: 42.1, podiums: 23 },
    { range: '33+', count: 13, avgPoints: 48.7, podiums: 8 }
  ],
  monthlyPerformance: [
    { month: '9月', races: 18, avgPoints: 42.3, podiums: 6 },
    { month: '10月', races: 24, avgPoints: 38.7, podiums: 8 },
    { month: '11月', races: 32, avgPoints: 35.9, podiums: 12 },
    { month: '12月', races: 28, avgPoints: 33.2, podiums: 10 }
  ]
}

const disciplineColors = [
  'bg-blue-500',
  'bg-green-500',
  'bg-yellow-500',
  'bg-purple-500'
]

const provinceColors = [
  'bg-red-500',
  'bg-blue-500',
  'bg-green-500',
  'bg-yellow-500',
  'bg-purple-500',
  'bg-gray-500'
]

export default function AthleteStatsPage() {
  const [selectedView, setSelectedView] = useState<'overview' | 'disciplines' | 'provinces' | 'age'>('overview')
  const [selectedPeriod, setSelectedPeriod] = useState('current-season')

  const handleExport = () => {
    alert('导出统计数据功能\n\n将导出：\n- 完整统计报告\n- 数据图表\n- 分析总结\n\n格式：Excel / PDF / PowerPoint')
  }

  const getMaxValue = (data: any[], key: string) => {
    return Math.max(...data.map(item => item[key]))
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
      {/* 背景装饰 */}
      <div className="absolute top-0 right-0 w-40 h-40 opacity-15 rounded-full overflow-hidden">
        <img
          src={getImagePath("/images/ski-bg.jpg")}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      {/* Header */}
      <div className="mb-8 relative z-10">
        <h1 className="section-title">运动员成绩统计</h1>
        <p className="text-gray-600 text-lg">
          全面的运动员成绩数据分析，帮助了解训练效果和发展趋势
        </p>
      </div>

      {/* 操作栏 */}
      <div className="card mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex gap-4">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="py-2 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ski-blue focus:border-transparent"
            >
              <option value="current-season">当前赛季</option>
              <option value="last-season">上个赛季</option>
              <option value="last-12-months">近12个月</option>
              <option value="all-time">历史全部</option>
            </select>

            <div className="flex bg-gray-100 rounded-lg p-1">
              {[
                { key: 'overview', label: '总览' },
                { key: 'disciplines', label: '项目' },
                { key: 'provinces', label: '地区' },
                { key: 'age', label: '年龄' }
              ].map((view) => (
                <button
                  key={view.key}
                  onClick={() => setSelectedView(view.key as any)}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                    selectedView === view.key
                      ? 'bg-white text-ski-blue shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {view.label}
                </button>
              ))}
            </div>
          </div>

          <button onClick={handleExport} className="btn-secondary flex items-center">
            <Download className="h-4 w-4 mr-2" />
            导出报告
          </button>
        </div>
      </div>

      {/* 总览统计 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="card text-center">
          <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-ski-navy">{mockStats.overview.totalAthletes}</div>
          <div className="text-sm text-gray-600">注册运动员</div>
          <div className="text-xs text-gray-500 mt-1">活跃：{mockStats.overview.activeAthletes}人</div>
        </div>
        <div className="card text-center">
          <Activity className="h-8 w-8 text-green-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-ski-navy">{mockStats.overview.totalRaces}</div>
          <div className="text-sm text-gray-600">参赛总次数</div>
          <div className="text-xs text-gray-500 mt-1">本赛季数据</div>
        </div>
        <div className="card text-center">
          <Trophy className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-ski-navy">{mockStats.overview.totalPodiums}</div>
          <div className="text-sm text-gray-600">登台总次数</div>
          <div className="text-xs text-gray-500 mt-1">前三名成绩</div>
        </div>
        <div className="card text-center">
          <Target className="h-8 w-8 text-purple-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-ski-navy">31.8%</div>
          <div className="text-sm text-gray-600">登台率</div>
          <div className="text-xs text-gray-500 mt-1">总体水平</div>
        </div>
      </div>

      {/* 详细统计内容 */}
      {selectedView === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 月度表现趋势 */}
          <div className="card">
            <h3 className="text-xl font-semibold text-ski-navy mb-6">月度表现趋势</h3>
            <div className="space-y-4">
              {mockStats.monthlyPerformance.map((month, index) => (
                <div key={month.month} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-ski-blue text-white rounded-full flex items-center justify-center text-sm font-semibold">
                      {month.month.charAt(0)}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{month.month}</div>
                      <div className="text-sm text-gray-600">{month.races}场比赛</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-ski-navy">{month.avgPoints}</div>
                    <div className="text-sm text-gray-600">{month.podiums}次登台</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 成绩分布 */}
          <div className="card">
            <h3 className="text-xl font-semibold text-ski-navy mb-6">成绩分布</h3>
            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <PieChart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h4 className="text-lg font-medium text-gray-700 mb-2">成绩分布图表</h4>
              <p className="text-gray-600">
                显示运动员在不同成绩区间的分布情况，
                包括前三名、前十名和其他名次的占比统计
              </p>
            </div>
          </div>
        </div>
      )}

      {selectedView === 'disciplines' && (
        <div className="card">
          <h3 className="text-xl font-semibold text-ski-navy mb-6">项目统计分析</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mockStats.disciplines.map((discipline, index) => (
              <div key={discipline.name} className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-semibold text-gray-900">{discipline.name}</h4>
                  <div className={`w-4 h-4 ${disciplineColors[index]} rounded-full`}></div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="font-medium text-gray-900">{discipline.athletes}</div>
                    <div className="text-gray-600">参与运动员</div>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{discipline.races}</div>
                    <div className="text-gray-600">比赛场次</div>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{discipline.podiums}</div>
                    <div className="text-gray-600">登台次数</div>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{discipline.avgPoints}</div>
                    <div className="text-gray-600">平均积分</div>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`${disciplineColors[index]} h-2 rounded-full`}
                      style={{ width: `${(discipline.podiums / getMaxValue(mockStats.disciplines, 'podiums')) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedView === 'provinces' && (
        <div className="card">
          <h3 className="text-xl font-semibold text-ski-navy mb-6">地区表现分析</h3>
          <div className="space-y-4">
            {mockStats.provinces.map((province, index) => (
              <div key={province.name} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className={`w-6 h-6 ${provinceColors[index]} rounded-full`}></div>
                  <div>
                    <div className="font-semibold text-gray-900">{province.name}</div>
                    <div className="text-sm text-gray-600">{province.athletes}名运动员</div>
                  </div>
                </div>
                <div className="flex items-center space-x-6 text-sm">
                  <div className="text-center">
                    <div className="font-semibold text-ski-navy">{province.bestPoints}</div>
                    <div className="text-gray-600">最佳积分</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-ski-navy">{province.podiums}</div>
                    <div className="text-gray-600">登台次数</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedView === 'age' && (
        <div className="card">
          <h3 className="text-xl font-semibold text-ski-navy mb-6">年龄组分析</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mockStats.ageGroups.map((group, index) => (
              <div key={group.range} className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-semibold text-gray-900">{group.range}岁</h4>
                  <Star className="h-5 w-5 text-yellow-500" />
                </div>
                <div className="grid grid-cols-3 gap-3 text-sm">
                  <div className="text-center">
                    <div className="font-medium text-gray-900">{group.count}</div>
                    <div className="text-gray-600">人数</div>
                  </div>
                  <div className="text-center">
                    <div className="font-medium text-gray-900">{group.avgPoints}</div>
                    <div className="text-gray-600">平均积分</div>
                  </div>
                  <div className="text-center">
                    <div className="font-medium text-gray-900">{group.podiums}</div>
                    <div className="text-gray-600">登台次数</div>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-ski-blue to-primary-700 h-2 rounded-full"
                      style={{ width: `${(group.count / getMaxValue(mockStats.ageGroups, 'count')) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 数据图表区域 */}
      <div className="mt-8 card">
        <h3 className="text-xl font-semibold text-ski-navy mb-6">数据可视化</h3>
        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <BarChart3 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h4 className="text-lg font-medium text-gray-700 mb-2">交互式图表</h4>
          <p className="text-gray-600">
            提供多种图表类型展示统计数据，包括柱状图、折线图、饼图等，
            支持筛选和钻取分析功能
          </p>
        </div>
      </div>

      {/* 底部说明 */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold text-ski-navy mb-3">统计说明</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>• 数据基于官方认证的比赛成绩</li>
            <li>• 登台率 = 前三名次数 / 总参赛次数</li>
            <li>• 平均积分仅计算有效成绩</li>
            <li>• 不同项目数据分别统计</li>
          </ul>
        </div>
        <div className="card">
          <h3 className="text-lg font-semibold text-ski-navy mb-3">更新频率</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>• 比赛结束后即时更新</li>
            <li>• 统计报告每周生成</li>
            <li>• 年度总结每年发布</li>
            <li>• 最后更新：2024年12月15日</li>
          </ul>
        </div>
      </div>
    </div>
  )
}