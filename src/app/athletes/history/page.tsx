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

  const handleTrendAnalysis = () => {
    if (!selectedAthlete || filteredHistory.length === 0) {
      alert('请选择运动员并确保有历史数据')
      return
    }

    // 生成趋势分析报告
    const analysisData = {
      athlete: selectedAthlete,
      history: filteredHistory,
      totalRaces: filteredHistory.length,
      bestPoints: Math.min(...filteredHistory.map(h => h.finalPoints)),
      worstPoints: Math.max(...filteredHistory.map(h => h.finalPoints)),
      averagePoints: filteredHistory.reduce((sum, h) => sum + h.finalPoints, 0) / filteredHistory.length,
      improvementTrend: calculateImprovementTrend(filteredHistory),
      disciplineStats: calculateDisciplineStats(filteredHistory)
    }

    const reportContent = `
      <!DOCTYPE html>
      <html lang="zh-CN">
      <head>
        <meta charset="UTF-8">
        <title>${selectedAthlete.name} - 积分趋势分析报告</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; background: #f8f9fa; }
          .container { max-width: 1000px; margin: 0 auto; background: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
          .header { text-align: center; border-bottom: 2px solid #2563eb; padding-bottom: 20px; margin-bottom: 30px; }
          .title { color: #1e40af; font-size: 2.2em; margin: 0; }
          .athlete-info { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
          .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin: 20px 0; }
          .stat-card { background: #f3f4f6; padding: 20px; border-radius: 8px; text-align: center; border-left: 4px solid #3b82f6; }
          .stat-number { font-size: 1.8em; font-weight: bold; color: #1e40af; margin-bottom: 5px; }
          .stat-label { color: #64748b; font-size: 0.9em; }
          .trend-positive { color: #059669; font-weight: bold; }
          .trend-negative { color: #dc2626; font-weight: bold; }
          .trend-stable { color: #6b7280; font-weight: bold; }
          .analysis-section { margin: 30px 0; padding: 20px; background: #f8fafc; border-radius: 8px; }
          .discipline-chart { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 15px; margin: 20px 0; }
          .discipline-item { background: white; padding: 15px; border-radius: 6px; text-align: center; border: 1px solid #e5e7eb; }
          .history-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
          .history-table th, .history-table td { padding: 10px; text-align: left; border-bottom: 1px solid #e5e7eb; }
          .history-table th { background: #f3f4f6; font-weight: bold; }
          .improvement { background: #dcfce7 !important; }
          .decline { background: #fef2f2 !important; }
          .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #64748b; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 class="title">${selectedAthlete.name} 积分趋势分析</h1>
            <p>生成时间: ${new Date().toLocaleString('zh-CN')}</p>
          </div>

          <div class="athlete-info">
            <h2>运动员基本信息</h2>
            <p><strong>姓名:</strong> ${selectedAthlete.name}</p>
            <p><strong>FIS编码:</strong> ${selectedAthlete.fisCode}</p>
            <p><strong>国籍:</strong> ${selectedAthlete.nationality}</p>
            <p><strong>所属地区:</strong> ${selectedAthlete.region}</p>
            <p><strong>专项:</strong> ${selectedAthlete.specialties.join(', ')}</p>
          </div>

          <div class="stats-grid">
            <div class="stat-card">
              <div class="stat-number">${analysisData.totalRaces}</div>
              <div class="stat-label">总比赛场次</div>
            </div>
            <div class="stat-card">
              <div class="stat-number">${analysisData.bestPoints.toFixed(2)}</div>
              <div class="stat-label">最佳积分</div>
            </div>
            <div class="stat-card">
              <div class="stat-number">${analysisData.averagePoints.toFixed(2)}</div>
              <div class="stat-label">平均积分</div>
            </div>
            <div class="stat-card">
              <div class="stat-number ${analysisData.improvementTrend > 0 ? 'trend-positive' : analysisData.improvementTrend < 0 ? 'trend-negative' : 'trend-stable'}">
                ${analysisData.improvementTrend > 0 ? '↗' : analysisData.improvementTrend < 0 ? '↘' : '→'} ${Math.abs(analysisData.improvementTrend).toFixed(1)}%
              </div>
              <div class="stat-label">总体趋势</div>
            </div>
          </div>

          <div class="analysis-section">
            <h3>项目表现分析</h3>
            <div class="discipline-chart">
              ${Object.entries(analysisData.disciplineStats).map(([discipline, stats]) => `
                <div class="discipline-item">
                  <h4>${discipline}</h4>
                  <p>比赛: ${stats.count}场</p>
                  <p>平均积分: ${stats.average.toFixed(2)}</p>
                  <p>最佳: ${stats.best.toFixed(2)}</p>
                </div>
              `).join('')}
            </div>
          </div>

          <div class="analysis-section">
            <h3>比赛历史记录</h3>
            <table class="history-table">
              <thead>
                <tr>
                  <th>日期</th>
                  <th>比赛</th>
                  <th>项目</th>
                  <th>排名</th>
                  <th>时间</th>
                  <th>最终积分</th>
                  <th>趋势</th>
                </tr>
              </thead>
              <tbody>
                ${filteredHistory.map((record, index) => {
                  const prevRecord = filteredHistory[index + 1];
                  let trendClass = '';
                  let trendIcon = '';
                  if (prevRecord) {
                    if (record.finalPoints < prevRecord.finalPoints) {
                      trendClass = 'improvement';
                      trendIcon = '↗ 提升';
                    } else if (record.finalPoints > prevRecord.finalPoints) {
                      trendClass = 'decline';
                      trendIcon = '↘ 下降';
                    } else {
                      trendIcon = '→ 稳定';
                    }
                  }
                  return `
                    <tr class="${trendClass}">
                      <td>${record.date}</td>
                      <td>${record.competition}</td>
                      <td>${record.discipline}</td>
                      <td>${record.rank}</td>
                      <td>${record.time}</td>
                      <td>${record.finalPoints.toFixed(2)}</td>
                      <td>${trendIcon}</td>
                    </tr>
                  `;
                }).join('')}
              </tbody>
            </table>
          </div>

          <div class="footer">
            <p>本分析报告由高山滑雪竞赛管理系统生成</p>
            <p>数据来源: FIS官方数据</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // 下载分析报告
    const blob = new Blob([reportContent], { type: 'text/html;charset=utf-8' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${selectedAthlete.name}_趋势分析_${new Date().toISOString().split('T')[0]}.html`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    alert('趋势分析报告生成成功！已下载到本地。');
  }

  const calculateImprovementTrend = (history: any[]) => {
    if (history.length < 2) return 0;
    const recent = history.slice(0, Math.ceil(history.length / 3));
    const older = history.slice(-Math.ceil(history.length / 3));
    const recentAvg = recent.reduce((sum, h) => sum + h.finalPoints, 0) / recent.length;
    const olderAvg = older.reduce((sum, h) => sum + h.finalPoints, 0) / older.length;
    return ((olderAvg - recentAvg) / olderAvg) * 100; // 积分越低越好，所以反向计算
  }

  const calculateDisciplineStats = (history: any[]) => {
    const stats: any = {};
    history.forEach(record => {
      if (!stats[record.discipline]) {
        stats[record.discipline] = { points: [], count: 0 };
      }
      stats[record.discipline].points.push(record.finalPoints);
      stats[record.discipline].count++;
    });

    Object.keys(stats).forEach(discipline => {
      const points = stats[discipline].points;
      stats[discipline].average = points.reduce((a: number, b: number) => a + b, 0) / points.length;
      stats[discipline].best = Math.min(...points);
    });

    return stats;
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
            <button
              className="btn-secondary flex items-center"
              onClick={handleTrendAnalysis}
            >
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