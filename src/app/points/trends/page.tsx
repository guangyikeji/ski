'use client'

import { useState } from 'react'
import { TrendingUp, TrendingDown, BarChart3, Calendar, User, Filter } from 'lucide-react'

export default function PointsTrendsPage() {
  const [selectedAthlete, setSelectedAthlete] = useState('zhang_wei')
  const [selectedPeriod, setSelectedPeriod] = useState('6months')

  // 模拟运动员数据
  const athletes = [
    { id: 'zhang_wei', name: '张伟', discipline: '高山滑雪' },
    { id: 'li_xiaoxue', name: '李小雪', discipline: '自由式滑雪' },
    { id: 'wang_bingbing', name: '王冰冰', discipline: '单板滑雪' },
    { id: 'zhao_xuehua', name: '赵雪花', discipline: '高山滑雪' }
  ]

  // 模拟趋势数据
  const trendData = {
    zhang_wei: {
      name: '张伟',
      discipline: '高山滑雪',
      speciality: '大回转',
      currentPoints: 45.20,
      bestPoints: 38.45,
      worstPoints: 62.30,
      trend: 'improving',
      monthlyData: [
        { month: '2024-04', points: 58.20, competitions: 2, bestResult: '第3名' },
        { month: '2024-05', points: 52.45, competitions: 3, bestResult: '第2名' },
        { month: '2024-06', points: 48.90, competitions: 2, bestResult: '第1名' },
        { month: '2024-07', points: 45.20, competitions: 3, bestResult: '第1名' },
        { month: '2024-08', points: 47.65, competitions: 1, bestResult: '第2名' },
        { month: '2024-09', points: 45.20, competitions: 1, bestResult: '第1名' }
      ]
    }
  }

  const currentData = trendData[selectedAthlete as keyof typeof trendData] || trendData.zhang_wei

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <TrendingUp className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">积分趋势分析</h1>
          <p className="text-xl text-gray-600">
            运动员积分变化趋势与表现分析
          </p>
        </div>

        {/* 筛选器 */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <User className="h-4 w-4 inline mr-1" />
                选择运动员
              </label>
              <select
                value={selectedAthlete}
                onChange={(e) => setSelectedAthlete(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                {athletes.map(athlete => (
                  <option key={athlete.id} value={athlete.id}>
                    {athlete.name} - {athlete.discipline}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar className="h-4 w-4 inline mr-1" />
                时间周期
              </label>
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="3months">近3个月</option>
                <option value="6months">近6个月</option>
                <option value="1year">近1年</option>
                <option value="2years">近2年</option>
              </select>
            </div>

            <div className="flex items-end">
              <button className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors">
                <BarChart3 className="h-4 w-4 inline mr-1" />
                导出报告
              </button>
            </div>
          </div>
        </div>

        {/* 运动员概况 */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{currentData.name}</h2>
              <p className="text-gray-600">{currentData.discipline} - {currentData.speciality}</p>
            </div>
            <div className={`flex items-center px-3 py-1 rounded-full text-sm font-medium ${
              currentData.trend === 'improving' ? 'bg-green-100 text-green-800' :
              currentData.trend === 'declining' ? 'bg-red-100 text-red-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              {currentData.trend === 'improving' && <TrendingUp className="h-4 w-4 mr-1" />}
              {currentData.trend === 'declining' && <TrendingDown className="h-4 w-4 mr-1" />}
              {currentData.trend === 'improving' ? '积分提升中' :
               currentData.trend === 'declining' ? '积分下降中' : '积分稳定'}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{currentData.currentPoints}</div>
              <div className="text-gray-600">当前积分</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{currentData.bestPoints}</div>
              <div className="text-gray-600">最好积分</div>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <div className="text-2xl font-bold text-red-600">{currentData.worstPoints}</div>
              <div className="text-gray-600">最差积分</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">
                {(currentData.worstPoints - currentData.bestPoints).toFixed(2)}
              </div>
              <div className="text-gray-600">积分区间</div>
            </div>
          </div>
        </div>

        {/* 趋势图表 */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">积分变化趋势</h3>

          {/* 简化的趋势图 */}
          <div className="relative h-64 bg-gray-50 rounded-lg p-4">
            <div className="flex items-end justify-between h-full">
              {currentData.monthlyData.map((data, index) => {
                const height = Math.max(10, ((data.points - 30) / 40) * 100)
                return (
                  <div key={data.month} className="flex flex-col items-center">
                    <div className="text-xs text-gray-600 mb-2">{data.points}</div>
                    <div
                      className="bg-blue-500 rounded-t w-8 transition-all duration-300 hover:bg-blue-600"
                      style={{ height: `${height}%` }}
                      title={`${data.month}: ${data.points}分`}
                    ></div>
                    <div className="text-xs text-gray-500 mt-2 transform -rotate-45">
                      {data.month.split('-')[1]}月
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="mt-4 text-sm text-gray-600">
            * 柱状图显示每月最好积分，鼠标悬停查看详细信息
          </div>
        </div>

        {/* 详细数据表 */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">月度详细数据</h3>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    月份
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    积分
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    参赛次数
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    最好成绩
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
                {currentData.monthlyData.map((data, index) => {
                  const prevData = index > 0 ? currentData.monthlyData[index - 1] : null
                  const change = prevData ? data.points - prevData.points : 0
                  const isImproving = change < 0 // 高山滑雪积分越低越好

                  return (
                    <tr key={data.month} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {data.month}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <span className="font-bold">{data.points}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {data.competitions}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {data.bestResult}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {prevData ? (
                          <span className={change < 0 ? 'text-green-600' : change > 0 ? 'text-red-600' : 'text-gray-600'}>
                            {change > 0 ? '+' : ''}{change.toFixed(2)}
                          </span>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {prevData ? (
                          <div className="flex items-center">
                            {isImproving ? (
                              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                            ) : change > 0 ? (
                              <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                            ) : (
                              <div className="h-4 w-4 mr-1"></div>
                            )}
                            <span className={`text-sm ${
                              isImproving ? 'text-green-600' :
                              change > 0 ? 'text-red-600' : 'text-gray-600'
                            }`}>
                              {isImproving ? '提升' : change > 0 ? '下降' : '持平'}
                            </span>
                          </div>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* 分析总结 */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">趋势分析</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">表现亮点</h4>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>• 积分持续提升，从58.20降至45.20</li>
                <li>• 最近3个月保持稳定在45-48分区间</li>
                <li>• 获得多次第1名成绩</li>
                <li>• 比赛频率保持稳定</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">改进建议</h4>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>• 继续保持训练强度</li>
                <li>• 参加更多A级赛事提升积分</li>
                <li>• 注意避免伤病影响状态</li>
                <li>• 可考虑参与国际比赛</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}