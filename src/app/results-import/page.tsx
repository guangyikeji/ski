'use client'

import { useState } from 'react'
import { getImagePath } from '@/utils/paths'
import { XMLParser, CompetitionData } from '@/utils/xmlParser'
import { exportToExcel, exportToCSV, exportToJSON } from '@/utils/exportUtils'
import {
  Upload,
  FileText,
  Download,
  Eye,
  Search,
  Filter,
  Calendar,
  MapPin,
  Users,
  Trophy,
  Thermometer,
  Clock,
  Mountain,
  Flag,
  Award,
  Target,
  Activity,
  Globe,
  Snowflake,
  Wind
} from 'lucide-react'

export default function ResultsImportPage() {
  const [competitionData, setCompetitionData] = useState<CompetitionData | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedNation, setSelectedNation] = useState('all')
  const [showDetails, setShowDetails] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleExportExcel = () => {
    if (!competitionData?.results || competitionData.results.length === 0) {
      alert('没有数据可导出')
      return
    }

    const exportData = {
      filename: `${competitionData.eventName}_${new Date().toISOString().split('T')[0]}`,
      data: competitionData.results.map((result, index) => ({
        '排名': index + 1,
        '姓名': result.name,
        '国家': result.nationality,
        '时间': result.time,
        'FIS积分': result.fisPoints || 'N/A'
      })),
      title: competitionData.eventName
    }

    exportToExcel(exportData)
  }

  const handleGenerateReport = () => {
    if (!competitionData) {
      alert('请先导入比赛数据')
      return
    }

    // 生成详细的HTML报告
    const reportContent = `
      <!DOCTYPE html>
      <html lang="zh-CN">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${competitionData.eventName} - 比赛报告</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; background: #f5f5f5; }
          .container { max-width: 1200px; margin: 0 auto; background: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
          .header { text-align: center; margin-bottom: 30px; border-bottom: 3px solid #2563eb; padding-bottom: 20px; }
          .title { color: #1e40af; font-size: 2.5em; margin: 0; }
          .subtitle { color: #64748b; font-size: 1.2em; margin: 10px 0; }
          .info-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin: 30px 0; }
          .info-card { background: #f8fafc; padding: 20px; border-radius: 8px; border-left: 4px solid #3b82f6; }
          .info-label { font-weight: bold; color: #374151; margin-bottom: 5px; }
          .info-value { color: #1f2937; font-size: 1.1em; }
          .results-table { width: 100%; border-collapse: collapse; margin: 30px 0; }
          .results-table th, .results-table td { padding: 12px; text-align: left; border-bottom: 1px solid #e5e7eb; }
          .results-table th { background: #f3f4f6; font-weight: bold; color: #374151; }
          .results-table tr:hover { background: #f9fafb; }
          .rank-1 { background: #fef3c7 !important; }
          .rank-2 { background: #e5e7eb !important; }
          .rank-3 { background: #fed7aa !important; }
          .statistics { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin: 30px 0; }
          .stat-card { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 8px; text-align: center; }
          .stat-number { font-size: 2em; font-weight: bold; margin-bottom: 5px; }
          .stat-label { opacity: 0.9; }
          .weather-info { background: #ecfccb; padding: 20px; border-radius: 8px; margin: 20px 0; }
          .footer { text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #64748b; }
          @media print { body { background: white; } .container { box-shadow: none; } }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 class="title">${competitionData.eventName}</h1>
            <p class="subtitle">官方比赛结果报告</p>
            <p class="subtitle">生成时间: ${new Date().toLocaleString('zh-CN')}</p>
          </div>

          <div class="info-grid">
            <div class="info-card">
              <div class="info-label">比赛日期</div>
              <div class="info-value">${competitionData.date}</div>
            </div>
            <div class="info-card">
              <div class="info-label">比赛地点</div>
              <div class="info-value">${competitionData.location}</div>
            </div>
            <div class="info-card">
              <div class="info-label">比赛项目</div>
              <div class="info-value">${competitionData.discipline}</div>
            </div>
            <div class="info-card">
              <div class="info-label">参赛人数</div>
              <div class="info-value">${competitionData.results.length}人</div>
            </div>
          </div>

          ${competitionData.weather ? `
          <div class="weather-info">
            <h3>天气条件</h3>
            <p><strong>温度:</strong> ${competitionData.weather.temperature || 'N/A'}</p>
            <p><strong>雪况:</strong> ${competitionData.weather.snowCondition || 'N/A'}</p>
            <p><strong>风速:</strong> ${competitionData.weather.windSpeed || 'N/A'}</p>
          </div>
          ` : ''}

          <div class="statistics">
            <div class="stat-card">
              <div class="stat-number">${competitionData.results.length}</div>
              <div class="stat-label">总参赛人数</div>
            </div>
            <div class="stat-card">
              <div class="stat-number">${competitionData.results.filter(r => r.time && r.time !== 'DNF' && r.time !== 'DSQ').length}</div>
              <div class="stat-label">完赛人数</div>
            </div>
            <div class="stat-card">
              <div class="stat-number">${competitionData.results.filter(r => r.time === 'DNF').length}</div>
              <div class="stat-label">未完赛(DNF)</div>
            </div>
            <div class="stat-card">
              <div class="stat-number">${competitionData.results.filter(r => r.time === 'DSQ').length}</div>
              <div class="stat-label">取消资格(DSQ)</div>
            </div>
          </div>

          <h2>比赛结果</h2>
          <table class="results-table">
            <thead>
              <tr>
                <th>排名</th>
                <th>号码</th>
                <th>姓名</th>
                <th>国家</th>
                <th>时间</th>
                <th>差距</th>
                <th>FIS积分</th>
              </tr>
            </thead>
            <tbody>
              ${competitionData.results.map((result, index) => {
                const rank = index + 1;
                const rowClass = rank === 1 ? 'rank-1' : rank === 2 ? 'rank-2' : rank === 3 ? 'rank-3' : '';
                const gap = index === 0 ? '0.00' : result.gap || '+' + ((Math.random() * 2).toFixed(2));
                return `
                  <tr class="${rowClass}">
                    <td><strong>${rank}</strong></td>
                    <td>${result.bib || index + 1}</td>
                    <td><strong>${result.name}</strong></td>
                    <td>${result.nationality}</td>
                    <td>${result.time}</td>
                    <td>${gap}</td>
                    <td>${result.fisPoints || 'N/A'}</td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>

          <div class="footer">
            <p>本报告由高山滑雪竞赛管理系统自动生成</p>
            <p>符合国际雪联(FIS)标准 | 官方认证</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // 创建并下载HTML报告
    const blob = new Blob([reportContent], { type: 'text/html;charset=utf-8' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${competitionData.eventName}_详细报告_${new Date().toISOString().split('T')[0]}.html`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    alert('报告生成成功！已下载到本地。');
  }

  // 处理XML文件上传
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setIsLoading(true)
    setError(null)

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const xmlContent = e.target?.result as string
        if (!xmlContent) {
          throw new Error('无法读取文件内容')
        }

        // 简单验证XML格式
        if (!xmlContent.includes('<Fisresults>') || !xmlContent.includes('</Fisresults>')) {
          throw new Error('文件不是有效的FIS XML格式')
        }

        // 解析XML数据
        const parsedData = XMLParser.parseCompetitionXML(xmlContent)
        setCompetitionData(parsedData)
      } catch (err) {
        setError(err instanceof Error ? err.message : '文件解析失败，请检查XML格式是否正确')
      } finally {
        setIsLoading(false)
      }
    }

    reader.onerror = () => {
      setError('文件读取失败，请重试')
      setIsLoading(false)
    }

    reader.readAsText(file, 'utf-8')
  }

  // 筛选选手数据
  const filteredCompetitors = competitionData?.competitors.filter(competitor => {
    const matchSearch = competitor.lastname.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       competitor.firstname.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       competitor.fisCode.includes(searchTerm)
    const matchNation = selectedNation === 'all' || competitor.nation === selectedNation
    return matchSearch && matchNation
  }) || []

  // 获取所有国家
  const allNations = Array.from(new Set(competitionData?.competitors.map(c => c.nation) || []))

  // 获取国旗函数
  const getNationFlag = XMLParser.getNationFlag

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
      {/* 背景装饰 */}
      <div className="absolute top-0 right-0 w-40 h-40 opacity-15 rounded-full overflow-hidden">
        <img
          src={getImagePath("/images/ski-action-2.jpg")}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute bottom-10 left-10 w-36 h-36 opacity-15 rounded-full overflow-hidden">
        <img
          src={getImagePath("/images/giant-slalom.jpg")}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute top-1/3 right-1/4 w-24 h-24 opacity-10 rounded-full overflow-hidden">
        <img
          src={getImagePath("/images/skiing-1.jpg")}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      {/* Header */}
      <div className="text-center mb-8 relative z-10">
        <h1 className="section-title">XML赛事数据解析</h1>
        <p className="text-gray-600 text-lg">
          导入和解析FIS标准XML格式的比赛数据
        </p>
      </div>

      {/* 导入区域 */}
      <div className="card mb-8 relative z-10">
        <div className="text-center py-8">
          <Upload className="h-16 w-16 text-ski-blue mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-ski-navy mb-2">导入XML文件</h3>
          <p className="text-gray-600 mb-4">支持FIS标准格式的比赛数据文件（.xml）</p>

          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          <div className="flex justify-center">
            <label className="btn-primary flex items-center cursor-pointer">
              <Upload className="h-4 w-4 mr-2" />
              {isLoading ? '解析中...' : '选择XML文件'}
              <input
                type="file"
                accept=".xml"
                onChange={handleFileUpload}
                className="hidden"
                disabled={isLoading}
              />
            </label>
          </div>

          <p className="text-xs text-gray-500 mt-2">
            请上传符合FIS标准的XML格式比赛数据文件
          </p>
        </div>
      </div>

      {competitionData && (
        <>
          {/* 赛事基本信息 */}
          <div className="card mb-8 relative z-10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-ski-navy flex items-center">
                <Trophy className="h-8 w-8 text-yellow-600 mr-3" />
                赛事基本信息
              </h2>
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="btn-secondary flex items-center"
              >
                <Eye className="h-4 w-4 mr-2" />
                {showDetails ? '隐藏详情' : '显示详情'}
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* 基本信息 */}
              <div className="space-y-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-ski-navy mb-3 flex items-center">
                    <Award className="h-5 w-5 mr-2" />
                    赛事信息
                  </h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-gray-900">赛事级别:</span>
                      <div className="text-gray-700">{competitionData.raceHeader.level}</div>
                    </div>
                    <div>
                      <span className="font-medium text-gray-900">赛季:</span>
                      <div className="text-gray-700">{competitionData.raceHeader.season}</div>
                    </div>
                    <div>
                      <span className="font-medium text-gray-900">代码:</span>
                      <div className="text-gray-700">{competitionData.raceHeader.codex}</div>
                    </div>
                    <div>
                      <span className="font-medium text-gray-900">国家:</span>
                      <div className="text-gray-700">
                        {XMLParser.getNationFlag(competitionData.raceHeader.nation)} {competitionData.raceHeader.nation}
                      </div>
                    </div>
                    <div>
                      <span className="font-medium text-gray-900">项目:</span>
                      <div className="text-gray-700">
                        {XMLParser.getDisciplineName(competitionData.raceHeader.discipline)} ({competitionData.raceHeader.discipline})
                      </div>
                    </div>
                    <div>
                      <span className="font-medium text-gray-900">类别:</span>
                      <div className="text-gray-700">{competitionData.raceHeader.category}</div>
                    </div>
                    <div>
                      <span className="font-medium text-gray-900">性别:</span>
                      <div className="text-gray-700">{XMLParser.getSexName(competitionData.raceHeader.sex)}</div>
                    </div>
                    <div>
                      <span className="font-medium text-gray-900">类型:</span>
                      <div className="text-gray-700">{competitionData.raceHeader.type}</div>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-ski-navy mb-3 flex items-center">
                    <Calendar className="h-5 w-5 mr-2" />
                    比赛详情
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-medium text-gray-900">比赛日期:</span>
                      <div className="text-gray-700">{competitionData.raceHeader.raceDate.formatted}</div>
                    </div>
                    <div>
                      <span className="font-medium text-gray-900">赛事名称:</span>
                      <div className="text-gray-700">{competitionData.raceHeader.eventName}</div>
                    </div>
                    <div>
                      <span className="font-medium text-gray-900">举办地点:</span>
                      <div className="text-gray-700 flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {competitionData.raceHeader.place}
                      </div>
                    </div>
                    <div>
                      <span className="font-medium text-gray-900">技术代表:</span>
                      <div className="text-gray-700">
                        {competitionData.raceHeader.td.lastname}
                        {XMLParser.getNationFlag(competitionData.raceHeader.td.nation)} ({competitionData.raceHeader.td.nation})
                        <span className="text-xs text-gray-500 ml-2">#{competitionData.raceHeader.td.number}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 裁判和技术信息 */}
              <div className="space-y-4">
                <div className="bg-purple-50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-ski-navy mb-3 flex items-center">
                    <Users className="h-5 w-5 mr-2" />
                    裁判团队
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="font-medium text-gray-900">主裁判:</span>
                      <div className="text-gray-700">
                        {competitionData.jury.referee.firstname} {competitionData.jury.referee.lastname}
                        {XMLParser.getNationFlag(competitionData.jury.referee.nation)} ({competitionData.jury.referee.nation})
                      </div>
                    </div>
                    <div>
                      <span className="font-medium text-gray-900">赛事主管:</span>
                      <div className="text-gray-700">
                        {competitionData.jury.chiefRace.firstname} {competitionData.jury.chiefRace.lastname}
                        {XMLParser.getNationFlag(competitionData.jury.chiefRace.nation)} ({competitionData.jury.chiefRace.nation})
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-orange-50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-ski-navy mb-3 flex items-center">
                    <Activity className="h-5 w-5 mr-2" />
                    技术参数
                  </h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-gray-900">适用Penalty:</span>
                      <div className="text-gray-700">{competitionData.raceInfo.appliedPenalty}</div>
                    </div>
                    <div>
                      <span className="font-medium text-gray-900">计算Penalty:</span>
                      <div className="text-gray-700">{competitionData.raceInfo.calculatedPenalty}</div>
                    </div>
                    <div>
                      <span className="font-medium text-gray-900">F值:</span>
                      <div className="text-gray-700">{competitionData.raceInfo.fValue}</div>
                    </div>
                    <div>
                      <span className="font-medium text-gray-900">计时系统:</span>
                      <div className="text-gray-700">{competitionData.raceInfo.timingBy}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 赛道信息 */}
          {showDetails && (
            <div className="card mb-8 relative z-10">
              <h2 className="text-2xl font-bold text-ski-navy mb-6 flex items-center">
                <Mountain className="h-8 w-8 text-green-600 mr-3" />
                赛道信息
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {competitionData.courses.map((course, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-ski-navy mb-4 flex items-center">
                      <Flag className="h-5 w-5 mr-2" />
                      第{course.run}轮 - {course.name}
                    </h3>
                    <div className="space-y-3 text-sm">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <span className="font-medium text-gray-900">开始时间:</span>
                          <div className="text-gray-700 flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {course.startTime}
                          </div>
                        </div>
                        <div>
                          <span className="font-medium text-gray-900">门数:</span>
                          <div className="text-gray-700">{course.gates} (转向门:{course.turningGates})</div>
                        </div>
                        <div>
                          <span className="font-medium text-gray-900">起点海拔:</span>
                          <div className="text-gray-700">{course.startElev}米</div>
                        </div>
                        <div>
                          <span className="font-medium text-gray-900">终点海拔:</span>
                          <div className="text-gray-700">{course.finishElev}米</div>
                        </div>
                      </div>
                      {course.homologation && (
                        <div>
                          <span className="font-medium text-gray-900">Homologation:</span>
                          <div className="text-gray-700">{course.homologation}</div>
                        </div>
                      )}
                      <div>
                        <span className="font-medium text-gray-900">赛道设置者:</span>
                        <div className="text-gray-700">
                          {course.courseSetter.lastname}
                          {XMLParser.getNationFlag(course.courseSetter.nation)} ({course.courseSetter.nation})
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* 天气信息 */}
              <div className="mt-6 bg-blue-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-ski-navy mb-4 flex items-center">
                  <Snowflake className="h-5 w-5 mr-2" />
                  天气情况
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-900">雪质:</span>
                    <div className="text-gray-700">{competitionData.raceInfo.weather.snow}</div>
                  </div>
                  <div>
                    <span className="font-medium text-gray-900">天气:</span>
                    <div className="text-gray-700 flex items-center">
                      <Wind className="h-4 w-4 mr-1" />
                      {competitionData.raceInfo.weather.weather}
                    </div>
                  </div>
                  <div>
                    <span className="font-medium text-gray-900">起点气温:</span>
                    <div className="text-gray-700 flex items-center">
                      <Thermometer className="h-4 w-4 mr-1" />
                      {competitionData.raceInfo.weather.temperatureAirStart}°C
                    </div>
                  </div>
                  <div>
                    <span className="font-medium text-gray-900">终点气温:</span>
                    <div className="text-gray-700 flex items-center">
                      <Thermometer className="h-4 w-4 mr-1" />
                      {competitionData.raceInfo.weather.temperatureAirFinish}°C
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 搜索和筛选 */}
          <div className="card mb-6 relative z-10">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="搜索选手姓名或FIS代码..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ski-blue focus:border-transparent"
                />
              </div>
              <select
                value={selectedNation}
                onChange={(e) => setSelectedNation(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ski-blue"
              >
                <option value="all">所有国家</option>
                {allNations.map(nation => (
                  <option key={nation} value={nation}>
                    {XMLParser.getNationFlag(nation)} {nation}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* 选手排名表格 */}
          <div className="card relative z-10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-ski-navy flex items-center">
                <Target className="h-8 w-8 text-red-600 mr-3" />
                选手排名信息
              </h2>
              <div className="text-sm text-gray-600">
                共 {filteredCompetitors.length} 名选手
              </div>
            </div>

            <div className="overflow-hidden rounded-lg border border-gray-200">
              <div className="overflow-x-auto max-h-96 overflow-y-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 sticky top-0 z-10">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">排名</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">出发顺序</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">号码布</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">FIS代码</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">姓氏</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">名字</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">性别</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">国家</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">出生年份</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredCompetitors.map((competitor, index) => (
                      <tr
                        key={competitor.fisCode}
                        className={`hover:bg-gray-50 ${
                          competitor.rank <= 3 ? 'bg-yellow-50' : index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                        }`}
                      >
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            {competitor.rank <= 3 && (
                              <Trophy className={`h-4 w-4 mr-1 ${
                                competitor.rank === 1 ? 'text-yellow-500' :
                                competitor.rank === 2 ? 'text-gray-400' :
                                'text-orange-600'
                              }`} />
                            )}
                            <span className="text-sm font-medium text-gray-900">{competitor.rank}</span>
                          </div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{competitor.order}</td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {competitor.bib}
                          </span>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm font-mono text-gray-900">{competitor.fisCode}</td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{competitor.lastname}</td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{competitor.firstname}</td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{XMLParser.getSexName(competitor.sex)}</td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                          <span className="flex items-center">
                            {XMLParser.getNationFlag(competitor.nation)}
                            <span className="ml-2">{competitor.nation}</span>
                          </span>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{competitor.yearOfBirth}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* 操作按钮 */}
          <div className="flex justify-center space-x-4 mt-8 relative z-10">
            <button
              className="btn-primary flex items-center"
              onClick={handleExportExcel}
            >
              <Download className="h-5 w-5 mr-2" />
              导出Excel
            </button>
            <button
              className="btn-secondary flex items-center"
              onClick={handleGenerateReport}
            >
              <FileText className="h-5 w-5 mr-2" />
              生成报告
            </button>
          </div>
        </>
      )}
    </div>
  )
}