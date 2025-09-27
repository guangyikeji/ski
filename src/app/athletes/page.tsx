'use client'

import { useState } from 'react'
import { Search, User, Trophy, Medal, TrendingUp, Filter } from 'lucide-react'

export default function AthletesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDiscipline, setSelectedDiscipline] = useState('all')

  // 模拟运动员数据
  const athletes = [
    {
      id: 1,
      name: '张伟',
      discipline: '高山滑雪',
      speciality: '大回转',
      points: 45.20,
      rank: 1,
      competitions: 12,
      bestResult: '第1名',
      province: '黑龙江'
    },
    {
      id: 2,
      name: '李小雪',
      discipline: '自由式滑雪',
      speciality: '大跳台',
      points: 285.50,
      rank: 2,
      competitions: 8,
      bestResult: '第2名',
      province: '吉林'
    },
    {
      id: 3,
      name: '王冰冰',
      discipline: '单板滑雪',
      speciality: 'U型场地',
      points: 198.75,
      rank: 3,
      competitions: 15,
      bestResult: '第1名',
      province: '北京'
    },
    {
      id: 4,
      name: '赵雪花',
      discipline: '高山滑雪',
      speciality: '回转',
      points: 52.30,
      rank: 4,
      competitions: 10,
      bestResult: '第3名',
      province: '河北'
    },
    {
      id: 5,
      name: '陈飞翔',
      discipline: '自由式滑雪',
      speciality: '坡面障碍技巧',
      points: 240.15,
      rank: 5,
      competitions: 9,
      bestResult: '第2名',
      province: '新疆'
    }
  ]

  const filteredAthletes = athletes.filter(athlete => {
    const matchesSearch = athlete.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         athlete.province.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDiscipline = selectedDiscipline === 'all' || athlete.discipline === selectedDiscipline
    return matchesSearch && matchesDiscipline
  })

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">运动员管理</h1>
          <p className="text-xl text-gray-600">
            中国滑雪运动员档案与积分统计
          </p>
        </div>

        {/* 搜索和筛选 */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="搜索运动员姓名或省份..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ski-blue"
              />
            </div>

            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <select
                value={selectedDiscipline}
                onChange={(e) => setSelectedDiscipline(e.target.value)}
                className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ski-blue"
              >
                <option value="all">所有项目</option>
                <option value="高山滑雪">高山滑雪</option>
                <option value="自由式滑雪">自由式滑雪</option>
                <option value="单板滑雪">单板滑雪</option>
              </select>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">
                找到 {filteredAthletes.length} 名运动员
              </span>
              <button className="bg-ski-blue text-white px-4 py-2 rounded-md hover:bg-ski-blue/90 transition-colors">
                导出列表
              </button>
            </div>
          </div>
        </div>

        {/* 统计卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-full">
                <User className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <div className="text-2xl font-bold text-gray-900">1,247</div>
                <div className="text-gray-600">注册运动员</div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-full">
                <Trophy className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <div className="text-2xl font-bold text-gray-900">563</div>
                <div className="text-gray-600">活跃运动员</div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center">
              <div className="bg-purple-100 p-3 rounded-full">
                <Medal className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <div className="text-2xl font-bold text-gray-900">89</div>
                <div className="text-gray-600">获奖运动员</div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center">
              <div className="bg-red-100 p-3 rounded-full">
                <TrendingUp className="h-6 w-6 text-red-600" />
              </div>
              <div className="ml-4">
                <div className="text-2xl font-bold text-gray-900">156</div>
                <div className="text-gray-600">积分提升</div>
              </div>
            </div>
          </div>
        </div>

        {/* 运动员列表 */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">运动员列表</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    排名
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    运动员
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    项目
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
                    所属地区
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredAthletes.map((athlete) => (
                  <tr key={athlete.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                          athlete.rank === 1 ? 'bg-yellow-100 text-yellow-800' :
                          athlete.rank === 2 ? 'bg-gray-100 text-gray-800' :
                          athlete.rank === 3 ? 'bg-orange-100 text-orange-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {athlete.rank}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                            <User className="h-6 w-6 text-gray-600" />
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{athlete.name}</div>
                          <div className="text-sm text-gray-500">{athlete.speciality}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        athlete.discipline === '高山滑雪' ? 'bg-blue-100 text-blue-800' :
                        athlete.discipline === '自由式滑雪' ? 'bg-green-100 text-green-800' :
                        'bg-purple-100 text-purple-800'
                      }`}>
                        {athlete.discipline}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {athlete.points}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {athlete.competitions}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {athlete.bestResult}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {athlete.province}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 分页 */}
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6 mt-6 rounded-lg shadow-md">
          <div className="flex-1 flex justify-between sm:hidden">
            <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              上一页
            </button>
            <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              下一页
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                显示第 <span className="font-medium">1</span> 到 <span className="font-medium">5</span> 条，
                共 <span className="font-medium">247</span> 条结果
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  上一页
                </button>
                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                  1
                </button>
                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                  2
                </button>
                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                  3
                </button>
                <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  下一页
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}