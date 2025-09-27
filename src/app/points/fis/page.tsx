'use client'

import { useState } from 'react'
import { Search, Download, User, Calendar, MapPin, Trophy, BarChart3 } from 'lucide-react'

export default function FISPointsQueryPage() {
  const [searchType, setSearchType] = useState('name')
  const [searchValue, setSearchValue] = useState('')
  const [selectedDiscipline, setSelectedDiscipline] = useState('all')
  const [showResults, setShowResults] = useState(false)

  // 模拟查询结果
  const queryResults = [
    {
      id: 1,
      name: '张伟',
      fisCode: 'CHN123456',
      birthYear: 1995,
      gender: 'Male',
      nation: 'CHN',
      club: '黑龙江滑雪队',
      disciplines: {
        DH: { points: 45.20, rank: 156, competitions: 8, lastUpdate: '2024-09-15' },
        SL: { points: 48.75, rank: 234, competitions: 12, lastUpdate: '2024-09-20' },
        GS: { points: 42.30, rank: 89, competitions: 15, lastUpdate: '2024-09-25' },
        SG: { points: 52.10, rank: 198, competitions: 6, lastUpdate: '2024-09-10' }
      }
    },
    {
      id: 2,
      name: '李小雪',
      fisCode: 'CHN234567',
      birthYear: 1998,
      gender: 'Female',
      nation: 'CHN',
      club: '吉林省滑雪协会',
      disciplines: {
        SL: { points: 38.45, rank: 67, competitions: 14, lastUpdate: '2024-09-22' },
        GS: { points: 41.20, rank: 92, competitions: 11, lastUpdate: '2024-09-18' }
      }
    }
  ]

  const handleSearch = () => {
    setShowResults(true)
  }

  const getDisciplineName = (code: string) => {
    const names: { [key: string]: string } = {
      DH: '速降',
      SL: '回转',
      GS: '大回转',
      SG: '超级大回转',
      AC: '全能'
    }
    return names[code] || code
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="h-8 w-8 text-red-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">中国积分查询</h1>
          <p className="text-xl text-gray-600">
            查询中国滑雪运动员积分记录与排名信息
          </p>
        </div>

        {/* 搜索表单 */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">积分查询</h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">查询方式</label>
              <select
                value={searchType}
                onChange={(e) => setSearchType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="name">姓名</option>
                <option value="fisCode">FIS代码</option>
                <option value="club">俱乐部</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {searchType === 'name' ? '运动员姓名' :
                 searchType === 'fisCode' ? 'FIS代码' : '俱乐部名称'}
              </label>
              <input
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder={
                  searchType === 'name' ? '请输入运动员姓名' :
                  searchType === 'fisCode' ? '请输入FIS代码' : '请输入俱乐部名称'
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">项目筛选</label>
              <select
                value={selectedDiscipline}
                onChange={(e) => setSelectedDiscipline(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="all">所有项目</option>
                <option value="DH">速降</option>
                <option value="SL">回转</option>
                <option value="GS">大回转</option>
                <option value="SG">超级大回转</option>
                <option value="AC">全能</option>
              </select>
            </div>

            <div className="flex items-end">
              <button
                onClick={handleSearch}
                className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors flex items-center justify-center"
              >
                <Search className="h-4 w-4 mr-2" />
                查询
              </button>
            </div>
          </div>

          <div className="text-sm text-gray-500">
            <p>• 支持模糊查询，输入部分信息即可搜索</p>
            <p>• 积分数据每周更新，最新更新时间会显示在结果中</p>
            <p>• 中国积分规则：积分越低排名越高（高山滑雪）</p>
          </div>
        </div>

        {/* 查询结果 */}
        {showResults && (
          <div className="space-y-6">
            {queryResults.map((athlete) => (
              <div key={athlete.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                {/* 运动员基本信息 */}
                <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="bg-white/20 p-3 rounded-full">
                        <User className="h-8 w-8" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold">{athlete.name}</h3>
                        <div className="flex items-center space-x-4 text-red-100">
                          <span>FIS代码: {athlete.fisCode}</span>
                          <span>•</span>
                          <span>出生年份: {athlete.birthYear}</span>
                          <span>•</span>
                          <span>{athlete.gender === 'Male' ? '男子' : '女子'}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center text-red-100 mb-1">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>{athlete.nation}</span>
                      </div>
                      <div className="text-sm text-red-100">{athlete.club}</div>
                    </div>
                  </div>
                </div>

                {/* 积分详情 */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-semibold text-gray-900">项目积分</h4>
                    <button className="flex items-center text-red-600 hover:text-red-700">
                      <Download className="h-4 w-4 mr-1" />
                      导出数据
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {Object.entries(athlete.disciplines).map(([discipline, data]) => (
                      <div key={discipline} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="font-medium text-gray-900">{getDisciplineName(discipline)}</h5>
                          <span className="text-xs text-gray-500">{discipline}</span>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">积分:</span>
                            <span className="font-bold text-red-600">{data.points}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">排名:</span>
                            <span className="font-medium">第{data.rank}名</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">参赛:</span>
                            <span>{data.competitions}次</span>
                          </div>
                          <div className="text-xs text-gray-500 border-t pt-2">
                            <Calendar className="h-3 w-3 inline mr-1" />
                            更新: {data.lastUpdate}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* 最佳项目统计 */}
                  <div className="mt-6 bg-gray-50 rounded-lg p-4">
                    <h5 className="font-medium text-gray-900 mb-3">统计信息</h5>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div className="flex items-center">
                        <Trophy className="h-4 w-4 text-yellow-500 mr-2" />
                        <span>最佳项目: {getDisciplineName(
                          Object.entries(athlete.disciplines).reduce((best, [discipline, data]) =>
                            data.rank < athlete.disciplines[best as keyof typeof athlete.disciplines].rank ? discipline : best
                          )[0]
                        )}</span>
                      </div>
                      <div className="flex items-center">
                        <BarChart3 className="h-4 w-4 text-blue-500 mr-2" />
                        <span>总参赛: {Object.values(athlete.disciplines).reduce((sum, data) => sum + data.competitions, 0)}次</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 text-green-500 mr-2" />
                        <span>最近更新: {Math.max(...Object.values(athlete.disciplines).map(data => new Date(data.lastUpdate).getTime()))}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 查询说明 */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">查询说明</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">积分系统</h4>
              <ul className="space-y-1">
                <li>• 基于中国高山滑雪积分规则v4.0</li>
                <li>• 积分越低排名越高</li>
                <li>• 每周更新一次</li>
                <li>• 包含国内所有正式比赛</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">数据来源</h4>
              <ul className="space-y-1">
                <li>• 中国滑雪协会官方数据</li>
                <li>• 各省市滑雪协会上报</li>
                <li>• FIS认证赛事成绩</li>
                <li>• 实时同步更新</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 联系我们 */}
        <div className="mt-8 bg-red-50 border border-red-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-red-800 mb-2">数据问题反馈</h3>
          <p className="text-red-700 text-sm">
            如发现积分数据有误或需要更新个人信息，请联系：
            <span className="font-medium ml-1">points@ski-china.com</span>
            或致电：
            <span className="font-medium ml-1">400-123-4567</span>
          </p>
        </div>
      </div>
    </div>
  )
}