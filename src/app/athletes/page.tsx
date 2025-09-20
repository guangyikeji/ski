'use client'

import { useState } from 'react'
import { getImagePath } from '@/utils/paths'
import { exportToCSV, exportToExcel, exportToJSON } from '@/utils/exportUtils'
import {
  User,
  Search,
  Filter,
  Edit,
  Eye,
  Medal,
  TrendingUp,
  TrendingDown,
  Calendar,
  MapPin,
  Star,
  Plus,
  Download,
  Trophy,
  Target,
  Users,
  Award
} from 'lucide-react'
import { mockAthletes, getStatistics } from '@/data/mockData'

// 转换数据格式以适配现有UI
const convertAthleteData = (athletes: typeof mockAthletes) => {
  return athletes.map((athlete, index) => ({
    id: index + 1,
    name: athlete.name,
    avatar: athlete.gender === 'male' ? '👨' : '👩',
    gender: athlete.gender,
    age: new Date().getFullYear() - new Date(athlete.birthDate).getFullYear(),
    nationality: athlete.nationality,
    region: athlete.nationality === 'CHN' ? ['黑龙江', '吉林', '北京', '河北', '内蒙古'][index % 5] : athlete.nationality,
    fisCode: athlete.fisCode,
    specialties: athlete.specialties.map(s => {
      const mapping: Record<string, string> = {
        'SL': '回转',
        'GS': '大回转',
        'SG': '超级大回转',
        'DH': '速降'
      }
      return mapping[s] || s
    }),
    currentPoints: athlete.currentPoints,
    rank: {
      SL: Math.floor(Math.random() * 10) + 1,
      GS: Math.floor(Math.random() * 10) + 1,
      SG: Math.floor(Math.random() * 10) + 1,
      DH: Math.floor(Math.random() * 10) + 1
    },
    trend: athlete.status === 'active' ? (Math.random() > 0.3 ? 'up' : 'stable') : 'down',
    totalRaces: Math.floor(Math.random() * 30) + 15,
    podiumFinishes: Math.floor(Math.random() * 15) + 3,
    bestResult: ['1st', '2nd', '3rd'][Math.floor(Math.random() * 3)],
    lastCompetition: '2024-02-15',
    status: athlete.status,
    club: athlete.team || '滑雪俱乐部',
    coach: athlete.coach || '教练',
    profileImage: '/images/ski-bg.jpg'
  }))
}

const convertedAthletes = convertAthleteData(mockAthletes)

const statusConfig = {
  active: { label: '活跃', color: 'bg-green-100 text-green-800' },
  rising: { label: '新星', color: 'bg-blue-100 text-blue-800' },
  veteran: { label: '老将', color: 'bg-purple-100 text-purple-800' },
  injured: { label: '伤病', color: 'bg-red-100 text-red-800' },
  retired: { label: '退役', color: 'bg-gray-100 text-gray-800' }
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

export default function AthletesPage() {
  const [selectedGender, setSelectedGender] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [selectedRegion, setSelectedRegion] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  const handleAddAthlete = () => {
    alert('运动员注册功能开发中，敬请期待！\n\n该功能将包括：\n- 基本信息录入\n- FIS编码申请\n- 证件上传\n- 资格审核\n\n预计下个版本上线。')
  }

  const handleExportAthletes = () => {
    const exportData = {
      filename: `运动员名单_${new Date().toISOString().split('T')[0]}`,
      data: filteredAthletes.map(athlete => ({
        'FIS编码': athlete.fisCode,
        '姓名': athlete.name,
        '性别': athlete.gender === 'male' ? '男' : '女',
        '出生日期': athlete.birthDate,
        '国籍': athlete.nationality,
        '地区': athlete.region,
        '状态': athlete.status === 'active' ? '活跃' : athlete.status === 'inactive' ? '非活跃' : '退役',
        '专项': athlete.specialties?.join(', ') || '',
        '当前积分': Object.values(athlete.currentPoints || {}).join(', ') || 'N/A',
        '注册日期': athlete.registrationDate
      })),
      title: '运动员名单'
    }

    exportToExcel(exportData)
    alert('运动员名单导出成功！')
  }

  const stats = getStatistics()

  const filteredAthletes = convertedAthletes.filter(athlete => {
    const matchGender = selectedGender === 'all' || athlete.gender === selectedGender
    const matchStatus = selectedStatus === 'all' || athlete.status === selectedStatus
    const matchRegion = selectedRegion === 'all' || athlete.region === selectedRegion
    const matchSearch = athlete.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       athlete.fisCode.includes(searchTerm) ||
                       athlete.club.toLowerCase().includes(searchTerm.toLowerCase())
    return matchGender && matchStatus && matchRegion && matchSearch
  })

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
      {/* 背景装饰 */}
      <div className="absolute top-0 right-0 w-40 h-40 opacity-15 rounded-full overflow-hidden">
        <img
          src={getImagePath("/images/skiing-2.jpg")}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute bottom-20 left-10 w-32 h-32 opacity-15 rounded-full overflow-hidden">
        <img
          src={getImagePath("/images/skiing-scene.jpg")}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute top-1/2 right-1/4 w-28 h-28 opacity-10 rounded-full overflow-hidden">
        <img
          src={getImagePath("/images/giant-slalom.jpg")}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      {/* Header */}
      <div className="text-center mb-8 relative z-10">
        <h1 className="section-title">运动员档案</h1>
        <p className="text-gray-600 text-lg">
          全面管理运动员信息、积分历史和比赛表现
        </p>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8 relative z-10">
        <div className="card text-center">
          <Users className="h-8 w-8 text-ski-blue mx-auto mb-2" />
          <div className="text-2xl font-bold text-ski-navy">{stats.totalAthletes}</div>
          <div className="text-sm text-gray-600">注册运动员</div>
        </div>
        <div className="card text-center">
          <Trophy className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-ski-navy">{stats.activeAthletes}</div>
          <div className="text-sm text-gray-600">活跃选手</div>
        </div>
        <div className="card text-center">
          <Target className="h-8 w-8 text-green-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-ski-navy">{stats.totalCompetitions}</div>
          <div className="text-sm text-gray-600">总比赛数</div>
        </div>
        <div className="card text-center">
          <Award className="h-8 w-8 text-purple-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-ski-navy">{stats.totalResults}</div>
          <div className="text-sm text-gray-600">比赛成绩</div>
        </div>
      </div>

      {/* 筛选和搜索 */}
      <div className="card mb-8 relative z-10">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">筛选条件:</span>
          </div>

          <select
            value={selectedGender}
            onChange={(e) => setSelectedGender(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ski-blue"
          >
            <option value="all">全部性别</option>
            <option value="male">男性</option>
            <option value="female">女性</option>
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ski-blue"
          >
            <option value="all">全部状态</option>
            <option value="active">活跃</option>
            <option value="rising">新星</option>
            <option value="veteran">老将</option>
            <option value="injured">伤病</option>
            <option value="retired">退役</option>
          </select>

          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ski-blue"
          >
            <option value="all">全部地区</option>
            <option value="黑龙江">黑龙江</option>
            <option value="吉林">吉林</option>
            <option value="北京">北京</option>
            <option value="河北">河北</option>
            <option value="内蒙古">内蒙古</option>
          </select>

          <div className="relative flex-1 max-w-md">
            <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="搜索姓名、FIS代码或俱乐部..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ski-blue"
            />
          </div>

          <div className="flex space-x-2">
            <button
              className="btn-primary flex items-center"
              onClick={handleAddAthlete}
            >
              <Plus className="h-4 w-4 mr-2" />
              添加运动员
            </button>
            <button
              className="btn-secondary flex items-center"
              onClick={handleExportAthletes}
            >
              <Download className="h-4 w-4 mr-2" />
              导出
            </button>
          </div>
        </div>
      </div>

      {/* 运动员卡片列表 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
        {filteredAthletes.map((athlete) => {
          const StatusConfig = statusConfig[athlete.status as keyof typeof statusConfig]
          const bestPoints = Math.min(...Object.values(athlete.currentPoints))
          const specialtiesText = athlete.specialties.join('、')

          return (
            <div key={athlete.id} className="card hover:shadow-lg transition-shadow duration-200">
              {/* 头像和基本信息 */}
              <div className="flex items-start space-x-4 mb-4">
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-ski-blue to-primary-700 rounded-full flex items-center justify-center text-2xl">
                    {athlete.avatar}
                  </div>
                  <div className="absolute -bottom-1 -right-1">
                    {getTrendIcon(athlete.trend)}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-lg font-bold text-ski-navy">{athlete.name}</h3>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${StatusConfig.color}`}>
                      {StatusConfig.label}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 space-y-1">
                    <div className="flex items-center">
                      <User className="h-3 w-3 mr-1" />
                      {athlete.age}岁 • {athlete.nationality}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-3 w-3 mr-1" />
                      {athlete.region}
                    </div>
                  </div>
                </div>
              </div>

              {/* FIS代码和专项 */}
              <div className="bg-gray-50 rounded-lg p-3 mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs text-gray-500">FIS代码</span>
                  <span className="text-sm font-mono font-medium">{athlete.fisCode}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">专项</span>
                  <span className="text-sm text-ski-blue font-medium">{specialtiesText}</span>
                </div>
              </div>

              {/* 积分和排名 */}
              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">最佳积分</span>
                  <span className="text-lg font-bold text-ski-blue">{bestPoints.toFixed(2)}</span>
                </div>
                <div className="grid grid-cols-3 gap-3 text-center text-xs">
                  <div>
                    <div className="text-gray-500">参赛次数</div>
                    <div className="font-semibold text-ski-navy">{athlete.totalRaces}</div>
                  </div>
                  <div>
                    <div className="text-gray-500">登台次数</div>
                    <div className="font-semibold text-yellow-600">{athlete.podiumFinishes}</div>
                  </div>
                  <div>
                    <div className="text-gray-500">最佳成绩</div>
                    <div className="font-semibold text-green-600">{athlete.bestResult}</div>
                  </div>
                </div>
              </div>

              {/* 俱乐部和教练信息 */}
              <div className="text-sm text-gray-600 mb-4">
                <div className="mb-1">
                  <span className="font-medium">俱乐部:</span> {athlete.club}
                </div>
                <div className="flex justify-between">
                  <span><span className="font-medium">教练:</span> {athlete.coach}</span>
                  <span>最近比赛: {athlete.lastCompetition}</span>
                </div>
              </div>

              {/* 操作按钮 */}
              <div className="flex space-x-2 pt-3 border-t border-gray-100">
                <button className="flex-1 flex items-center justify-center py-2 px-3 text-sm bg-ski-blue text-white rounded-md hover:bg-primary-700 transition-colors">
                  <Eye className="h-4 w-4 mr-1" />
                  查看详情
                </button>
                <button className="flex items-center justify-center py-2 px-3 text-sm border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                  <Edit className="h-4 w-4" />
                </button>
                <button className="flex items-center justify-center py-2 px-3 text-sm border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                  <Star className="h-4 w-4" />
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {/* 分页 */}
      <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200 relative z-10">
        <div className="text-sm text-gray-700">
          显示 <span className="font-medium">1</span> 到 <span className="font-medium">{filteredAthletes.length}</span> 条，共 <span className="font-medium">{filteredAthletes.length}</span> 条记录
        </div>
        <div className="flex space-x-2">
          <button className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed" disabled>
            上一页
          </button>
          <button className="px-3 py-1 text-sm bg-ski-blue text-white rounded-md">
            1
          </button>
          <button className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed" disabled>
            下一页
          </button>
        </div>
      </div>

      {/* 快速操作 */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
        <div className="card text-center hover:shadow-lg transition-shadow duration-200 cursor-pointer">
          <Plus className="h-12 w-12 text-ski-blue mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-ski-navy mb-2">添加运动员</h3>
          <p className="text-sm text-gray-600">注册新的运动员档案</p>
        </div>

        <div className="card text-center hover:shadow-lg transition-shadow duration-200 cursor-pointer">
          <TrendingUp className="h-12 w-12 text-green-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-ski-navy mb-2">积分分析</h3>
          <p className="text-sm text-gray-600">分析运动员积分趋势</p>
        </div>

        <div className="card text-center hover:shadow-lg transition-shadow duration-200 cursor-pointer">
          <Trophy className="h-12 w-12 text-yellow-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-ski-navy mb-2">成绩统计</h3>
          <p className="text-sm text-gray-600">查看综合成绩报告</p>
        </div>
      </div>
    </div>
  )
}