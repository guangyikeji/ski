'use client'

import { useState } from 'react'
import { getImagePath } from '@/utils/paths'
import {
  TrendingUp,
  TrendingDown,
  Minus,
  Users,
  Trophy,
  Award,
  Calendar,
  ArrowUp,
  ArrowDown,
  Filter,
  Download,
  RefreshCw
} from 'lucide-react'

interface RankingChange {
  athleteId: string
  name: string
  region: string
  discipline: string
  currentRank: number
  previousRank: number
  change: number
  currentPoints: number
  previousPoints: number
  pointsChange: number
  trend: 'up' | 'down' | 'stable'
  fisCode: string
}

interface RankingPeriod {
  date: string
  label: string
  rankings: RankingChange[]
}

const mockRankingData: RankingPeriod[] = [
  {
    date: '2024-12-15',
    label: '2024年12月第二期',
    rankings: [
      {
        athleteId: '1',
        name: '张伟',
        region: '黑龙江',
        discipline: 'GS',
        currentRank: 1,
        previousRank: 3,
        change: 2,
        currentPoints: 15.80,
        previousPoints: 43.60,
        pointsChange: -27.80,
        trend: 'up',
        fisCode: '125001'
      },
      {
        athleteId: '2',
        name: '李雪',
        region: '吉林',
        discipline: 'SL',
        currentRank: 2,
        previousRank: 2,
        change: 0,
        currentPoints: 28.00,
        previousPoints: 35.20,
        pointsChange: -7.20,
        trend: 'stable',
        fisCode: '125002'
      },
      {
        athleteId: '3',
        name: '王强',
        region: '北京',
        discipline: 'SG',
        currentRank: 3,
        previousRank: 1,
        change: -2,
        currentPoints: 34.40,
        previousPoints: 25.60,
        pointsChange: 8.80,
        trend: 'down',
        fisCode: '125003'
      },
      {
        athleteId: '4',
        name: '刘敏',
        region: '河北',
        discipline: 'GS',
        currentRank: 4,
        previousRank: 6,
        change: 2,
        currentPoints: 41.23,
        previousPoints: 58.90,
        pointsChange: -17.67,
        trend: 'up',
        fisCode: '125004'
      },
      {
        athleteId: '5',
        name: '陈峰',
        region: '内蒙古',
        discipline: 'DH',
        currentRank: 5,
        previousRank: 4,
        change: -1,
        currentPoints: 45.67,
        previousPoints: 42.30,
        pointsChange: 3.37,
        trend: 'down',
        fisCode: '125005'
      },
      {
        athleteId: '6',
        name: '赵雪梅',
        region: '吉林',
        discipline: 'SL',
        currentRank: 6,
        previousRank: 8,
        change: 2,
        currentPoints: 47.89,
        previousPoints: 65.40,
        pointsChange: -17.51,
        trend: 'up',
        fisCode: '125006'
      },
      {
        athleteId: '7',
        name: '孙华',
        region: '新疆',
        discipline: 'GS',
        currentRank: 7,
        previousRank: 5,
        change: -2,
        currentPoints: 52.34,
        previousPoints: 48.90,
        pointsChange: 3.44,
        trend: 'down',
        fisCode: '125007'
      },
      {
        athleteId: '8',
        name: '周丽',
        region: '黑龙江',
        discipline: 'SG',
        currentRank: 8,
        previousRank: 7,
        change: -1,
        currentPoints: 54.76,
        previousPoints: 51.20,
        pointsChange: 3.56,
        trend: 'down',
        fisCode: '125008'
      },
      {
        athleteId: '9',
        name: '马建国',
        region: '北京',
        discipline: 'DH',
        currentRank: 9,
        previousRank: 12,
        change: 3,
        currentPoints: 58.90,
        previousPoints: 75.60,
        pointsChange: -16.70,
        trend: 'up',
        fisCode: '125009'
      },
      {
        athleteId: '10',
        name: '林雅',
        region: '河北',
        discipline: 'SL',
        currentRank: 10,
        previousRank: 9,
        change: -1,
        currentPoints: 61.45,
        previousPoints: 59.80,
        pointsChange: 1.65,
        trend: 'down',
        fisCode: '125010'
      }
    ]
  }
]

const disciplineNames = {
  'SL': '回转',
  'GS': '大回转',
  'SG': '超级大回转',
  'DH': '速降',
  'AC': '全能'
}

export default function AthleteRankingsPage() {
  const [selectedDiscipline, setSelectedDiscipline] = useState('all')
  const [selectedRegion, setSelectedRegion] = useState('all')
  const [selectedTrend, setSelectedTrend] = useState('all')
  const [selectedPeriod, setSelectedPeriod] = useState(0)

  const currentPeriod = mockRankingData[selectedPeriod]

  const filteredRankings = currentPeriod.rankings.filter(ranking => {
    const matchDiscipline = selectedDiscipline === 'all' || ranking.discipline === selectedDiscipline
    const matchRegion = selectedRegion === 'all' || ranking.region === selectedRegion
    const matchTrend = selectedTrend === 'all' || ranking.trend === selectedTrend
    return matchDiscipline && matchRegion && matchTrend
  })

  const getRankChangeIcon = (change: number) => {
    if (change > 0) {
      return <ArrowUp className="h-4 w-4 text-green-600" />
    } else if (change < 0) {
      return <ArrowDown className="h-4 w-4 text-red-600" />
    } else {
      return <Minus className="h-4 w-4 text-gray-400" />
    }
  }

  const getRankChangeColor = (change: number) => {
    if (change > 0) return 'text-green-600 bg-green-50'
    if (change < 0) return 'text-red-600 bg-red-50'
    return 'text-gray-600 bg-gray-50'
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

  // 统计数据
  const stats = {
    totalAthletes: currentPeriod.rankings.length,
    risingAthletes: currentPeriod.rankings.filter(r => r.trend === 'up').length,
    fallingAthletes: currentPeriod.rankings.filter(r => r.trend === 'down').length,
    stableAthletes: currentPeriod.rankings.filter(r => r.trend === 'stable').length
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
        <h1 className="section-title">排名变化</h1>
        <p className="text-gray-600 text-lg">运动员积分排名变化趋势分析</p>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8 relative z-10">
        <div className="card text-center">
          <Users className="h-8 w-8 text-ski-blue mx-auto mb-2" />
          <div className="text-2xl font-bold text-ski-navy">{stats.totalAthletes}</div>
          <div className="text-sm text-gray-600">参与排名</div>
        </div>
        <div className="card text-center">
          <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-ski-navy">{stats.risingAthletes}</div>
          <div className="text-sm text-gray-600">排名上升</div>
        </div>
        <div className="card text-center">
          <TrendingDown className="h-8 w-8 text-red-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-ski-navy">{stats.fallingAthletes}</div>
          <div className="text-sm text-gray-600">排名下降</div>
        </div>
        <div className="card text-center">
          <Minus className="h-8 w-8 text-gray-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-ski-navy">{stats.stableAthletes}</div>
          <div className="text-sm text-gray-600">排名稳定</div>
        </div>
      </div>

      {/* 筛选控件 */}
      <div className="card mb-8 relative z-10">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">排名期次:</span>
          </div>

          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(parseInt(e.target.value))}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ski-blue"
          >
            {mockRankingData.map((period, index) => (
              <option key={index} value={index}>{period.label}</option>
            ))}
          </select>

          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">筛选:</span>
          </div>

          <select
            value={selectedDiscipline}
            onChange={(e) => setSelectedDiscipline(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ski-blue"
          >
            <option value="all">全部项目</option>
            <option value="SL">回转</option>
            <option value="GS">大回转</option>
            <option value="SG">超级大回转</option>
            <option value="DH">速降</option>
          </select>

          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ski-blue"
          >
            <option value="all">全部地区</option>
            <option value="黑龙江">黑龙江</option>
            <option value="吉林">吉林</option>
            <option value="北京">北京</option>
            <option value="河北">河北</option>
            <option value="内蒙古">内蒙古</option>
            <option value="新疆">新疆</option>
          </select>

          <select
            value={selectedTrend}
            onChange={(e) => setSelectedTrend(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ski-blue"
          >
            <option value="all">全部趋势</option>
            <option value="up">排名上升</option>
            <option value="down">排名下降</option>
            <option value="stable">排名稳定</option>
          </select>

          <div className="flex space-x-2 ml-auto">
            <button className="btn-secondary flex items-center">
              <RefreshCw className="h-4 w-4 mr-2" />
              刷新
            </button>
            <button className="btn-secondary flex items-center">
              <Download className="h-4 w-4 mr-2" />
              导出
            </button>
          </div>
        </div>
      </div>

      {/* 排名变化表格 */}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden relative z-10">
        <div className="bg-gray-50 px-6 py-4 border-b">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-ski-navy">
              {currentPeriod.label} 排名变化
            </h3>
            <span className="text-sm text-gray-600">
              共 {filteredRankings.length} 位运动员
            </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  当前排名
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  运动员
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  项目
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  地区
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  排名变化
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  当前积分
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  积分变化
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  趋势
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredRankings.map((ranking) => (
                <tr key={ranking.athleteId} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                        ranking.currentRank === 1 ? 'bg-yellow-500' :
                        ranking.currentRank === 2 ? 'bg-gray-400' :
                        ranking.currentRank === 3 ? 'bg-orange-500' : 'bg-gray-500'
                      }`}>
                        {ranking.currentRank}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-8 w-8">
                        <div className="h-8 w-8 rounded-full bg-ski-blue flex items-center justify-center text-white text-sm font-semibold">
                          {ranking.name.charAt(0)}
                        </div>
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">
                          {ranking.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {ranking.fisCode}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-ski-ice text-ski-blue">
                      {disciplineNames[ranking.discipline as keyof typeof disciplineNames]}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900">{ranking.region}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-500">
                        {ranking.previousRank} → {ranking.currentRank}
                      </span>
                      <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getRankChangeColor(ranking.change)}`}>
                        {getRankChangeIcon(ranking.change)}
                        <span className="ml-1">
                          {ranking.change > 0 ? `+${ranking.change}` : ranking.change === 0 ? '0' : ranking.change}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-semibold text-ski-blue">
                      {ranking.currentPoints.toFixed(2)}
                    </div>
                    <div className="text-xs text-gray-500">
                      (上期: {ranking.previousPoints.toFixed(2)})
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`text-sm font-medium ${
                      ranking.pointsChange < 0 ? 'text-green-600' : ranking.pointsChange > 0 ? 'text-red-600' : 'text-gray-600'
                    }`}>
                      {ranking.pointsChange > 0 ? '+' : ''}{ranking.pointsChange.toFixed(2)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getTrendIcon(ranking.trend)}
                      <span className={`ml-1 text-sm ${
                        ranking.trend === 'up' ? 'text-green-600' :
                        ranking.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                      }`}>
                        {ranking.trend === 'up' ? '上升' : ranking.trend === 'down' ? '下降' : '稳定'}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredRankings.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Trophy className="h-12 w-12 mx-auto mb-2 opacity-50" />
            <p>暂无符合条件的排名数据</p>
          </div>
        )}
      </div>

      {/* 分析总结 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 relative z-10">
        <div className="card">
          <h3 className="text-lg font-semibold text-ski-navy mb-4 flex items-center">
            <Award className="h-5 w-5 mr-2" />
            本期亮点
          </h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-center">
              <TrendingUp className="h-4 w-4 text-green-600 mr-2" />
              张伟排名从第3升至第1，积分大幅提升27.80分
            </li>
            <li className="flex items-center">
              <Trophy className="h-4 w-4 text-yellow-600 mr-2" />
              前三名竞争激烈，积分差距缩小至18.6分
            </li>
            <li className="flex items-center">
              <Users className="h-4 w-4 text-ski-blue mr-2" />
              60%的运动员排名发生变化，竞技水平提升明显
            </li>
          </ul>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-ski-navy mb-4">变化趋势</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">排名上升人数</span>
              <div className="flex items-center">
                <div className="w-20 bg-gray-200 rounded-full h-2 mr-2">
                  <div
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: `${(stats.risingAthletes / stats.totalAthletes) * 100}%` }}
                  ></div>
                </div>
                <span className="text-sm font-semibold text-green-600">{stats.risingAthletes}</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">排名下降人数</span>
              <div className="flex items-center">
                <div className="w-20 bg-gray-200 rounded-full h-2 mr-2">
                  <div
                    className="bg-red-500 h-2 rounded-full"
                    style={{ width: `${(stats.fallingAthletes / stats.totalAthletes) * 100}%` }}
                  ></div>
                </div>
                <span className="text-sm font-semibold text-red-600">{stats.fallingAthletes}</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">排名稳定人数</span>
              <div className="flex items-center">
                <div className="w-20 bg-gray-200 rounded-full h-2 mr-2">
                  <div
                    className="bg-gray-500 h-2 rounded-full"
                    style={{ width: `${(stats.stableAthletes / stats.totalAthletes) * 100}%` }}
                  ></div>
                </div>
                <span className="text-sm font-semibold text-gray-600">{stats.stableAthletes}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}