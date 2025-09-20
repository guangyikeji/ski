'use client'

import { useState } from 'react'
import { getImagePath } from '@/utils/paths'
import {
  Calendar,
  MapPin,
  Clock,
  Users,
  Filter,
  Plus,
  Download,
  Eye,
  Edit,
  Flag,
  Snowflake,
  Star,
  Trophy
} from 'lucide-react'

// 模拟赛事日程数据
const mockSchedule = [
  {
    id: 1,
    name: '2024全国高山滑雪锦标赛',
    startDate: '2024-12-20',
    endDate: '2024-12-22',
    location: '长白山万达滑雪场',
    city: '吉林',
    disciplines: ['GS', 'SL'],
    level: 'national',
    status: 'upcoming',
    registrationDeadline: '2024-12-18',
    participants: 128,
    maxParticipants: 150,
    organizer: '中国滑雪协会',
    weather: 'snow',
    temperature: '-8°C',
    sessions: [
      { date: '2024-12-20', time: '09:00', event: '男子大回转第一轮', venue: '1号赛道' },
      { date: '2024-12-20', time: '13:30', event: '女子大回转第一轮', venue: '1号赛道' },
      { date: '2024-12-21', time: '09:00', event: '男子回转', venue: '2号赛道' },
      { date: '2024-12-21', time: '13:30', event: '女子回转', venue: '2号赛道' },
      { date: '2024-12-22', time: '10:00', event: '混合团体赛', venue: '1号赛道' }
    ]
  },
  {
    id: 2,
    name: '北京市青少年滑雪公开赛',
    startDate: '2024-12-25',
    endDate: '2024-12-26',
    location: '北京南山滑雪场',
    city: '北京',
    disciplines: ['SL', 'GS'],
    level: 'youth',
    status: 'registration',
    registrationDeadline: '2024-12-23',
    participants: 84,
    maxParticipants: 120,
    organizer: '北京市滑雪协会',
    weather: 'clear',
    temperature: '-5°C',
    sessions: [
      { date: '2024-12-25', time: '09:30', event: '青年组回转', venue: 'A赛道' },
      { date: '2024-12-25', time: '14:00', event: '少年组回转', venue: 'B赛道' },
      { date: '2024-12-26', time: '09:30', event: '青年组大回转', venue: 'A赛道' },
      { date: '2024-12-26', time: '14:00', event: '少年组大回转', venue: 'B赛道' }
    ]
  },
  {
    id: 3,
    name: '张家口冬奥场地测试赛',
    startDate: '2025-01-08',
    endDate: '2025-01-10',
    location: '崇礼云顶滑雪场',
    city: '张家口',
    disciplines: ['DH', 'SG', 'GS', 'SL'],
    level: 'international',
    status: 'upcoming',
    registrationDeadline: '2025-01-05',
    participants: 45,
    maxParticipants: 80,
    organizer: '国际雪联中国分会',
    weather: 'snow',
    temperature: '-12°C',
    sessions: [
      { date: '2025-01-08', time: '08:30', event: '男子速降训练', venue: '冬奥速降赛道' },
      { date: '2025-01-08', time: '14:00', event: '女子速降训练', venue: '冬奥速降赛道' },
      { date: '2025-01-09', time: '09:00', event: '男子超级大回转', venue: '冬奥大回转赛道' },
      { date: '2025-01-09', time: '13:30', event: '女子超级大回转', venue: '冬奥大回转赛道' },
      { date: '2025-01-10', time: '10:00', event: '团体混合赛', venue: '冬奥回转赛道' }
    ]
  },
  {
    id: 4,
    name: '东北三省联合训练营',
    startDate: '2025-01-15',
    endDate: '2025-01-18',
    location: '亚布力滑雪场',
    city: '哈尔滨',
    disciplines: ['GS', 'SL'],
    level: 'training',
    status: 'upcoming',
    registrationDeadline: '2025-01-12',
    participants: 156,
    maxParticipants: 200,
    organizer: '东北三省滑雪联盟',
    weather: 'snow',
    temperature: '-15°C',
    sessions: [
      { date: '2025-01-15', time: '09:00', event: '技术训练', venue: '训练赛道1' },
      { date: '2025-01-16', time: '09:00', event: '模拟比赛', venue: '比赛赛道' },
      { date: '2025-01-17', time: '09:00', event: '体能测试', venue: '训练中心' },
      { date: '2025-01-18', time: '10:00', event: '结业考核', venue: '比赛赛道' }
    ]
  }
]

const statusConfig = {
  upcoming: { label: '即将开始', color: 'bg-blue-100 text-blue-800' },
  registration: { label: '报名中', color: 'bg-yellow-100 text-yellow-800' },
  ongoing: { label: '进行中', color: 'bg-green-100 text-green-800' },
  completed: { label: '已结束', color: 'bg-gray-100 text-gray-800' },
  training: { label: '训练营', color: 'bg-purple-100 text-purple-800' }
}

const levelConfig = {
  national: { label: '全国级', color: 'text-red-600', icon: Flag },
  international: { label: '国际级', color: 'text-purple-800', icon: Trophy },
  youth: { label: '青年组', color: 'text-green-600', icon: Users },
  training: { label: '训练营', color: 'text-blue-600', icon: Star }
}

const weatherConfig = {
  snow: { icon: Snowflake, color: 'text-blue-500', label: '雪' },
  clear: { icon: Star, color: 'text-yellow-500', label: '晴' },
  cloudy: { icon: MapPin, color: 'text-gray-500', label: '阴' }
}

export default function SchedulePage() {
  const [selectedMonth, setSelectedMonth] = useState('12')
  const [selectedLevel, setSelectedLevel] = useState('all')
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list')

  const filteredSchedule = mockSchedule.filter(event => {
    const eventMonth = new Date(event.startDate).getMonth() + 1
    const matchMonth = selectedMonth === 'all' || eventMonth.toString() === selectedMonth
    const matchLevel = selectedLevel === 'all' || event.level === selectedLevel
    return matchMonth && matchLevel
  })

  const handleCreateEvent = () => {
    alert('创建新赛事功能\n\n功能包括：\n- 赛事基本信息设置\n- 比赛日程安排\n- 参赛条件设定\n- 场地分配\n- 报名管理\n\n即将上线，敬请期待！')
  }

  const handleExportSchedule = () => {
    alert('导出赛事日程功能\n\n将导出：\n- 完整赛事日程表\n- 详细比赛安排\n- 参赛信息统计\n\n格式：PDF / Excel / iCal')
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
      {/* 背景装饰 */}
      <div className="absolute top-0 right-0 w-40 h-40 opacity-15 rounded-full overflow-hidden">
        <img
          src={getImagePath("/images/ski-bg.jpg")}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      {/* Header */}
      <div className="mb-8 relative z-10">
        <h1 className="section-title">赛事日程</h1>
        <p className="text-gray-600 text-lg">
          查看完整的滑雪赛事日程安排，包括比赛、训练和活动信息
        </p>
      </div>

      {/* 操作栏 */}
      <div className="card mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div>
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="py-2 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ski-blue focus:border-transparent"
              >
                <option value="all">全部月份</option>
                <option value="12">12月</option>
                <option value="1">1月</option>
                <option value="2">2月</option>
                <option value="3">3月</option>
              </select>
            </div>
            <div>
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="py-2 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ski-blue focus:border-transparent"
              >
                <option value="all">全部级别</option>
                <option value="international">国际级</option>
                <option value="national">全国级</option>
                <option value="youth">青年组</option>
                <option value="training">训练营</option>
              </select>
            </div>
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('list')}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'list'
                    ? 'bg-white text-ski-blue shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                列表视图
              </button>
              <button
                onClick={() => setViewMode('calendar')}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'calendar'
                    ? 'bg-white text-ski-blue shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                日历视图
              </button>
            </div>
          </div>
          <div className="flex gap-3">
            <button onClick={handleCreateEvent} className="btn-primary flex items-center">
              <Plus className="h-4 w-4 mr-2" />
              创建赛事
            </button>
            <button onClick={handleExportSchedule} className="btn-secondary flex items-center">
              <Download className="h-4 w-4 mr-2" />
              导出日程
            </button>
          </div>
        </div>
      </div>

      {/* 赛事列表 */}
      {viewMode === 'list' && (
        <div className="space-y-6">
          {filteredSchedule.map((event) => {
            const LevelIcon = levelConfig[event.level as keyof typeof levelConfig].icon
            const WeatherIcon = weatherConfig[event.weather as keyof typeof weatherConfig].icon

            return (
              <div key={event.id} className="card">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold text-gray-900">{event.name}</h3>
                      <span className={`badge ${statusConfig[event.status as keyof typeof statusConfig].color} text-xs`}>
                        {statusConfig[event.status as keyof typeof statusConfig].label}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {event.startDate} - {event.endDate}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {event.location}, {event.city}
                      </div>
                      <div className="flex items-center">
                        <LevelIcon className={`h-4 w-4 mr-1 ${levelConfig[event.level as keyof typeof levelConfig].color}`} />
                        {levelConfig[event.level as keyof typeof levelConfig].label}
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        {event.participants}/{event.maxParticipants}
                      </div>
                      <div className="flex items-center">
                        <WeatherIcon className={`h-4 w-4 mr-1 ${weatherConfig[event.weather as keyof typeof weatherConfig].color}`} />
                        {event.temperature}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4 lg:mt-0">
                    <button className="btn-secondary text-sm flex items-center">
                      <Eye className="h-4 w-4 mr-1" />
                      查看详情
                    </button>
                    <button className="btn-secondary text-sm flex items-center">
                      <Edit className="h-4 w-4 mr-1" />
                      编辑
                    </button>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <h4 className="font-medium text-gray-900 mb-3">比赛安排</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {event.sessions.map((session, index) => (
                      <div key={index} className="bg-gray-50 rounded-lg p-3">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-gray-900">{session.event}</span>
                          <Clock className="h-4 w-4 text-gray-400" />
                        </div>
                        <div className="text-xs text-gray-600">
                          {session.date} {session.time}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">{session.venue}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4 mt-4">
                  <div className="flex items-center justify-between text-sm">
                    <div className="text-gray-600">
                      主办方：{event.organizer}
                    </div>
                    <div className="text-gray-600">
                      报名截止：{event.registrationDeadline}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* 日历视图 */}
      {viewMode === 'calendar' && (
        <div className="card">
          <div className="bg-gray-50 rounded-lg p-8 text-center">
            <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h4 className="text-lg font-medium text-gray-700 mb-2">日历视图</h4>
            <p className="text-gray-600">
              以日历形式展示赛事安排，支持月视图和周视图切换，
              点击日期可查看当日的详细赛程安排
            </p>
          </div>
        </div>
      )}

      {/* 底部说明 */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold text-ski-navy mb-3">赛事说明</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>• 所有时间均为比赛当地时间</li>
            <li>• 天气情况可能影响比赛安排</li>
            <li>• 请关注官方通知获取最新信息</li>
            <li>• 报名截止日期后不接受新报名</li>
          </ul>
        </div>
        <div className="card">
          <h3 className="text-lg font-semibold text-ski-navy mb-3">联系方式</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>• 赛事咨询：400-8888-8888</li>
            <li>• 技术支持：tech@alpineskichina.com</li>
            <li>• 紧急联络：emergency@alpineskichina.com</li>
            <li>• 工作时间：周一至周五 9:00-18:00</li>
          </ul>
        </div>
      </div>
    </div>
  )
}