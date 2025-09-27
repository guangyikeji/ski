import Link from 'next/link'
import { Calendar, Trophy, Users, TrendingUp, BarChart3, FileText, UserCheck, Medal, Award, Target } from 'lucide-react'
import { getImagePath } from '@/utils/paths'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* 英雄区域 */}
      <section className="relative bg-gradient-to-r from-ski-blue to-blue-700 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('${getImagePath('/images/ski-bg.jpg')}')`
            }}
          ></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              中国滑雪赛事积分系统
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              统一管理高山滑雪、自由式滑雪、单板滑雪积分与赛事
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Link
                href="/register"
                className="bg-white text-ski-blue px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-colors"
              >
                立即注册
              </Link>
              <Link
                href="/about"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-ski-blue transition-colors"
              >
                了解更多
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 平台核心功能 */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">平台核心功能</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              涵盖中国滑雪运动全产业链的专业积分管理平台，支持高山滑雪、自由式滑雪、单板滑雪三大项目
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="h-8 w-8 text-ski-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-3">积分计算</h3>
              <p className="text-gray-600">
                基于中国滑雪积分规则v4.0，支持高山滑雪时间积分和自由式/单板排名积分
              </p>
            </div>

            <div className="text-center p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">赛事管理</h3>
              <p className="text-gray-600">
                全国性赛事数据导入、成绩统计、排名管理和证书颁发
              </p>
            </div>

            <div className="text-center p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <UserCheck className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">在线报名</h3>
              <p className="text-gray-600">
                运动员资格审查、在线报名、费用管理和参赛名单生成
              </p>
            </div>

            <div className="text-center p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">数据分析</h3>
              <p className="text-gray-600">
                积分趋势分析、运动员表现统计和赛事数据可视化
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 四大积分系统 */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">四大积分系统</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              覆盖中国滑雪运动所有项目的专业积分体系，基于官方规则v4.0版本
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Link href="/scoring-systems/alpine" className="block">
              <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-200">
                <div className="flex items-center mb-6">
                  <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mr-4">
                    <Medal className="h-6 w-6 text-ski-blue" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">高山滑雪积分系统</h3>
                    <p className="text-gray-600">Alpine Skiing Points</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center text-gray-700">
                    <Target className="h-4 w-4 mr-2 text-blue-500" />
                    <span>基于时间的v4.0积分计算公式</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Target className="h-4 w-4 mr-2 text-blue-500" />
                    <span>A级(1.0)、B级(0.6)、C级(0.3)系数体系</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Target className="h-4 w-4 mr-2 text-blue-500" />
                    <span>速降、回转、大回转、超大回转、全能</span>
                  </div>
                </div>
              </div>
            </Link>

            <Link href="/scoring-systems/freestyle" className="block">
              <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-200">
                <div className="flex items-center mb-6">
                  <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mr-4">
                    <Award className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">自由式滑雪积分系统</h3>
                    <p className="text-gray-600">Freestyle Skiing Points</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center text-gray-700">
                    <Target className="h-4 w-4 mr-2 text-green-500" />
                    <span>基于排名的240/360/120分档积分</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Target className="h-4 w-4 mr-2 text-green-500" />
                    <span>大跳台(BA)、坡面障碍技巧(SS)</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Target className="h-4 w-4 mr-2 text-green-500" />
                    <span>U型场地(HP)技巧项目</span>
                  </div>
                </div>
              </div>
            </Link>

            <Link href="/scoring-systems/snowboard-trick" className="block">
              <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-200">
                <div className="flex items-center mb-6">
                  <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mr-4">
                    <Trophy className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">单板技巧积分系统</h3>
                    <p className="text-gray-600">Snowboard Trick Points</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center text-gray-700">
                    <Target className="h-4 w-4 mr-2 text-purple-500" />
                    <span>技巧项目排名积分体系</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Target className="h-4 w-4 mr-2 text-purple-500" />
                    <span>大跳台、坡面障碍技巧、U型场地</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Target className="h-4 w-4 mr-2 text-purple-500" />
                    <span>裁判评分转积分机制</span>
                  </div>
                </div>
              </div>
            </Link>

            <Link href="/scoring-systems/snowboard-alpine" className="block">
              <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-200">
                <div className="flex items-center mb-6">
                  <div className="bg-red-100 w-12 h-12 rounded-lg flex items-center justify-center mr-4">
                    <Medal className="h-6 w-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">单板平行项目积分</h3>
                    <p className="text-gray-600">Snowboard Parallel Points</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center text-gray-700">
                    <Target className="h-4 w-4 mr-2 text-red-500" />
                    <span>平行大回转(PGS)、平行回转(PSL)</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Target className="h-4 w-4 mr-2 text-red-500" />
                    <span>基于高山滑雪规则的时间积分</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Target className="h-4 w-4 mr-2 text-red-500" />
                    <span>双人淘汰赛制积分计算</span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* 快速导航 */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">快速导航</h2>
            <p className="text-xl text-gray-600">
              一站式滑雪赛事管理，让专业变得简单
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link href="/competitions" className="group">
              <div className="text-center p-8 rounded-xl border-2 border-gray-200 hover:border-ski-blue transition-colors">
                <Calendar className="h-12 w-12 text-ski-blue mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-semibold mb-3">赛事管理</h3>
                <p className="text-gray-600">
                  查看赛事日程、参与报名、获取最新赛事资讯
                </p>
              </div>
            </Link>

            <Link href="/points" className="group">
              <div className="text-center p-8 rounded-xl border-2 border-gray-200 hover:border-ski-blue transition-colors">
                <BarChart3 className="h-12 w-12 text-ski-blue mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-semibold mb-3">积分查询</h3>
                <p className="text-gray-600">
                  查询个人积分记录、排名变化和积分趋势分析
                </p>
              </div>
            </Link>

            <Link href="/rules" className="group">
              <div className="text-center p-8 rounded-xl border-2 border-gray-200 hover:border-ski-blue transition-colors">
                <FileText className="h-12 w-12 text-ski-blue mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-semibold mb-3">规则文档</h3>
                <p className="text-gray-600">
                  中国滑雪积分规则、竞赛规则和技术标准
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* 数据统计 */}
      <section className="py-20 bg-ski-blue text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">平台数据</h2>
            <p className="text-xl text-blue-100">
              服务全国滑雪运动，构建专业积分体系
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">3+</div>
              <div className="text-blue-100">滑雪项目</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">1000+</div>
              <div className="text-blue-100">注册运动员</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-blue-100">年度赛事</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">4</div>
              <div className="text-blue-100">积分系统</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA区域 */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-ski-blue text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-6">
            加入中国滑雪赛事积分系统
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            立即注册，获取专属积分记录，参与全国滑雪赛事
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link
              href="/register"
              className="bg-white text-ski-blue px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-colors"
            >
              立即注册
            </Link>
            <Link
              href="/login"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-ski-blue transition-colors"
            >
              会员登录
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}