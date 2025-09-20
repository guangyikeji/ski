'use client'

import { useState } from 'react'
import { getImagePath } from '@/utils/paths'
import { exportToCSV, exportToExcel, exportToJSON, formatAthleteHistoryForExport } from '@/utils/exportUtils'
import {
  TrendingUp,
  TrendingDown,
  Calendar,
  Trophy,
  User,
  BarChart3,
  LineChart,
  Filter,
  Search,
  Download
} from 'lucide-react'

interface PointsHistory {
  date: string
  competition: string
  discipline: string
  rank: number
  time: string
  racePoints: number
  penalty: number
  finalPoints: number
  location: string
}

interface Athlete {
  id: string
  name: string
  fisCode: string
  nationality: string
  region: string
  specialties: string[]
  currentPoints: { [key: string]: number }
  pointsHistory: PointsHistory[]
}

const mockAthletes: Athlete[] = [
  {
    id: '1',
    name: '张伟',
    fisCode: '125001',
    nationality: 'CHN',
    region: '黑龙江',
    specialties: ['大回转', '超级大回转'],
    currentPoints: { GS: 45.67, SG: 52.34 },
    pointsHistory: [
      {
        date: '2024-12-15',
        competition: '2024全国锦标赛',
        discipline: 'GS',
        rank: 1,
        time: '1:23.45',
        racePoints: 0.00,
        penalty: 15.80,
        finalPoints: 15.80,
        location: '长白山'
      },
      {
        date: '2024-12-10',
        competition: '东北地区公开赛',
        discipline: 'GS',
        rank: 3,
        time: '1:25.67',
        racePoints: 25.40,
        penalty: 18.20,
        finalPoints: 43.60,
        location: '亚布力'
      },
      {
        date: '2024-12-05',
        competition: '北京站比赛',
        discipline: 'SG',
        rank: 2,
        time: '1:15.23',
        racePoints: 12.30,
        penalty: 22.10,
        finalPoints: 34.40,
        location: '南山滑雪场'
      },
      {
        date: '2024-11-28',
        competition: '全国青年赛',
        discipline: 'GS',
        rank: 4,
        time: '1:26.89',
        racePoints: 35.20,
        penalty: 19.50,
        finalPoints: 54.70,
        location: '崇礼'
      },
      {
        date: '2024-11-20',
        competition: '哈尔滨站',
        discipline: 'SG',
        rank: 1,
        time: '1:14.56',
        racePoints: 0.00,
        penalty: 25.60,
        finalPoints: 25.60,
        location: '哈尔滨'
      }
    ]
  },
  {
    id: '2',
    name: '李雪',
    fisCode: '125002',
    nationality: 'CHN',
    region: '吉林',
    specialties: ['回转', '大回转'],
    currentPoints: { SL: 38.45, GS: 41.23 },
    pointsHistory: [
      {
        date: '2024-12-15',
        competition: '2024全国锦标赛',
        discipline: 'SL',
        rank: 2,
        time: '1:35.23',
        racePoints: 15.60,
        penalty: 12.40,
        finalPoints: 28.00,
        location: '长白山'
      },
      {
        date: '2024-12-08',
        competition: '吉林省锦标赛',
        discipline: 'GS',
        rank: 1,
        time: '1:28.90',
        racePoints: 0.00,
        penalty: 20.30,
        finalPoints: 20.30,
        location: '万科松花湖'
      }
    ]
  }
]

export default function AthletesHistoryPage() {
  const [selectedAthlete, setSelectedAthlete] = useState<Athlete>(mockAthletes[0])
  const [selectedDiscipline, setSelectedDiscipline] = useState('all')
  const [dateRange, setDateRange] = useState('6months')
  const [searchTerm, setSearchTerm] = useState('')

  const handleExport = (format: 'csv' | 'excel' | 'json' = 'csv') => {
    const exportDataFormatted = formatAthleteHistoryForExport(filteredHistory, selectedAthlete.name)

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

  const filteredHistory = selectedAthlete.pointsHistory.filter(record => {
    const matchDiscipline = selectedDiscipline === 'all' || record.discipline === selectedDiscipline
    const matchSearch = record.competition.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       record.location.toLowerCase().includes(searchTerm.toLowerCase())

    // 日期过滤
    const recordDate = new Date(record.date)
    const today = new Date()
    let cutoffDate = new Date()

    switch (dateRange) {
      case '1month':
        cutoffDate.setMonth(today.getMonth() - 1)
        break
      case '3months':
        cutoffDate.setMonth(today.getMonth() - 3)
        break
      case '6months':
        cutoffDate.setMonth(today.getMonth() - 6)
        break
      case '1year':
        cutoffDate.setFullYear(today.getFullYear() - 1)
        break
      default:
        cutoffDate = new Date('2020-01-01')
    }

    const matchDate = recordDate >= cutoffDate

    return matchDiscipline && matchSearch && matchDate
  })

  const getPointsTrend = (currentPoints: number, previousPoints: number) => {
    if (previousPoints === 0) return 'stable'
    return currentPoints < previousPoints ? 'up' : currentPoints > previousPoints ? 'down' : 'stable'
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-green-600" />
      case 'down':
        return <TrendingDown className="h-4 w-4 text-red-600" />
      default:
        return <div className="h-4 w-4 bg-gray-400 rounded-full"></div>
    }
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
        <h1 className="section-title">积分历史</h1>
        <p className="text-gray-600 text-lg">运动员积分变化历史和趋势分析</p>
      </div>

      {/* 运动员选择 */}
      <div className="card mb-8 relative z-10">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="flex items-center space-x-2">
            <User className="h-5 w-5 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">选择运动员:</span>
          </div>

          <select
            value={selectedAthlete.id}
            onChange={(e) => {
              const athlete = mockAthletes.find(a => a.id === e.target.value)
              if (athlete) setSelectedAthlete(athlete)
            }}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ski-blue"
          >
            {mockAthletes.map((athlete) => (
              <option key={athlete.id} value={athlete.id}>
                {athlete.name} ({athlete.fisCode})
              </option>
            ))}
          </select>

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
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ski-blue"
          >
            <option value="1month">近1个月</option>
            <option value="3months">近3个月</option>
            <option value="6months">近6个月</option>
            <option value="1year">近1年</option>
            <option value="all">全部时间</option>
          </select>

          <div className="relative flex-1 max-w-md">
            <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="搜索比赛或地点..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ski-blue"
            />
          </div>
        </div>
      </div>

      {/* 运动员概览 */}
      <div className="card mb-8 relative z-10">
        <div className="flex items-start space-x-6">
          <div className="flex-shrink-0">
            <div className="w-20 h-20 bg-gradient-to-br from-ski-blue to-primary-700 rounded-full flex items-center justify-center text-3xl text-white font-bold">
              {selectedAthlete.name.charAt(0)}
            </div>
          </div>

          <div className="flex-1">
            <h2 className="text-2xl font-bold text-ski-navy mb-2">{selectedAthlete.name}</h2>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div><span className="text-gray-500">FIS代码:</span> {selectedAthlete.fisCode}</div>
              <div><span className="text-gray-500">国家/地区:</span> {selectedAthlete.nationality}/{selectedAthlete.region}</div>
              <div><span className="text-gray-500">专项:</span> {selectedAthlete.specialties.join('、')}</div>
            </div>
          </div>

          <div className="flex space-x-4">
            <button className="btn-secondary flex items-center">
              <BarChart3 className="h-4 w-4 mr-2" />
              趋势分析
            </button>
            <div className="relative group">
              <button
                className="btn-secondary flex items-center"
                onClick={() => handleExport('csv')}
              >
                <Download className="h-4 w-4 mr-2" />
                导出数据
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
      </div>

      {/* 当前积分概览 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 relative z-10">
        {Object.entries(selectedAthlete.currentPoints).map(([discipline, points]) => {
          const disciplineNames = { SL: '回转', GS: '大回转', SG: '超级大回转', DH: '速降' }
          const disciplineName = disciplineNames[discipline as keyof typeof disciplineNames] || discipline

          return (
            <div key={discipline} className="card text-center">
              <div className="text-sm text-gray-600 mb-1">{disciplineName}</div>
              <div className="text-3xl font-bold text-ski-blue mb-2">{points.toFixed(2)}</div>
              <div className="flex items-center justify-center">
                {getTrendIcon('stable')}
                <span className="text-xs text-gray-500 ml-1">当前积分</span>
              </div>
            </div>
          )
        })}
      </div>

      {/* 积分历史记录 */}
      <div className="card relative z-10">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-ski-navy flex items-center">
            <LineChart className="h-6 w-6 mr-2" />
            积分历史记录
          </h3>
          <span className="text-sm text-gray-600">
            共 {filteredHistory.length} 条记录
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  日期
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  比赛
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  项目
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  成绩
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  比赛积分
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  惩罚值
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  最终积分
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  地点
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredHistory.map((record, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-900">{record.date}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{record.competition}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-ski-ice text-ski-blue">
                      {record.discipline}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white mr-2 ${
                        record.rank === 1 ? 'bg-yellow-500' :
                        record.rank === 2 ? 'bg-gray-400' :
                        record.rank === 3 ? 'bg-orange-500' : 'bg-gray-500'
                      }`}>
                        {record.rank}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{record.time}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900">{record.racePoints.toFixed(2)}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-yellow-600">+{record.penalty.toFixed(2)}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-semibold text-ski-blue">{record.finalPoints.toFixed(2)}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-500">{record.location}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredHistory.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Trophy className="h-12 w-12 mx-auto mb-2 opacity-50" />
            <p>暂无符合条件的积分记录</p>
          </div>
        )}
      </div>

      {/* 积分趋势分析 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 relative z-10">
        <div className="card">
          <h3 className="text-lg font-semibold text-ski-navy mb-4">积分分析</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">最佳积分</span>
              <span className="font-semibold text-green-600">
                {Math.min(...Object.values(selectedAthlete.currentPoints)).toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">参赛次数</span>
              <span className="font-semibold text-ski-navy">
                {selectedAthlete.pointsHistory.length}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">获胜次数</span>
              <span className="font-semibold text-yellow-600">
                {selectedAthlete.pointsHistory.filter(h => h.rank === 1).length}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">登台次数</span>
              <span className="font-semibold text-orange-600">
                {selectedAthlete.pointsHistory.filter(h => h.rank <= 3).length}
              </span>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-ski-navy mb-4">项目分布</h3>
          <div className="space-y-3">
            {selectedAthlete.specialties.map((specialty) => {
              const count = selectedAthlete.pointsHistory.filter(h =>
                h.discipline === specialty ||
                (specialty === '回转' && h.discipline === 'SL') ||
                (specialty === '大回转' && h.discipline === 'GS') ||
                (specialty === '超级大回转' && h.discipline === 'SG') ||
                (specialty === '速降' && h.discipline === 'DH')
              ).length
              const percentage = (count / selectedAthlete.pointsHistory.length) * 100

              return (
                <div key={specialty}>
                  <div className="flex justify-between text-sm mb-1">
                    <span>{specialty}</span>
                    <span>{count}次 ({percentage.toFixed(0)}%)</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-ski-blue h-2 rounded-full"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}