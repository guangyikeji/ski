import { Search, Filter, Download, TrendingUp, User, Globe, Calendar, BarChart3 } from 'lucide-react'
import { getImagePath } from '@/utils/paths'

// 模拟数据
const mockAthletes = [
  {
    id: 1,
    name: '张伟',
    country: 'CHN',
    fisCode: '125001',
    discipline: 'SL',
    points: 0.00,
    rank: 1,
    lastUpdate: '2024-12-15'
  },
  {
    id: 2,
    name: '李雪',
    country: 'CHN',
    fisCode: '125002',
    discipline: 'GS',
    points: 8.45,
    rank: 2,
    lastUpdate: '2024-12-15'
  },
  {
    id: 3,
    name: '王冰',
    country: 'CHN',
    fisCode: '125003',
    discipline: 'DH',
    points: 12.30,
    rank: 3,
    lastUpdate: '2024-12-15'
  },
  {
    id: 4,
    name: '刘强',
    country: 'CHN',
    fisCode: '125004',
    discipline: 'SL',
    points: 15.67,
    rank: 4,
    lastUpdate: '2024-12-14'
  },
  {
    id: 5,
    name: '陈美',
    country: 'CHN',
    fisCode: '125005',
    discipline: 'GS',
    points: 18.92,
    rank: 5,
    lastUpdate: '2024-12-14'
  },
  {
    id: 6,
    name: '赵峰',
    country: 'CHN',
    fisCode: '125006',
    discipline: 'SG',
    points: 21.45,
    rank: 6,
    lastUpdate: '2024-12-13'
  },
  {
    id: 7,
    name: '周雪莹',
    country: 'CHN',
    fisCode: '125007',
    discipline: 'DH',
    points: 24.78,
    rank: 7,
    lastUpdate: '2024-12-13'
  },
  {
    id: 8,
    name: '吴江',
    country: 'CHN',
    fisCode: '125008',
    discipline: 'AC',
    points: 27.35,
    rank: 8,
    lastUpdate: '2024-12-12'
  }
]

const disciplines = [
  { code: 'ALL', name: '全部项目' },
  { code: 'DH', name: '速降' },
  { code: 'SL', name: '回转' },
  { code: 'GS', name: '大回转' },
  { code: 'SG', name: '超级大回转' },
  { code: 'AC', name: '全能' }
]

export default function FISPointsPage() {
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
      <div className="absolute bottom-20 left-10 w-32 h-32 opacity-15 rounded-full overflow-hidden">
        <img
          src={getImagePath("/images/ski-bg.jpg")}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
      {/* Header */}
      <div className="mb-8 relative z-10">
        <h1 className="section-title">中国积分查询</h1>
        <p className="text-gray-600 text-lg">
          查询运动员的中国高山滑雪积分和排名信息，数据每21天更新一次
        </p>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8 relative z-10">
        <div className="card text-center">
          <User className="h-8 w-8 text-ski-blue mx-auto mb-2" />
          <div className="text-2xl font-bold text-ski-navy">1,247</div>
          <div className="text-sm text-gray-600">注册运动员</div>
        </div>
        <div className="card text-center">
          <Globe className="h-8 w-8 text-green-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-ski-navy">45</div>
          <div className="text-sm text-gray-600">参与国家</div>
        </div>
        <div className="card text-center">
          <Calendar className="h-8 w-8 text-purple-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-ski-navy">14天</div>
          <div className="text-sm text-gray-600">更新周期</div>
        </div>
        <div className="card text-center">
          <BarChart3 className="h-8 w-8 text-orange-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-ski-navy">5</div>
          <div className="text-sm text-gray-600">竞赛项目</div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="card mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="搜索运动员姓名或FIS代码"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ski-blue focus:border-transparent"
            />
          </div>

          {/* Discipline Filter */}
          <div className="relative">
            <select className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ski-blue focus:border-transparent appearance-none bg-white">
              {disciplines.map((discipline) => (
                <option key={discipline.code} value={discipline.code}>
                  {discipline.name}
                </option>
              ))}
            </select>
            <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 pointer-events-none" />
          </div>

          {/* Country Filter */}
          <div>
            <select className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ski-blue focus:border-transparent appearance-none bg-white">
              <option value="">选择国家</option>
              <option value="CHN">中国</option>
              <option value="AUT">奥地利</option>
              <option value="SUI">瑞士</option>
              <option value="ITA">意大利</option>
              <option value="FRA">法国</option>
            </select>
          </div>

          {/* Search Button */}
          <button className="btn-primary flex items-center justify-center">
            <Search className="h-4 w-4 mr-2" />
            搜索
          </button>
        </div>
      </div>

      {/* Results Table */}
      <div className="card">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-ski-navy">搜索结果</h2>
          <div className="flex space-x-3">
            <button className="btn-secondary text-sm">
              <Download className="h-4 w-4 mr-2" />
              导出
            </button>
            <button className="btn-secondary text-sm">
              <TrendingUp className="h-4 w-4 mr-2" />
              查看趋势
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">排名</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">运动员</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">国家</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">FIS代码</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">项目</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">积分</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">更新日期</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">操作</th>
              </tr>
            </thead>
            <tbody>
              {mockAthletes.map((athlete) => (
                <tr key={athlete.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <span className="inline-flex items-center justify-center w-8 h-8 bg-ski-blue text-white text-sm font-medium rounded-full">
                      {athlete.rank}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="font-medium text-gray-900">{athlete.name}</div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      {athlete.country}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-gray-600">{athlete.fisCode}</td>
                  <td className="py-4 px-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {athlete.discipline}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-lg font-semibold text-ski-navy">{athlete.points}</span>
                  </td>
                  <td className="py-4 px-4 text-gray-500 text-sm">{athlete.lastUpdate}</td>
                  <td className="py-4 px-4">
                    <button className="text-ski-blue hover:text-primary-700 text-sm font-medium">
                      查看详情
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-200">
          <div className="text-sm text-gray-700">
            显示 <span className="font-medium">1</span> 到 <span className="font-medium">8</span> 条，共 <span className="font-medium">8</span> 条记录
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
      </div>

      {/* Help Section */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold text-ski-navy mb-3">积分说明</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>• 中国积分越低表示运动员水平越高</li>
            <li>• 积分基于运动员最近两个赛季的最佳成绩计算</li>
            <li>• 数据每21天更新一次，采用中国积分体系标准</li>
            <li>• 不同项目的积分不能直接比较</li>
          </ul>
        </div>
        <div className="card">
          <h3 className="text-lg font-semibold text-ski-navy mb-3">项目代码</h3>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div><span className="font-medium">DH:</span> 速降</div>
            <div><span className="font-medium">SL:</span> 回转</div>
            <div><span className="font-medium">GS:</span> 大回转</div>
            <div><span className="font-medium">SG:</span> 超级大回转</div>
            <div><span className="font-medium">AC:</span> 全能</div>
          </div>
        </div>
      </div>
    </div>
  )
}