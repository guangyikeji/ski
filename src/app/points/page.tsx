import Link from 'next/link'
import { Calculator, BarChart3, Trophy, TrendingUp } from 'lucide-react'

export default function PointsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">积分系统</h1>
          <p className="text-xl text-gray-600">
            中国滑雪赛事积分查询与管理平台
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link href="/scoring-systems" className="group">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200">
              <div className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
                  <Trophy className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">四大积分系统</h3>
                <p className="text-gray-600 text-sm">
                  高山滑雪、自由式滑雪、单板滑雪积分体系
                </p>
              </div>
            </div>
          </Link>

          <Link href="/points/calculator" className="group">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200">
              <div className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors">
                  <Calculator className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">积分计算器</h3>
                <p className="text-gray-600 text-sm">
                  在线计算中国滑雪积分
                </p>
              </div>
            </div>
          </Link>

          <Link href="/points/rankings" className="group">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200">
              <div className="text-center">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-200 transition-colors">
                  <BarChart3 className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">积分排行榜</h3>
                <p className="text-gray-600 text-sm">
                  运动员积分排名统计
                </p>
              </div>
            </div>
          </Link>

          <Link href="/points/trends" className="group">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200">
              <div className="text-center">
                <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-red-200 transition-colors">
                  <TrendingUp className="h-8 w-8 text-red-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">积分趋势</h3>
                <p className="text-gray-600 text-sm">
                  积分变化趋势分析
                </p>
              </div>
            </div>
          </Link>
        </div>

        {/* 功能说明 */}
        <div className="mt-16 bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">积分系统功能</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-3">积分计算</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• 基于中国滑雪积分规则v4.0</li>
                <li>• 支持高山滑雪时间积分计算</li>
                <li>• 支持自由式/单板排名积分</li>
                <li>• 自动判罚分计算</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3">数据管理</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• 个人积分记录查询</li>
                <li>• 积分历史趋势分析</li>
                <li>• 全国排名统计</li>
                <li>• 项目分类积分管理</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}