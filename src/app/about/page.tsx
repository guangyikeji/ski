import { Target, Users, Trophy, BarChart3 } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* 标题区域 */}
      <div className="bg-gradient-to-r from-ski-blue to-blue-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">关于我们</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            中国滑雪赛事积分系统是专业的滑雪运动积分管理平台，致力于推动中国滑雪运动的标准化和专业化发展
          </p>
        </div>
      </div>

      {/* 平台介绍 */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">平台简介</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  中国滑雪赛事积分系统是基于《中国高山滑雪赛事积分规则v4.0》和《2025-2026赛季全国BA、SS青少年U系列比赛方案》建立的综合性滑雪运动管理平台。
                </p>
                <p>
                  平台支持<strong>高山滑雪、自由式滑雪、单板滑雪</strong>三大项目，涵盖速降、回转、大回转、超级大回转、全能、大跳台、坡面障碍技巧、U型场地等多个细分项目的积分计算和赛事管理。
                </p>
                <p>
                  我们致力于为中国滑雪运动提供专业、准确、高效的数字化管理服务，推动中国滑雪运动的规范化发展。
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center p-6 bg-blue-50 rounded-lg">
                <div className="text-3xl font-bold text-ski-blue mb-2">4</div>
                <div className="text-gray-600">积分系统</div>
              </div>
              <div className="text-center p-6 bg-green-50 rounded-lg">
                <div className="text-3xl font-bold text-green-600 mb-2">1000+</div>
                <div className="text-gray-600">注册运动员</div>
              </div>
              <div className="text-center p-6 bg-purple-50 rounded-lg">
                <div className="text-3xl font-bold text-purple-600 mb-2">50+</div>
                <div className="text-gray-600">年度赛事</div>
              </div>
              <div className="text-center p-6 bg-red-50 rounded-lg">
                <div className="text-3xl font-bold text-red-600 mb-2">24/7</div>
                <div className="text-gray-600">在线服务</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 核心功能 */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">核心功能</h2>
            <p className="text-xl text-gray-600">
              专业、全面、易用的滑雪赛事管理解决方案
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="h-8 w-8 text-ski-blue" />
              </div>
              <h3 className="text-lg font-semibold mb-3">积分计算系统</h3>
              <p className="text-gray-600">
                基于官方规则的精确积分计算，支持双积分体系
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold mb-3">赛事管理</h3>
              <p className="text-gray-600">
                从报名到成绩发布的全流程数字化管理
              </p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold mb-3">运动员管理</h3>
              <p className="text-gray-600">
                运动员注册、资格审查、积分记录管理
              </p>
            </div>

            <div className="text-center">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold mb-3">数据分析</h3>
              <p className="text-gray-600">
                专业的数据统计分析和可视化报告
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 技术特色 */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">技术特色</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
              <h3 className="text-xl font-semibold mb-4">双积分计算引擎</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• 高山滑雪：基于时间的v4.0积分计算</li>
                <li>• 自由式/单板：基于排名的240/360/120分档</li>
                <li>• 动态判罚分计算</li>
                <li>• 多项目积分管理</li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
              <h3 className="text-xl font-semibold mb-4">规则体系支持</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• 中国高山滑雪积分规则v4.0</li>
                <li>• 全国BA、SS青少年U系列方案</li>
                <li>• FIS国际雪联规则兼容</li>
                <li>• 场地技术标准管理</li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
              <h3 className="text-xl font-semibold mb-4">用户体验</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• 响应式设计，多端适配</li>
                <li>• 实时数据更新</li>
                <li>• 直观的数据可视化</li>
                <li>• 便捷的操作流程</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 联系我们 */}
      <section className="py-20 bg-ski-blue text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">联系我们</h2>
          <p className="text-xl text-blue-100 mb-8">
            如有任何问题或建议，欢迎联系我们
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            <div>
              <h3 className="text-lg font-semibold mb-3">技术支持</h3>
              <p className="text-blue-100">
                邮箱：support@ski-points.com<br/>
                电话：400-123-4567
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3">合作咨询</h3>
              <p className="text-blue-100">
                邮箱：business@ski-points.com<br/>
                微信：ski-points-service
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}