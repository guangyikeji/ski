'use client'

import { useState } from 'react'
import { Trophy, Medal, Award, Crown, TrendingUp, TrendingDown, Minus } from 'lucide-react'

export default function PointsRankingsPage() {
  const [selectedDiscipline, setSelectedDiscipline] = useState('all')
  const [selectedGender, setSelectedGender] = useState('all')

  // 模拟排行榜数据
  const rankings = [
    {
      rank: 1,
      name: '张伟',
      points: 45.20,
      discipline: '高山滑雪',
      speciality: '大回转',
      gender: 'male',
      change: 'up',
      changeValue: 2,
      competitions: 12,
      bestPoints: 38.45,
      province: '黑龙江'
    },
    {
      rank: 2,
      name: '李小雪',
      points: 48.75,
      discipline: '高山滑雪',
      speciality: '回转',
      gender: 'female',
      change: 'same',
      changeValue: 0,
      competitions: 10,
      bestPoints: 45.20,
      province: '吉林'
    },
    {
      rank: 3,
      name: '王冰冰',
      points: 285.50,
      discipline: '自由式滑雪',
      speciality: '大跳台',
      gender: 'female',
      change: 'up',
      changeValue: 1,
      competitions: 8,
      bestPoints: 360.00,
      province: '北京'
    },
    {
      rank: 4,
      name: '赵雪花',
      points: 52.30,
      discipline: '高山滑雪',
      speciality: '速降',
      gender: 'female',
      change: 'down',
      changeValue: 1,
      competitions: 15,
      bestPoints: 48.90,
      province: '河北'
    },
    {
      rank: 5,
      name: '陈飞翔',
      points: 198.75,
      discipline: '单板滑雪',
      speciality: 'U型场地',
      gender: 'male',
      change: 'up',
      changeValue: 3,
      competitions: 9,
      bestPoints: 240.00,
      province: '新疆'
    }
  ]

  const filteredRankings = rankings.filter(athlete => {
    const matchesDiscipline = selectedDiscipline === 'all' || athlete.discipline === selectedDiscipline
    const matchesGender = selectedGender === 'all' || athlete.gender === selectedGender
    return matchesDiscipline && matchesGender
  })

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-6 w-6 text-yellow-500" />
      case 2:
        return <Medal className="h-6 w-6 text-gray-400" />
      case 3:
        return <Award className="h-6 w-6 text-orange-500" />
      default:
        return <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-bold">{rank}</div>
    }
  }

  const getChangeIcon = (change: string, value: number) => {
    switch (change) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-green-500" />
      case 'down':
        return <TrendingDown className="h-4 w-4 text-red-500" />
      default:
        return <Minus className="h-4 w-4 text-gray-500" />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Trophy className="h-8 w-8 text-purple-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">积分排行榜</h1>
          <p className="text-xl text-gray-600">
            中国滑雪运动员积分排名统计
          </p>
        </div>

        {/* 筛选器 */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">项目</label>
              <select
                value={selectedDiscipline}
                onChange={(e) => setSelectedDiscipline(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="all">所有项目</option>
                <option value="高山滑雪">高山滑雪</option>
                <option value="自由式滑雪">自由式滑雪</option>
                <option value="单板滑雪">单板滑雪</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">性别</label>
              <select
                value={selectedGender}
                onChange={(e) => setSelectedGender(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="all">所有性别</option>
                <option value="male">男子</option>
                <option value="female">女子</option>
              </select>
            </div>

            <div className="flex items-end">
              <button className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition-colors">
                导出排行榜
              </button>
            </div>
          </div>
        </div>

        {/* 排行榜统计 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="text-3xl font-bold text-yellow-500 mb-2">1,247</div>
            <div className="text-gray-600">参与排名运动员</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="text-3xl font-bold text-blue-500 mb-2">156</div>
            <div className="text-gray-600">本周积分变化</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="text-3xl font-bold text-green-500 mb-2">89</div>
            <div className="text-gray-600">排名上升</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="text-3xl font-bold text-red-500 mb-2">67</div>
            <div className="text-gray-600">排名下降</div>
          </div>
        </div>

        {/* 排行榜表格 */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">积分排行榜</h2>
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
                    项目/专项
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    当前积分
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    最好积分
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    参赛次数
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    排名变化
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    所属地区
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredRankings.map((athlete) => (
                  <tr key={athlete.rank} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        {getRankIcon(athlete.rank)}
                        {athlete.rank <= 3 && (
                          <span className="text-sm font-medium text-gray-900">#{athlete.rank}</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                            <span className="text-sm font-medium text-gray-600">
                              {athlete.name.charAt(0)}
                            </span>
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{athlete.name}</div>
                          <div className="text-sm text-gray-500">{athlete.gender === 'male' ? '男子' : '女子'}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{athlete.discipline}</div>
                        <div className="text-sm text-gray-500">{athlete.speciality}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-bold text-gray-900">{athlete.points}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{athlete.bestPoints}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{athlete.competitions}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-1">
                        {getChangeIcon(athlete.change, athlete.changeValue)}
                        <span className={`text-sm ${
                          athlete.change === 'up' ? 'text-green-600' :
                          athlete.change === 'down' ? 'text-red-600' :
                          'text-gray-600'
                        }`}>
                          {athlete.change === 'same' ? '持平' :
                           athlete.change === 'up' ? `+${athlete.changeValue}` :
                           `-${athlete.changeValue}`}
                        </span>
                      </div>
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

        {/* 排行榜说明 */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">排行榜说明</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">积分规则</h4>
              <ul className="space-y-1">
                <li>• 高山滑雪：积分越低排名越高（基于时间）</li>
                <li>• 自由式/单板：积分越高排名越高（基于表现）</li>
                <li>• 积分每周更新一次</li>
                <li>• 取当前赛季最好成绩</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">排名变化</h4>
              <ul className="space-y-1">
                <li>• ↗ 绿色：排名上升</li>
                <li>• ↘ 红色：排名下降</li>
                <li>• ─ 灰色：排名不变</li>
                <li>• 数字表示变化位次</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}