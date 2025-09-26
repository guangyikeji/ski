'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import {
  Search,
  Filter,
  Download,
  Calendar,
  MapPin,
  Trophy,
  Users,
  Medal,
  Clock,
  Printer,
  Share2,
  ChevronDown,
  ArrowUpDown
} from 'lucide-react'
import { getImagePath } from '@/utils/paths'

// 赛事参赛选手成绩数据接口
interface AthleteResult {
  rank: number
  name: string
  registrationId: string
  time: string
  points: number
  bibNumber?: number
  category: string
  gender: 'male' | 'female'
  club?: string
  province?: string
}

// 赛事信息接口
interface CompetitionInfo {
  id: string
  name: string
  type: string
  date: string
  location: string
  discipline: string
  categories: string[]
}

// 可选择的赛事列表
const availableCompetitions = [
  {
    id: '1',
    name: '2024全国高山滑雪锦标赛',
    location: '长白山万达滑雪场',
    date: '2024-12-20',
    discipline: '大回转'
  },
  {
    id: '2',
    name: '北京市青少年滑雪公开赛',
    location: '北京南山滑雪场',
    date: '2024-12-25',
    discipline: '回转'
  },
  {
    id: '3',
    name: '张家口滑雪邀请赛',
    location: '崇礼云顶滑雪场',
    date: '2024-12-30',
    discipline: '超级大回转'
  }
]

// 模拟赛事数据
const mockCompetitionData: { [key: string]: CompetitionInfo } = {
  '1': {
    id: '1',
    name: '第二届全国青少年滑雪巡回赛——第一站',
    type: '个人赛',
    date: '2025-01-09~2025-01-12',
    location: '吉林省吉林市永吉县松江...',
    discipline: '单板-大回转',
    categories: ['女子少年乙组', '男子少年乙组', '女子青年组', '男子青年组']
  },
  '3': {
    id: '3',
    name: '哈尔滨冰雪节滑雪邀请赛',
    type: '邀请赛',
    date: '2024-12-10~2024-12-12',
    location: '亚布力滑雪场',
    discipline: '速降',
    categories: ['男子公开组', '女子公开组']
  }
}

// 模拟成绩数据
const mockResults: AthleteResult[] = [
  { rank: 1, name: '马楚轩', registrationId: '83929', time: '01:32.19', points: 30, category: '女子少年乙组', gender: 'female', club: '北京滑雪队', province: '北京' },
  { rank: 2, name: '曹娜珠', registrationId: '92148', time: '01:34.48', points: 25, category: '女子少年乙组', gender: 'female', club: '河北滑雪队', province: '河北' },
  { rank: 3, name: 'Albee Su', registrationId: '66333', time: '01:34.94', points: 20, category: '女子少年乙组', gender: 'female', club: '国际俱乐部', province: '外籍' },
  { rank: 4, name: '关子滴', registrationId: '90227', time: '01:35.41', points: 16, category: '女子少年乙组', gender: 'female', club: '黑龙江滑雪队', province: '黑龙江' },
  { rank: 5, name: '肖金茂', registrationId: '20046', time: '01:38.27', points: 12, category: '女子少年乙组', gender: 'female', club: '辽宁滑雪队', province: '辽宁' },
  { rank: 6, name: '李妹妍', registrationId: '82989', time: '01:42.10', points: 10, category: '女子少年乙组', gender: 'female', club: '山东滑雪队', province: '山东' },
  { rank: 7, name: '李沛明', registrationId: '15724', time: '01:49.69', points: 9, category: '女子少年乙组', gender: 'female', club: '江苏滑雪队', province: '江苏' },
  { rank: 8, name: '刘桥溪', registrationId: '40666', time: '02:12.92', points: 8, category: '女子少年乙组', gender: 'female', club: '广东滑雪队', province: '广东' },
  { rank: 9, name: '张明轩', registrationId: '78945', time: '01:28.15', points: 35, category: '男子少年乙组', gender: 'male', club: '北京滑雪队', province: '北京' },
  { rank: 10, name: '李志强', registrationId: '65432', time: '01:30.87', points: 28, category: '男子少年乙组', gender: 'male', club: '吉林滑雪队', province: '吉林' },
]

// 使用 useSearchParams 的内部组件
function CompetitionResultsContent() {
  const searchParams = useSearchParams()
  const [selectedCompetitionId, setSelectedCompetitionId] = useState('1')
  const [competitionInfo, setCompetitionInfo] = useState<CompetitionInfo | null>(null)
  const [results, setResults] = useState<AthleteResult[]>([])
  const [filteredResults, setFilteredResults] = useState<AthleteResult[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedGender, setSelectedGender] = useState('all')
  const [sortField, setSortField] = useState<'rank' | 'time' | 'points'>('rank')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')

  useEffect(() => {
    if (!searchParams) return

    const competitionName = searchParams.get('competition')
    const competitionId = searchParams.get('id') || selectedCompetitionId

    // 获取赛事信息
    const info = mockCompetitionData[competitionId] || mockCompetitionData['1']
    if (competitionName) {
      info.name = decodeURIComponent(competitionName)
    }
    setCompetitionInfo(info)

    // 设置成绩数据
    setResults(mockResults)
    setFilteredResults(mockResults)
  }, [searchParams, selectedCompetitionId])

  // 处理赛事选择变化
  useEffect(() => {
    const info = mockCompetitionData[selectedCompetitionId] || mockCompetitionData['1']
    setCompetitionInfo(info)
    // 根据选择的赛事加载不同的成绩数据
    setResults(mockResults)
    setFilteredResults(mockResults)
  }, [selectedCompetitionId])

  // 筛选和搜索功能
  useEffect(() => {
    let filtered = results.filter(result => {
      const matchSearch = result.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         result.registrationId.includes(searchTerm) ||
                         (result.club && result.club.toLowerCase().includes(searchTerm.toLowerCase()))
      const matchCategory = selectedCategory === 'all' || result.category === selectedCategory
      const matchGender = selectedGender === 'all' || result.gender === selectedGender
      return matchSearch && matchCategory && matchGender
    })

    // 排序
    filtered.sort((a, b) => {
      let aValue, bValue
      switch (sortField) {
        case 'rank':
          aValue = a.rank
          bValue = b.rank
          break
        case 'time':
          aValue = a.time
          bValue = b.time
          break
        case 'points':
          aValue = a.points
          bValue = b.points
          break
        default:
          aValue = a.rank
          bValue = b.rank
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })

    setFilteredResults(filtered)
  }, [results, searchTerm, selectedCategory, selectedGender, sortField, sortOrder])

  const handleSort = (field: 'rank' | 'time' | 'points') => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortOrder('asc')
    }
  }

  const getRankMedal = (rank: number) => {
    switch (rank) {
      case 1:
        return <Medal className="h-5 w-5 text-yellow-500" />
      case 2:
        return <Medal className="h-5 w-5 text-gray-400" />
      case 3:
        return <Medal className="h-5 w-5 text-orange-600" />
      default:
        return <span className="w-5 h-5 flex items-center justify-center text-sm font-medium text-gray-600">{rank}</span>
    }
  }

  if (!competitionInfo) {
    return <div>加载中...</div>
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* 背景装饰 */}
      <div className="absolute top-0 right-0 w-40 h-40 opacity-15 rounded-full overflow-hidden">
        <img
          src={getImagePath("/images/ski-action-2.jpg")}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      {/* 赛事选择器 */}
      <div className="card mb-6 relative z-10">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-ski-navy">选择赛事</h2>
          <div className="relative">
            <select
              value={selectedCompetitionId}
              onChange={(e) => setSelectedCompetitionId(e.target.value)}
              className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:ring-2 focus:ring-ski-blue focus:border-transparent"
            >
              {availableCompetitions.map(comp => (
                <option key={comp.id} value={comp.id}>
                  {comp.name} - {comp.location} ({comp.date})
                </option>
              ))}
            </select>
            <ChevronDown className="h-5 w-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* 赛事信息卡片 */}
      <div className="card mb-8 relative z-10">
        <div className="flex items-start space-x-4">
          {/* 赛事Logo */}
          <div className="w-24 h-24 bg-ski-blue rounded-lg flex items-center justify-center flex-shrink-0">
            <div className="text-white text-center">
              <Trophy className="h-8 w-8 mx-auto mb-1" />
              <div className="text-xs font-bold">赛事</div>
            </div>
          </div>

          {/* 赛事信息 */}
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-ski-navy mb-2">{competitionInfo.name}</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
              <div className="flex items-center">
                <span className="font-medium text-gray-900 mr-2">比赛类型:</span>
                {competitionInfo.type}
              </div>
              <div className="flex items-center">
                <span className="font-medium text-gray-900 mr-2">比赛时间:</span>
                {competitionInfo.date}
              </div>
              <div className="flex items-center">
                <span className="font-medium text-gray-900 mr-2">比赛地点:</span>
                {competitionInfo.location}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 搜索和筛选 */}
      <div className="card mb-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* 搜索框 */}
          <div className="relative flex-1">
            <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="请输入参赛选手姓名关键字"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ski-blue focus:border-transparent"
            />
          </div>

          {/* 筛选器 */}
          <div className="flex space-x-3">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ski-blue"
            >
              <option value="all">选择项目</option>
              {competitionInfo.categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>

            <select
              value={selectedGender}
              onChange={(e) => setSelectedGender(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ski-blue"
            >
              <option value="all">性别</option>
              <option value="male">男子</option>
              <option value="female">女子</option>
            </select>
          </div>
        </div>
      </div>

      {/* 当前显示的项目标题 */}
      <div className="mb-6 relative z-10">
        <h2 className="text-xl font-bold text-ski-navy">
          {selectedCategory === 'all' ? competitionInfo.discipline : `${competitionInfo.discipline}-${selectedCategory}`}
        </h2>
        <p className="text-gray-600">共 {filteredResults.length} 名选手参赛</p>
      </div>

      {/* 成绩表格 */}
      <div className="card overflow-hidden relative z-10">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-ski-ice text-ski-blue">
                <th className="px-4 py-3 text-left font-medium">
                  <button
                    onClick={() => handleSort('rank')}
                    className="flex items-center space-x-1 hover:text-ski-navy"
                  >
                    <span>名次</span>
                    <ArrowUpDown className="h-4 w-4" />
                  </button>
                </th>
                <th className="px-4 py-3 text-left font-medium">姓名</th>
                <th className="px-4 py-3 text-left font-medium">报名ID</th>
                <th className="px-4 py-3 text-left font-medium">
                  <button
                    onClick={() => handleSort('time')}
                    className="flex items-center space-x-1 hover:text-ski-navy"
                  >
                    <span>总成绩</span>
                    <ArrowUpDown className="h-4 w-4" />
                  </button>
                </th>
                <th className="px-4 py-3 text-left font-medium">
                  <button
                    onClick={() => handleSort('points')}
                    className="flex items-center space-x-1 hover:text-ski-navy"
                  >
                    <span>积分</span>
                    <ArrowUpDown className="h-4 w-4" />
                  </button>
                </th>
                <th className="px-4 py-3 text-left font-medium">俱乐部</th>
              </tr>
            </thead>
            <tbody>
              {filteredResults.map((result, index) => (
                <tr
                  key={result.registrationId}
                  className={`border-b border-gray-100 ${
                    result.rank <= 3 ? 'bg-ski-ice' : index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                  }`}
                >
                  <td className="px-4 py-4">
                    <div className="flex items-center">
                      {getRankMedal(result.rank)}
                    </div>
                  </td>
                  <td className="px-4 py-4 font-medium text-gray-900">{result.name}</td>
                  <td className="px-4 py-4 text-gray-600">{result.registrationId}</td>
                  <td className="px-4 py-4 font-mono text-gray-900">{result.time}</td>
                  <td className="px-4 py-4 font-semibold text-ski-blue">{result.points}</td>
                  <td className="px-4 py-4 text-gray-600 text-sm">{result.club}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredResults.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            没有找到符合条件的选手成绩
          </div>
        )}
      </div>

      {/* 操作按钮 */}
      <div className="flex justify-center space-x-4 mt-8 relative z-10">
        <button className="flex items-center space-x-2 px-6 py-3 bg-ski-blue text-white rounded-lg hover:bg-ski-blue/90 transition-colors">
          <Download className="h-5 w-5" />
          <span>下载完整成绩</span>
        </button>
        <button className="flex items-center space-x-2 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
          <Printer className="h-5 w-5" />
          <span>打印成绩</span>
        </button>
        <button className="flex items-center space-x-2 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
          <Share2 className="h-5 w-5" />
          <span>分享</span>
        </button>
      </div>
    </div>
  )
}

// Loading 组件
function ResultsLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h1 className="section-title">赛事公布</h1>
        <p className="text-gray-600 text-lg">加载中...</p>
      </div>
      <div className="animate-pulse space-y-4">
        <div className="h-32 bg-gray-200 rounded-lg"></div>
        <div className="h-64 bg-gray-200 rounded-lg"></div>
      </div>
    </div>
  )
}

// 主组件，用 Suspense 包装
export default function ResultsAnnouncementPage() {
  return (
    <Suspense fallback={<ResultsLoading />}>
      <CompetitionResultsContent />
    </Suspense>
  )
}