'use client'

import { useState, useMemo } from 'react'
import { getImagePath } from '@/utils/paths'
import { Search, Filter, Trophy, Calendar, MapPin, Users, Medal, Clock } from 'lucide-react'
import Image from 'next/image'

// 模拟数据，基于截图中的内容
const mockCompetitions = [
  {
    id: '1',
    name: '第二届全国青少年滑雪巡回赛—第一站',
    type: '个人赛',
    date: '2025-01-09~2025-01-12',
    location: '吉林省吉林市永吉县松江...',
    logo: '/images/skiing-scene.jpg',
    categories: [
      {
        name: '单板-大回转-女-少年乙组',
        results: [
          { rank: 1, name: '马楚轩', id: '83929', time: '01:32.19', points: 30 },
          { rank: 2, name: '曹娜琅', id: '92148', time: '01:34.48', points: 25 },
          { rank: 3, name: 'Albee Su', id: '66333', time: '01:34.94', points: 20 },
          { rank: 4, name: '关子涵', id: '90227', time: '01:35.41', points: 16 },
          { rank: 5, name: '肖金茂', id: '20046', time: '01:38.27', points: 12 },
          { rank: 6, name: '李姝妍', id: '82989', time: '01:42.10', points: 10 },
          { rank: 7, name: '李浠明', id: '15724', time: '01:49.69', points: 9 },
          { rank: 8, name: '刘桁溪', id: '40666', time: '02:12.92', points: 8 },
        ]
      },
      {
        name: '单板-大回转-男-少年乙组',
        results: [
          { rank: 1, name: '张明轩', id: '12345', time: '01:28.45', points: 30 },
          { rank: 2, name: '李浩然', id: '67890', time: '01:29.12', points: 25 },
          { rank: 3, name: '王子豪', id: '54321', time: '01:30.88', points: 20 },
          { rank: 4, name: '陈志强', id: '98765', time: '01:32.15', points: 16 },
          { rank: 5, name: '赵文博', id: '11111', time: '01:34.67', points: 12 },
        ]
      }
    ]
  }
]

type FilterType = 'all' | 'project' | 'group' | 'gender'

export default function ResultsQueryPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedProject, setSelectedProject] = useState('all')
  const [selectedGroup, setSelectedGroup] = useState('all')
  const [selectedGender, setSelectedGender] = useState('all')
  const [selectedCompetition, setSelectedCompetition] = useState(mockCompetitions[0])
  const [selectedCategory, setSelectedCategory] = useState(mockCompetitions[0].categories[0])

  const filteredResults = useMemo(() => {
    return selectedCategory.results.filter(result => {
      const matchesSearch = result.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           result.id.includes(searchTerm)

      // 根据组别筛选
      const matchesGroup = selectedGroup === 'all' || selectedCategory.name.includes(selectedGroup)

      // 根据性别筛选
      const matchesGender = selectedGender === 'all' || selectedCategory.name.includes(selectedGender === 'male' ? '男' : '女')

      return matchesSearch && matchesGroup && matchesGender
    })
  }, [searchTerm, selectedGroup, selectedGender, selectedCategory])

  const getRankColor = (rank: number) => {
    if (rank === 1) return 'bg-yellow-500'
    if (rank === 2) return 'bg-gray-400'
    if (rank === 3) return 'bg-orange-500'
    return 'bg-red-400'
  }

  const getRankIcon = (rank: number) => {
    if (rank <= 3) return <Medal className="h-4 w-4 text-white" />
    return <span className="text-white font-bold text-sm">{rank}</span>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 头部区域 */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">成绩公告</h1>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500">16:09</span>
              <div className="flex items-center gap-1">
                <div className="flex gap-1">
                  <div className="w-1 h-4 bg-black rounded-full"></div>
                  <div className="w-1 h-4 bg-black rounded-full"></div>
                  <div className="w-1 h-4 bg-black rounded-full"></div>
                </div>
                <span className="text-sm font-medium ml-2">4G</span>
                <div className="bg-gray-600 text-white text-xs px-1 rounded">63</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 比赛信息卡片 */}
      <div className="container mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-start gap-4">
            <div className="relative w-20 h-20 bg-red-600 rounded-lg flex items-center justify-center">
              <Image
                src={getImagePath("/images/results-screenshot.png")}
                alt="比赛logo"
                fill
                className="object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-red-600/80 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">赛</span>
              </div>
            </div>

            <div className="flex-1">
              <div className="bg-red-600 text-white px-2 py-1 rounded text-sm font-medium mb-2 inline-block">
                {selectedCompetition.name}
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-gray-600">比赛类型：</span>
                  <span className="font-medium">{selectedCompetition.type}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600">比赛时间：</span>
                  <span className="font-medium">{selectedCompetition.date}</span>
                </div>

                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600">比赛地点：</span>
                  <span className="font-medium">{selectedCompetition.location}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 搜索和筛选区域 */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="请输入参赛姓名关键字"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto">
            <select
              value={selectedProject}
              onChange={(e) => setSelectedProject(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg text-sm whitespace-nowrap"
            >
              <option value="all">选择项目 ▼</option>
              <option value="单板">单板</option>
              <option value="双板">双板</option>
            </select>

            <select
              value={selectedGroup}
              onChange={(e) => setSelectedGroup(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg text-sm whitespace-nowrap"
            >
              <option value="all">选择组别 ▼</option>
              <option value="少年甲">少年甲组</option>
              <option value="少年乙">少年乙组</option>
              <option value="青年">青年组</option>
            </select>

            <select
              value={selectedGender}
              onChange={(e) => setSelectedGender(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg text-sm whitespace-nowrap"
            >
              <option value="all">性别 ▼</option>
              <option value="male">男</option>
              <option value="female">女</option>
            </select>
          </div>
        </div>

        {/* 项目选择 */}
        <div className="mb-4">
          <div className="flex gap-2 overflow-x-auto">
            {selectedCompetition.categories.map((category, index) => (
              <button
                key={index}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg whitespace-nowrap text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-red-600 text-white'
                    : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* 成绩表 */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="bg-red-600 text-white p-4">
            <h2 className="font-bold text-lg">{selectedCategory.name}</h2>
          </div>

          {/* 表头 */}
          <div className="bg-red-300 px-4 py-3">
            <div className="grid grid-cols-5 gap-4 text-center font-medium text-red-900">
              <div>名次</div>
              <div>姓名</div>
              <div>报名ID</div>
              <div>总成绩</div>
              <div>积分</div>
            </div>
          </div>

          {/* 成绩列表 */}
          <div className="divide-y divide-gray-100">
            {filteredResults.map((result, index) => (
              <div key={index} className={`px-4 py-4 ${getRankColor(result.rank)}`}>
                <div className="grid grid-cols-5 gap-4 text-center items-center text-white">
                  <div className="flex items-center justify-center">
                    <div className={`w-8 h-8 rounded-full ${getRankColor(result.rank)} flex items-center justify-center`}>
                      {getRankIcon(result.rank)}
                    </div>
                  </div>
                  <div className="font-medium">{result.name}</div>
                  <div>{result.id}</div>
                  <div className="flex items-center justify-center gap-1">
                    <Clock className="h-4 w-4" />
                    {result.time}
                  </div>
                  <div className="font-bold">{result.points}</div>
                </div>
              </div>
            ))}
          </div>

          {filteredResults.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <Users className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p>暂无符合条件的成绩</p>
            </div>
          )}
        </div>

        {/* 底部提示 */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Trophy className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-blue-800">
              <p className="font-medium mb-1">成绩说明</p>
              <ul className="space-y-1 text-xs">
                <li>• 成绩按照总用时排序，用时越短排名越靠前</li>
                <li>• 积分根据中国积分规则计算</li>
                <li>• 前三名将获得奖牌，分别为金牌、银牌、铜牌</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}