'use client'

import { useState } from 'react'
import { getImagePath } from '@/utils/paths'
import {
  TrendingUp,
  TrendingDown,
  Calendar,
  User,
  Filter,
  Download,
  BarChart3,
  LineChart,
  Target,
  Trophy
} from 'lucide-react'

// 模拟积分变化数据
const mockTrendData = [
  {
    id: 1,
    name: '张伟',
    nationality: 'CHN',
    discipline: 'GS',
    points: [
      { date: '2024-10-15', points: 15.67, event: '长白山站' },
      { date: '2024-11-12', points: 8.45, event: '亚布力站' },
      { date: '2024-12-08', points: 5.23, event: '万龙站' },
      { date: '2024-12-15', points: 0.00, event: '南山站' }
    ],
    trend: 'improving',
    change: -15.67
  },
  {
    id: 2,
    name: '李雪',
    nationality: 'CHN',
    discipline: 'SL',
    points: [
      { date: '2024-10-15', points: 22.34, event: '长白山站' },
      { date: '2024-11-12', points: 18.90, event: '亚布力站' },
      { date: '2024-12-08', points: 12.45, event: '万龙站' },
      { date: '2024-12-15', points: 8.45, event: '南山站' }
    ],
    trend: 'improving',
    change: -13.89
  },
  {
    id: 3,
    name: '王冰',
    nationality: 'CHN',
    discipline: 'DH',
    points: [
      { date: '2024-10-15', points: 8.90, event: '长白山站' },
      { date: '2024-11-12', points: 12.30, event: '亚布力站' },
      { date: '2024-12-08', points: 15.67, event: '万龙站' },
      { date: '2024-12-15', points: 12.30, event: '南山站' }
    ],
    trend: 'declining',
    change: 3.40
  }
]

const disciplines = [
  { code: 'ALL', name: '全部项目' },
  { code: 'DH', name: '速降' },
  { code: 'SL', name: '回转' },
  { code: 'GS', name: '大回转' },
  { code: 'SG', name: '超级大回转' },
  { code: 'AC', name: '全能' }
]

const timeRanges = [
  { code: '3M', name: '近3个月' },
  { code: '6M', name: '近6个月' },
  { code: '1Y', name: '近1年' },
  { code: '2Y', name: '近2年' }
]

export default function TrendsPage() {
  const [selectedDiscipline, setSelectedDiscipline] = useState('ALL')
  const [selectedTimeRange, setSelectedTimeRange] = useState('6M')
  const [selectedAthlete, setSelectedAthlete] = useState<string | null>(null)

  const handleExport = () => {
    alert('积分趋势数据导出功能\n\n将导出以下内容：\n- 运动员积分变化历史\n- 趋势分析图表\n- 统计报告\n\n导出格式：Excel / PDF')
  }

  const getTrendIcon = (trend: string) => {
    if (trend === 'improving') {
      return <TrendingUp className="h-5 w-5 text-green-600" />
    } else if (trend === 'declining') {
      return <TrendingDown className="h-5 w-5 text-red-600" />
    }
    return <BarChart3 className="h-5 w-5 text-gray-600" />
  }

  const getTrendColor = (change: number) => {
    if (change < 0) return 'text-green-600' // 积分降低是好事
    if (change > 0) return 'text-red-600'   // 积分升高是坏事
    return 'text-gray-600'
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
        <h1 className="section-title">中国积分变化趋势</h1>
        <p className="text-gray-600 text-lg">
          跟踪运动员的中国积分变化趋势，分析训练和比赛效果
        </p>
      </div>

      {/* 统计概览 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8 relative z-10">
        <div className="card text-center">
          <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-ski-navy">67%</div>
          <div className="text-sm text-gray-600">积分提升选手</div>
        </div>
        <div className="card text-center">
          <TrendingDown className="h-8 w-8 text-red-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-ski-navy">23%</div>
          <div className="text-sm text-gray-600">积分下滑选手</div>
        </div>
        <div className="card text-center">
          <Target className="h-8 w-8 text-blue-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-ski-navy">15.2</div>
          <div className="text-sm text-gray-600">平均积分改善</div>
        </div>
        <div className="card text-center">
          <Trophy className="h-8 w-8 text-purple-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-ski-navy">3</div>
          <div className="text-sm text-gray-600">冲进前十选手</div>
        </div>
      </div>

      {/* 筛选器 */}
      <div className="card mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">项目</label>
            <select
              value={selectedDiscipline}
              onChange={(e) => setSelectedDiscipline(e.target.value)}
              className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ski-blue focus:border-transparent"
            >
              {disciplines.map((discipline) => (
                <option key={discipline.code} value={discipline.code}>
                  {discipline.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">时间范围</label>
            <select
              value={selectedTimeRange}
              onChange={(e) => setSelectedTimeRange(e.target.value)}
              className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ski-blue focus:border-transparent"
            >
              {timeRanges.map((range) => (
                <option key={range.code} value={range.code}>
                  {range.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">运动员</label>
            <select
              value={selectedAthlete || ''}
              onChange={(e) => setSelectedAthlete(e.target.value || null)}
              className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ski-blue focus:border-transparent"
            >
              <option value="">全部运动员</option>
              {mockTrendData.map((athlete) => (
                <option key={athlete.id} value={athlete.name}>
                  {athlete.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={handleExport}
              className="btn-secondary w-full flex items-center justify-center"
            >
              <Download className="h-4 w-4 mr-2" />
              导出趋势
            </button>
          </div>
        </div>
      </div>

      {/* 趋势图表区域 */}
      <div className="card mb-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-ski-navy">积分变化图表</h3>
          <div className="flex items-center space-x-2">
            <button className="px-3 py-1 text-sm bg-ski-blue text-white rounded-md hover:bg-ski-blue/90 transition-colors">
              线形图
            </button>
            <button className="px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors">
              柱状图
            </button>
          </div>
        </div>

        {/* 交互式图表区域 */}
        <div className="bg-gradient-to-br from-ski-ice/20 to-white rounded-lg p-6 border border-ski-blue/10">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-ski-blue rounded-full"></div>
                <span className="text-sm text-gray-600">张伟 (GS)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-600">李雪 (SL)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span className="text-sm text-gray-600">王冰 (DH)</span>
              </div>
            </div>
            <div className="text-xs text-gray-500">点击数据点查看详情</div>
          </div>

          {/* 模拟图表 */}
          <div className="relative h-64 bg-white rounded border">
            <div className="absolute inset-4">
              <svg className="w-full h-full" viewBox="0 0 400 200">
                {/* 网格线 */}
                <defs>
                  <pattern id="grid" width="40" height="25" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 25" fill="none" stroke="#f0f0f0" strokeWidth="1"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />

                {/* 张伟的趋势线 */}
                <polyline
                  fill="none"
                  stroke="#2563eb"
                  strokeWidth="3"
                  points="40,150 120,120 200,80 280,40"
                  className="hover:stroke-ski-blue/80 transition-colors cursor-pointer"
                />

                {/* 李雪的趋势线 */}
                <polyline
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="3"
                  points="40,160 120,140 200,100 280,70"
                  className="hover:stroke-green-400 transition-colors cursor-pointer"
                />

                {/* 王冰的趋势线 */}
                <polyline
                  fill="none"
                  stroke="#f59e0b"
                  strokeWidth="3"
                  points="40,100 120,110 200,130 280,115"
                  className="hover:stroke-yellow-400 transition-colors cursor-pointer"
                />

                {/* 数据点 */}
                <circle cx="40" cy="150" r="4" fill="#2563eb" className="hover:r-6 transition-all cursor-pointer"/>
                <circle cx="120" cy="120" r="4" fill="#2563eb" className="hover:r-6 transition-all cursor-pointer"/>
                <circle cx="200" cy="80" r="4" fill="#2563eb" className="hover:r-6 transition-all cursor-pointer"/>
                <circle cx="280" cy="40" r="4" fill="#2563eb" className="hover:r-6 transition-all cursor-pointer"/>

                <circle cx="40" cy="160" r="4" fill="#10b981" className="hover:r-6 transition-all cursor-pointer"/>
                <circle cx="120" cy="140" r="4" fill="#10b981" className="hover:r-6 transition-all cursor-pointer"/>
                <circle cx="200" cy="100" r="4" fill="#10b981" className="hover:r-6 transition-all cursor-pointer"/>
                <circle cx="280" cy="70" r="4" fill="#10b981" className="hover:r-6 transition-all cursor-pointer"/>

                <circle cx="40" cy="100" r="4" fill="#f59e0b" className="hover:r-6 transition-all cursor-pointer"/>
                <circle cx="120" cy="110" r="4" fill="#f59e0b" className="hover:r-6 transition-all cursor-pointer"/>
                <circle cx="200" cy="130" r="4" fill="#f59e0b" className="hover:r-6 transition-all cursor-pointer"/>
                <circle cx="280" cy="115" r="4" fill="#f59e0b" className="hover:r-6 transition-all cursor-pointer"/>
              </svg>

              {/* X轴标签 */}
              <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-500 mt-2">
                <span>10月</span>
                <span>11月</span>
                <span>12月</span>
                <span>1月</span>
              </div>
            </div>

            {/* Y轴标签 */}
            <div className="absolute left-0 top-4 bottom-4 flex flex-col justify-between text-xs text-gray-500 -ml-8">
              <span>0</span>
              <span>10</span>
              <span>20</span>
              <span>30</span>
            </div>
          </div>

          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <div className="flex items-center text-sm text-blue-800">
              <Target className="h-4 w-4 mr-2" />
              <span className="font-medium">趋势分析：</span>
              <span className="ml-2">张伟和李雪积分持续下降（水平提升），王冰积分波动较大需要关注</span>
            </div>
          </div>
        </div>
      </div>

      {/* 运动员趋势列表 */}
      <div className="card">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-ski-navy">运动员积分趋势</h3>
          <div className="text-sm text-gray-500">
            显示 {mockTrendData.length} 名运动员
          </div>
        </div>

        <div className="space-y-6">
          {mockTrendData.map((athlete) => (
            <div key={athlete.id} className="border border-gray-200 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-ski-blue text-white rounded-full flex items-center justify-center font-semibold">
                    {athlete.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">{athlete.name}</h4>
                    <div className="flex items-center space-x-3 text-sm text-gray-600">
                      <span>{athlete.nationality}</span>
                      <span>•</span>
                      <span>{athlete.discipline}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  {getTrendIcon(athlete.trend)}
                  <div className="text-right">
                    <div className="text-lg font-semibold text-gray-900">
                      {athlete.points[athlete.points.length - 1].points.toFixed(2)}
                    </div>
                    <div className={`text-sm font-medium ${getTrendColor(athlete.change)}`}>
                      {athlete.change > 0 ? '+' : ''}{athlete.change.toFixed(2)}
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {athlete.points.map((point, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-3">
                    <div className="text-sm font-medium text-gray-900">{point.event}</div>
                    <div className="text-xs text-gray-600 mb-1">{point.date}</div>
                    <div className="text-lg font-semibold text-ski-blue">{point.points.toFixed(2)}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 趋势分析说明 */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold text-ski-navy mb-3">趋势分析说明</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>• 积分越低表示运动员水平越高</li>
            <li>• 负变化值表示积分改善（水平提升）</li>
            <li>• 正变化值表示积分下滑（需要关注）</li>
            <li>• 建议重点关注持续上升的积分趋势</li>
          </ul>
        </div>
        <div className="card">
          <h3 className="text-lg font-semibold text-ski-navy mb-3">数据更新</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>• 中国积分数据每21天更新一次</li>
            <li>• 趋势分析基于最近的有效成绩</li>
            <li>• 数据来源：中国国内官方比赛结果</li>
            <li>• 最后更新：2024-12-15</li>
          </ul>
        </div>
      </div>
    </div>
  )
}