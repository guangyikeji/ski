'use client'

import { useState } from 'react'
import { getImagePath } from '@/utils/paths'
import { exportToCSV, exportToExcel, exportToJSON, formatRankingsForExport } from '@/utils/exportUtils'
import {
  Trophy,
  Medal,
  Award,
  TrendingUp,
  TrendingDown,
  Minus,
  Filter,
  Search,
  Download,
  Calendar,
  Users,
  Star
} from 'lucide-react'

const disciplines = {
  ALL: '全部项目',
  DH: '速降',
  SL: '回转',
  GS: '大回转',
  SG: '超级大回转',
  AC: '全能'
}

const categories = {
  ALL: '全部',
  MEN: '男子',
  WOMEN: '女子',
  YOUTH: '青年组'
}

// 模拟数据
const mockRankings = [
  {
    rank: 1,
    name: '张伟',
    nationality: 'CHN',
    points: 0.00,
    trend: 'stable',
    lastRace: '2024-01-15',
    totalRaces: 12,
    category: 'MEN',
    discipline: 'GS',
    bestResult: '1st',
    avatar: '👨'
  },
  {
    rank: 2,
    name: '李雪',
    nationality: 'CHN',
    points: 8.45,
    trend: 'up',
    lastRace: '2024-01-12',
    totalRaces: 10,
    category: 'WOMEN',
    discipline: 'GS',
    bestResult: '2nd',
    avatar: '👩'
  },
  {
    rank: 3,
    name: '王强',
    nationality: 'CHN',
    points: 12.78,
    trend: 'down',
    lastRace: '2024-01-14',
    totalRaces: 15,
    category: 'MEN',
    discipline: 'GS',
    bestResult: '1st',
    avatar: '👨'
  },
  {
    rank: 4,
    name: '刘敏',
    nationality: 'CHN',
    points: 15.23,
    trend: 'up',
    lastRace: '2024-01-13',
    totalRaces: 8,
    category: 'WOMEN',
    discipline: 'GS',
    bestResult: '3rd',
    avatar: '👩'
  },
  {
    rank: 5,
    name: '陈浩',
    nationality: 'CHN',
    points: 18.67,
    trend: 'stable',
    lastRace: '2024-01-10',
    totalRaces: 14,
    category: 'MEN',
    discipline: 'GS',
    bestResult: '2nd',
    avatar: '👨'
  }
]

export default function RankingsPage() {
  const [selectedDiscipline, setSelectedDiscipline] = useState('GS')
  const [selectedCategory, setSelectedCategory] = useState('ALL')
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredRankings, setFilteredRankings] = useState(mockRankings)

  const handleExport = (format: 'csv' | 'excel' | 'json' = 'csv') => {
    const exportDataFormatted = formatRankingsForExport(filteredRankings)
    exportDataFormatted.filename = `${exportDataFormatted.filename}_${selectedDiscipline}_${selectedCategory}`

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

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-green-600" />
      case 'down':
        return <TrendingDown className="h-4 w-4 text-red-600" />
      default:
        return <Minus className="h-4 w-4 text-gray-400" />
    }
  }

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="h-5 w-5 text-yellow-500" />
    if (rank === 2) return <Medal className="h-5 w-5 text-gray-400" />
    if (rank === 3) return <Award className="h-5 w-5 text-amber-600" />
    return null
  }

  const getRankBadge = (rank: number) => {
    if (rank <= 3) {
      const colors = ['bg-yellow-500', 'bg-gray-400', 'bg-amber-600']
      return (
        <div className={`w-8 h-8 ${colors[rank - 1]} text-white rounded-full flex items-center justify-center font-bold text-sm`}>
          {rank}
        </div>
      )
    }
    return (
      <div className="w-8 h-8 bg-gray-200 text-gray-700 rounded-full flex items-center justify-center font-bold text-sm">
        {rank}
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
      {/* 背景装饰 */}
      <div className="absolute top-0 right-0 w-40 h-40 opacity-20 rounded-full overflow-hidden">
        <img
          src={getImagePath("/images/ski-bg.jpg")}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute bottom-10 left-0 w-36 h-36 opacity-20 rounded-full overflow-hidden">
        <img
          src={getImagePath("/images/giant-slalom.jpg")}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      {/* Header */}
      <div className="text-center mb-8 relative z-10">
        <h1 className="section-title">积分排行榜</h1>
        <p className="text-gray-600 text-lg">
          实时更新的滑雪运动员积分排名
        </p>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="card text-center">
          <Users className="h-8 w-8 text-ski-blue mx-auto mb-2" />
          <div className="text-2xl font-bold text-ski-navy">128</div>
          <div className="text-sm text-gray-600">注册运动员</div>
        </div>
        <div className="card text-center">
          <Calendar className="h-8 w-8 text-green-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-ski-navy">24</div>
          <div className="text-sm text-gray-600">本季比赛</div>
        </div>
        <div className="card text-center">
          <Star className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-ski-navy">5</div>
          <div className="text-sm text-gray-600">参赛项目</div>
        </div>
        <div className="card text-center">
          <TrendingUp className="h-8 w-8 text-purple-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-ski-navy">14天</div>
          <div className="text-sm text-gray-600">更新周期</div>
        </div>
      </div>

      {/* 筛选和搜索 */}
      <div className="card mb-8">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">筛选条件:</span>
          </div>

          <select
            value={selectedDiscipline}
            onChange={(e) => setSelectedDiscipline(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ski-blue"
          >
            {Object.entries(disciplines).map(([key, value]) => (
              <option key={key} value={key}>{value}</option>
            ))}
          </select>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ski-blue"
          >
            {Object.entries(categories).map(([key, value]) => (
              <option key={key} value={key}>{value}</option>
            ))}
          </select>

          <div className="relative flex-1 max-w-md">
            <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="搜索运动员姓名..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ski-blue"
            />
          </div>

          <div className="relative group">
            <button
              className="btn-secondary flex items-center"
              onClick={() => handleExport('csv')}
            >
              <Download className="h-4 w-4 mr-2" />
              导出
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
        </div>
      </div>

      {/* 排行榜表格 */}
      <div className="card overflow-hidden">
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
                  积分
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  趋势
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  最近比赛
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  参赛次数
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  最佳成绩
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredRankings.map((athlete, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      {getRankBadge(athlete.rank)}
                      {getRankIcon(athlete.rank)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="text-2xl mr-3">{athlete.avatar}</div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {athlete.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {athlete.nationality} • {categories[athlete.category as keyof typeof categories]}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-lg font-bold text-ski-blue">
                      {athlete.points.toFixed(2)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getTrendIcon(athlete.trend)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {athlete.lastRace}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {athlete.totalRaces} 场
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      athlete.bestResult === '1st' ? 'bg-yellow-100 text-yellow-800' :
                      athlete.bestResult === '2nd' ? 'bg-gray-100 text-gray-800' :
                      athlete.bestResult === '3rd' ? 'bg-amber-100 text-amber-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {athlete.bestResult}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 说明信息 */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold text-ski-navy mb-4">积分说明</h3>
          <div className="space-y-3 text-sm text-gray-600">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
              <span>积分越低代表成绩越好</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
              <span>0分为世界最佳水平</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
              <span>每14天更新一次</span>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-ski-navy mb-4">趋势标识</h3>
          <div className="space-y-3 text-sm text-gray-600">
            <div className="flex items-center">
              <TrendingUp className="h-4 w-4 text-green-600 mr-2" />
              <span>积分上升（成绩提升）</span>
            </div>
            <div className="flex items-center">
              <TrendingDown className="h-4 w-4 text-red-600 mr-2" />
              <span>积分下降（成绩下滑）</span>
            </div>
            <div className="flex items-center">
              <Minus className="h-4 w-4 text-gray-400 mr-2" />
              <span>积分稳定</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}