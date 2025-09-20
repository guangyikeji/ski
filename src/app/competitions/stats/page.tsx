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

  const handleDetailedAnalysis = () => {
    // 生成详细的统计分析报告
    const analysisReport = `
      <!DOCTYPE html>
      <html lang="zh-CN">
      <head>
        <meta charset="UTF-8">
        <title>比赛统计详细分析报告</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; background: #f8f9fa; }
          .container { max-width: 1200px; margin: 0 auto; background: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
          .header { text-align: center; border-bottom: 2px solid #2563eb; padding-bottom: 20px; margin-bottom: 30px; }
          .title { color: #1e40af; font-size: 2.5em; margin: 0; }
          .chart-container { background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0; }
          .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin: 20px 0; }
          .stat-card { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 8px; text-align: center; }
          .stat-number { font-size: 2em; font-weight: bold; margin-bottom: 5px; }
          .stat-label { opacity: 0.9; }
          .distribution-chart { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin: 20px 0; }
          .bar-chart { background: white; padding: 20px; border-radius: 8px; border: 1px solid #e5e7eb; }
          .bar { background: #3b82f6; height: 20px; border-radius: 4px; margin: 5px 0; position: relative; }
          .bar-label { position: absolute; left: 5px; top: 50%; transform: translateY(-50%); color: white; font-size: 12px; font-weight: bold; }
          .analysis-section { margin: 30px 0; padding: 20px; background: #f8fafc; border-radius: 8px; }
          .trend-chart { display: grid; grid-template-columns: repeat(12, 1fr); gap: 5px; margin: 20px 0; }
          .trend-bar { background: #10b981; height: 30px; border-radius: 2px; position: relative; }
          .trend-label { font-size: 10px; text-align: center; margin-top: 5px; }
          .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #64748b; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 class="title">比赛统计详细分析报告</h1>
            <p>时间范围: ${selectedTimeRange} | 地区: ${selectedRegion}</p>
            <p>生成时间: ${new Date().toLocaleString('zh-CN')}</p>
          </div>

          <div class="stats-grid">
            <div class="stat-card">
              <div class="stat-number">${mockStats.totalCompetitions}</div>
              <div class="stat-label">总比赛场次</div>
            </div>
            <div class="stat-card">
              <div class="stat-number">${mockStats.totalParticipants}</div>
              <div class="stat-label">总参赛人次</div>
            </div>
            <div class="stat-card">
              <div class="stat-number">${mockStats.avgParticipantsPerEvent.toFixed(1)}</div>
              <div class="stat-label">平均每场参赛人数</div>
            </div>
            <div class="stat-card">
              <div class="stat-number">${mockStats.completionRate.toFixed(1)}%</div>
              <div class="stat-label">比赛完成率</div>
            </div>
          </div>

          <div class="analysis-section">
            <h3>项目分布分析</h3>
            <div class="distribution-chart">
              ${Object.entries(mockStats.disciplineDistribution).map(([discipline, count]) => {
                const percentage = ((count as number) / mockStats.totalCompetitions * 100).toFixed(1);
                return `
                  <div class="bar-chart">
                    <h4>${discipline}</h4>
                    <div class="bar" style="width: ${Number(percentage) * 2}px">
                      <span class="bar-label">${count}场</span>
                    </div>
                    <p>${percentage}% 占比</p>
                  </div>
                `;
              }).join('')}
            </div>
          </div>

          <div class="analysis-section">
            <h3>地区参与度分析</h3>
            <div class="distribution-chart">
              ${Object.entries(mockStats.regionDistribution).map(([region, participants]) => {
                const percentage = ((participants as number) / mockStats.totalParticipants * 100).toFixed(1);
                return `
                  <div class="bar-chart">
                    <h4>${region}</h4>
                    <div class="bar" style="width: ${Number(percentage) * 3}px">
                      <span class="bar-label">${participants}人</span>
                    </div>
                    <p>${percentage}% 占比</p>
                  </div>
                `;
              }).join('')}
            </div>
          </div>

          <div class="analysis-section">
            <h3>月度趋势分析</h3>
            <div class="chart-container">
              <div class="trend-chart">
                ${mockStats.monthlyTrends.map(trend => `
                  <div>
                    <div class="trend-bar" style="height: ${trend.competitions * 10}px" title="${trend.month}: ${trend.competitions}场比赛"></div>
                    <div class="trend-label">${trend.month}</div>
                  </div>
                `).join('')}
              </div>
              <p style="text-align: center; margin-top: 15px;">月度比赛场次趋势图</p>
            </div>
          </div>

          <div class="analysis-section">
            <h3>优秀选手表现分析</h3>
            <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
              <thead>
                <tr style="background: #f3f4f6;">
                  <th style="padding: 12px; text-align: left; border-bottom: 1px solid #e5e7eb;">排名</th>
                  <th style="padding: 12px; text-align: left; border-bottom: 1px solid #e5e7eb;">姓名</th>
                  <th style="padding: 12px; text-align: left; border-bottom: 1px solid #e5e7eb;">地区</th>
                  <th style="padding: 12px; text-align: left; border-bottom: 1px solid #e5e7eb;">冠军次数</th>
                  <th style="padding: 12px; text-align: left; border-bottom: 1px solid #e5e7eb;">领奖台次数</th>
                  <th style="padding: 12px; text-align: left; border-bottom: 1px solid #e5e7eb;">胜率</th>
                </tr>
              </thead>
              <tbody>
                ${mockStats.topPerformers.map((performer, index) => {
                  const winRate = (performer.wins / performer.podiums * 100).toFixed(1);
                  return `
                    <tr style="border-bottom: 1px solid #e5e7eb;">
                      <td style="padding: 12px;">${index + 1}</td>
                      <td style="padding: 12px; font-weight: bold;">${performer.name}</td>
                      <td style="padding: 12px;">${performer.region}</td>
                      <td style="padding: 12px;">${performer.wins}</td>
                      <td style="padding: 12px;">${performer.podiums}</td>
                      <td style="padding: 12px;">${winRate}%</td>
                    </tr>
                  `;
                }).join('')}
              </tbody>
            </table>
          </div>

          <div class="analysis-section">
            <h3>数据洞察与建议</h3>
            <div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #10b981;">
              <h4>关键发现:</h4>
              <ul>
                <li><strong>项目平衡度:</strong> 大回转项目占比最高(${((mockStats.disciplineDistribution['大回转'] || 0) / mockStats.totalCompetitions * 100).toFixed(1)}%)，建议增加其他项目比重</li>
                <li><strong>地区参与:</strong> 东北地区参与度最高，可考虑在其他地区推广项目</li>
                <li><strong>参赛规模:</strong> 平均每场${mockStats.avgParticipantsPerEvent.toFixed(1)}人参赛，规模适中</li>
                <li><strong>竞技水平:</strong> 完成率${mockStats.completionRate.toFixed(1)}%，整体竞技水平良好</li>
              </ul>

              <h4>改进建议:</h4>
              <ul>
                <li>增加速降和全能项目比赛场次，平衡项目发展</li>
                <li>在西南地区和华南地区开展推广活动</li>
                <li>建立青年选手培养体系，提高后备人才储备</li>
                <li>加强教练员培训，提升整体训练水平</li>
              </ul>
            </div>
          </div>

          <div class="footer">
            <p>本分析报告由高山滑雪竞赛管理系统生成</p>
            <p>数据来源: FIS官方统计 | 分析模型: 专业竞技体育统计模型</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // 下载分析报告
    const blob = new Blob([analysisReport], { type: 'text/html;charset=utf-8' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `比赛统计详细分析_${selectedTimeRange}_${selectedRegion}_${new Date().toISOString().split('T')[0]}.html`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    alert('详细分析报告生成成功！已下载到本地。');
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
            <button
              className="btn-primary flex items-center"
              onClick={handleDetailedAnalysis}
            >
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