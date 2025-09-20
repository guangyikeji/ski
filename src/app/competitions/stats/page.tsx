'use client'

import { useState } from 'react'
import { getImagePath } from '@/utils/paths'
import { exportToCSV, exportToExcel, exportToJSON, formatCompetitionResultsForExport } from '@/utils/exportUtils'
import {
  BarChart3,
  TrendingUp,
  Users,
  Trophy,
  Calendar,
  MapPin,
  Target,
  Award,
  PieChart,
  Activity,
  Download,
  Filter
} from 'lucide-react'

interface CompetitionStats {
  totalCompetitions: number
  totalParticipants: number
  avgParticipantsPerEvent: number
  completionRate: number
  disciplineDistribution: { [key: string]: number }
  regionDistribution: { [key: string]: number }
  ageGroupDistribution: { [key: string]: number }
  monthlyTrends: { month: string; competitions: number; participants: number }[]
  topPerformers: { name: string; wins: number; podiums: number; region: string }[]
}

const mockStats: CompetitionStats = {
  totalCompetitions: 24,
  totalParticipants: 435,
  avgParticipantsPerEvent: 18.1,
  completionRate: 94.2,
  disciplineDistribution: {
    '大回转': 8,
    '回转': 6,
    '超级大回转': 5,
    '速降': 3,
    '全能': 2
  },
  regionDistribution: {
    '黑龙江': 85,
    '吉林': 72,
    '北京': 68,
    '河北': 58,
    '内蒙古': 45,
    '新疆': 38,
    '其他': 69
  },
  ageGroupDistribution: {
    '少年乙组': 125,
    '少年甲组': 98,
    '青年组': 87,
    '成年组': 95,
    '老将组': 30
  },
  monthlyTrends: [
    { month: '2024-07', competitions: 2, participants: 45 },
    { month: '2024-08', competitions: 1, participants: 28 },
    { month: '2024-09', competitions: 3, participants: 67 },
    { month: '2024-10', competitions: 4, participants: 89 },
    { month: '2024-11', competitions: 6, participants: 98 },
    { month: '2024-12', competitions: 8, participants: 108 }
  ],
  topPerformers: [
    { name: '张伟', wins: 8, podiums: 12, region: '黑龙江' },
    { name: '李雪', wins: 6, podiums: 15, region: '吉林' },
    { name: '王强', wins: 5, podiums: 11, region: '北京' },
    { name: '刘敏', wins: 4, podiums: 9, region: '河北' },
    { name: '陈峰', wins: 3, podiums: 8, region: '内蒙古' }
  ]
}

export default function CompetitionStatsPage() {
  const [selectedTimeRange, setSelectedTimeRange] = useState('season')
  const [selectedRegion, setSelectedRegion] = useState('all')

  const handleExport = (format: 'csv' | 'excel' | 'json' = 'csv') => {
    const mockCompetitionResults = mockStats.topPerformers.map((performer, index) => ({
      rank: index + 1,
      athlete: performer.name,
      country: 'CHN',
      time: `1:${20 + index}.${Math.floor(Math.random() * 100).toString().padStart(2, '0')}`,
      gap: index === 0 ? '0.00' : `+${(index * 0.5).toFixed(2)}`,
      fisPoints: index * 10.5
    }))
    const exportDataFormatted = formatCompetitionResultsForExport(mockCompetitionResults, '比赛统计数据')

    switch (format) {
      case 'csv':
        exportToCSV(exportDataFormatted)
        break
      case 'excel':
        exportToExcel(exportDataFormatted)
        break
      case 'json':
        exportToJSON(exportDataFormatted)
        break
    }
  }

  const getColorForIndex = (index: number) => {
    const colors = [
      'bg-ski-blue', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500', 'bg-red-500',
      'bg-indigo-500', 'bg-pink-500', 'bg-gray-500'
    ]
    return colors[index % colors.length]
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
      {/* 背景装饰 */}
      <div className="absolute top-0 right-0 w-40 h-40 opacity-15 rounded-full overflow-hidden">
        <img src={getImagePath("/images/ski-action-2.jpg")} alt="" className="w-full h-full object-cover" />
      </div>
      <div className="absolute bottom-20 left-10 w-32 h-32 opacity-15 rounded-full overflow-hidden">
        <img src={getImagePath("/images/giant-slalom.jpg")} alt="" className="w-full h-full object-cover" />
      </div>

      {/* Header */}
      <div className="text-center mb-8 relative z-10">
        <h1 className="section-title">竞赛统计</h1>
        <p className="text-gray-600 text-lg">全面的竞赛数据分析和统计报告</p>
      </div>

      {/* 筛选控件 */}
      <div className="card mb-8 relative z-10">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">统计范围:</span>
          </div>

          <select
            value={selectedTimeRange}
            onChange={(e) => setSelectedTimeRange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ski-blue"
          >
            <option value="season">本赛季</option>
            <option value="year">本年度</option>
            <option value="quarter">本季度</option>
            <option value="month">本月</option>
          </select>

          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ski-blue"
          >
            <option value="all">全部地区</option>
            <option value="东北">东北地区</option>
            <option value="华北">华北地区</option>
            <option value="西北">西北地区</option>
            <option value="其他">其他地区</option>
          </select>

          <div className="flex space-x-2 ml-auto">
            <div className="relative group">
              <button
                className="btn-secondary flex items-center"
                onClick={() => handleExport('csv')}
              >
                <Download className="h-4 w-4 mr-2" />
                导出报告
              </button>
              <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                <button
                  onClick={() => handleExport('csv')}
                  className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                >
                  导出 CSV
                </button>
                <button
                  onClick={() => handleExport('excel')}
                  className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                >
                  导出 Excel
                </button>
                <button
                  onClick={() => handleExport('json')}
                  className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                >
                  导出 JSON
                </button>
              </div>
            </div>
            <button className="btn-primary flex items-center">
              <BarChart3 className="h-4 w-4 mr-2" />
              详细分析
            </button>
          </div>
        </div>
      </div>

      {/* 核心统计指标 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8 relative z-10">
        <div className="card text-center">
          <Calendar className="h-8 w-8 text-ski-blue mx-auto mb-2" />
          <div className="text-3xl font-bold text-ski-navy">{mockStats.totalCompetitions}</div>
          <div className="text-sm text-gray-600">举办赛事</div>
          <div className="text-xs text-green-600 mt-1">+15% 同比增长</div>
        </div>

        <div className="card text-center">
          <Users className="h-8 w-8 text-green-600 mx-auto mb-2" />
          <div className="text-3xl font-bold text-ski-navy">{mockStats.totalParticipants}</div>
          <div className="text-sm text-gray-600">参赛人次</div>
          <div className="text-xs text-green-600 mt-1">+22% 同比增长</div>
        </div>

        <div className="card text-center">
          <Target className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
          <div className="text-3xl font-bold text-ski-navy">{mockStats.avgParticipantsPerEvent.toFixed(1)}</div>
          <div className="text-sm text-gray-600">平均参赛人数</div>
          <div className="text-xs text-green-600 mt-1">+8% 同比增长</div>
        </div>

        <div className="card text-center">
          <Award className="h-8 w-8 text-purple-600 mx-auto mb-2" />
          <div className="text-3xl font-bold text-ski-navy">{mockStats.completionRate}%</div>
          <div className="text-sm text-gray-600">完赛率</div>
          <div className="text-xs text-green-600 mt-1">+3% 同比增长</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8 relative z-10">
        {/* 项目分布 */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-ski-navy flex items-center">
              <PieChart className="h-6 w-6 mr-2" />
              项目分布
            </h3>
          </div>

          <div className="space-y-4">
            {Object.entries(mockStats.disciplineDistribution).map(([discipline, count], index) => {
              const percentage = (count / mockStats.totalCompetitions) * 100
              return (
                <div key={discipline}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">{discipline}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600">{count}场</span>
                      <span className="text-xs text-gray-500">({percentage.toFixed(1)}%)</span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${getColorForIndex(index)}`}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* 地区分布 */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-ski-navy flex items-center">
              <MapPin className="h-6 w-6 mr-2" />
              地区参与度
            </h3>
          </div>

          <div className="space-y-4">
            {Object.entries(mockStats.regionDistribution)
              .sort(([,a], [,b]) => b - a)
              .slice(0, 5)
              .map(([region, count], index) => {
                const percentage = (count / mockStats.totalParticipants) * 100
                return (
                  <div key={region}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">{region}</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600">{count}人</span>
                        <span className="text-xs text-gray-500">({percentage.toFixed(1)}%)</span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${getColorForIndex(index)}`}
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                )
              })}
          </div>
        </div>
      </div>

      {/* 年龄组分布和月度趋势 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8 relative z-10">
        {/* 年龄组分布 */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-ski-navy flex items-center">
              <Users className="h-6 w-6 mr-2" />
              年龄组分布
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {Object.entries(mockStats.ageGroupDistribution).map(([ageGroup, count], index) => {
              const percentage = (count / mockStats.totalParticipants) * 100
              return (
                <div key={ageGroup} className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-ski-navy mb-1">{count}</div>
                  <div className="text-sm text-gray-600 mb-2">{ageGroup}</div>
                  <div className="text-xs text-gray-500">{percentage.toFixed(1)}%</div>
                </div>
              )
            })}
          </div>
        </div>

        {/* 月度趋势 */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-ski-navy flex items-center">
              <TrendingUp className="h-6 w-6 mr-2" />
              月度趋势
            </h3>
          </div>

          <div className="space-y-4">
            {mockStats.monthlyTrends.map((trend, index) => {
              const maxCompetitions = Math.max(...mockStats.monthlyTrends.map(t => t.competitions))
              const maxParticipants = Math.max(...mockStats.monthlyTrends.map(t => t.participants))
              const competitionPercentage = (trend.competitions / maxCompetitions) * 100
              const participantPercentage = (trend.participants / maxParticipants) * 100

              return (
                <div key={trend.month}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">
                      {trend.month.split('-')[1]}月
                    </span>
                    <div className="text-sm text-gray-600">
                      {trend.competitions}场 / {trend.participants}人
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-ski-blue h-2 rounded-full"
                        style={{ width: `${competitionPercentage}%` }}
                      ></div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: `${participantPercentage}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* 优秀运动员榜单 */}
      <div className="card relative z-10">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-ski-navy flex items-center">
            <Trophy className="h-6 w-6 mr-2" />
            优秀运动员榜单
          </h3>
          <span className="text-sm text-gray-600">本赛季表现统计</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  排名
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  运动员
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  地区
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  获胜次数
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  登台次数
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  登台率
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockStats.topPerformers.map((performer, index) => {
                const podiumRate = (performer.podiums / 20 * 100) // 假设每人平均参赛20次

                return (
                  <tr key={performer.name} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                        index === 0 ? 'bg-yellow-500' :
                        index === 1 ? 'bg-gray-400' :
                        index === 2 ? 'bg-orange-500' : 'bg-gray-500'
                      }`}>
                        {index + 1}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-8 w-8">
                          <div className="h-8 w-8 rounded-full bg-ski-blue flex items-center justify-center text-white text-sm font-semibold">
                            {performer.name.charAt(0)}
                          </div>
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">
                            {performer.name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-900">{performer.region}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Trophy className="h-4 w-4 text-yellow-500 mr-1" />
                        <span className="text-sm font-semibold text-gray-900">{performer.wins}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Award className="h-4 w-4 text-orange-500 mr-1" />
                        <span className="text-sm font-semibold text-gray-900">{performer.podiums}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                          <div
                            className="bg-green-500 h-2 rounded-full"
                            style={{ width: `${Math.min(podiumRate, 100)}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600">{podiumRate.toFixed(0)}%</span>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 总结和建议 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 relative z-10">
        <div className="card">
          <h3 className="text-lg font-semibold text-ski-navy mb-4 flex items-center">
            <Activity className="h-5 w-5 mr-2" />
            数据洞察
          </h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>• 本赛季参赛人数同比增长22%，显示滑雪运动持续升温</li>
            <li>• 大回转项目最受欢迎，占比33.3%</li>
            <li>• 东北地区参与度最高，黑龙江、吉林贡献36%参赛人员</li>
            <li>• 少年乙组参与度最高，青少年是主力军</li>
            <li>• 完赛率94.2%，赛事组织质量优良</li>
          </ul>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-ski-navy mb-4">发展建议</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>• 加强西部地区推广，提高全国覆盖面</li>
            <li>• 增加速降项目比赛，丰富项目结构</li>
            <li>• 优化青少年培养体系，扩大后备人才</li>
            <li>• 提升赛事品质，吸引更多参与者</li>
            <li>• 加强数据分析，指导科学训练</li>
          </ul>
        </div>
      </div>
    </div>
  )
}