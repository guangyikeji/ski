'use client'

import { useState } from 'react'
import {
  User,
  Trophy,
  Calendar,
  Settings,
  LogOut,
  Download
} from 'lucide-react'

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('overview')

  // 模拟用户数据
  const userData = {
    name: '张伟',
    username: 'zhangwei_ski',
    email: 'zhangwei@example.com',
    phone: '138****8888',
    userType: 'athlete',
    currentPoints: {
      DH: 45.67,  // 滑降
      SL: 32.45,  // 回转
      GS: 38.90,  // 大回转
      SG: 52.30,  // 超级大回转
    },
    bestResults: [
      { event: '2024全国锦标赛', discipline: '大回转', rank: 3, points: 38.90, date: '2024-03-15' },
      { event: '2024冬季联赛第三站', discipline: '回转', rank: 5, points: 32.45, date: '2024-02-20' },
      { event: '2024青少年杯', discipline: '滑降', rank: 2, points: 45.67, date: '2024-01-25' }
    ]
  }

  const tabs = [
    { id: 'overview', name: '概览', icon: User },
    { id: 'points', name: '我的积分', icon: Trophy },
    { id: 'events', name: '赛事记录', icon: Calendar },
    { id: 'settings', name: '账户设置', icon: Settings }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">会员中心</h1>
          <p className="text-gray-600 mt-2">管理您的个人信息和积分记录</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* 左侧导航 */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-ski-blue rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto">
                  {userData.name[0]}
                </div>
                <h3 className="mt-3 text-lg font-semibold text-gray-900">{userData.name}</h3>
                <p className="text-sm text-gray-600">@{userData.username}</p>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mt-2">
                  运动员
                </span>
              </div>

              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                        activeTab === tab.id
                          ? 'bg-ski-blue text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="w-4 h-4 mr-3" />
                      {tab.name}
                    </button>
                  )
                })}
              </nav>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <button className="w-full flex items-center px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                  <LogOut className="w-4 h-4 mr-3" />
                  退出登录
                </button>
              </div>
            </div>
          </div>

          {/* 右侧内容区域 */}
          <div className="lg:col-span-3">
            {/* 概览 */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">积分概览</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { label: '滑降', value: userData.currentPoints.DH },
                      { label: '回转', value: userData.currentPoints.SL },
                      { label: '大回转', value: userData.currentPoints.GS },
                      { label: '超级大回转', value: userData.currentPoints.SG }
                    ].map((item, index) => (
                      <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-ski-navy">
                          {item.value.toFixed(2)}
                        </div>
                        <div className="text-sm text-gray-600 mt-1">{item.label}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">最佳成绩</h3>
                  <div className="space-y-3">
                    {userData.bestResults.map((result, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3 ${
                            result.rank === 1 ? 'bg-yellow-500' :
                            result.rank === 2 ? 'bg-gray-400' :
                            result.rank === 3 ? 'bg-orange-500' : 'bg-gray-300'
                          }`}>
                            {result.rank}
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">{result.event}</div>
                            <div className="text-sm text-gray-600">{result.discipline} · {result.date}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-ski-navy">{result.points}</div>
                          <div className="text-xs text-gray-500">中国积分</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 我的积分 */}
            {activeTab === 'points' && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">我的积分</h3>
                  <button className="flex items-center px-4 py-2 text-sm font-medium text-ski-blue border border-ski-blue rounded-lg hover:bg-ski-blue hover:text-white transition-colors">
                    <Download className="w-4 h-4 mr-2" />
                    导出积分证书
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">项目</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">当前积分</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">排名</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">最后更新</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {[
                        { name: '滑降(DH)', points: userData.currentPoints.DH, rank: 15, updated: '2024-03-20' },
                        { name: '回转(SL)', points: userData.currentPoints.SL, rank: 8, updated: '2024-03-18' },
                        { name: '大回转(GS)', points: userData.currentPoints.GS, rank: 12, updated: '2024-03-15' },
                        { name: '超级大回转(SG)', points: userData.currentPoints.SG, rank: 22, updated: '2024-03-10' }
                      ].map((item, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {item.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {item.points.toFixed(2)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            #{item.rank}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {item.updated}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* 其他标签页内容 */}
            {(activeTab === 'events' || activeTab === 'settings') && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  {activeTab === 'events' ? '赛事记录' : '账户设置'}
                </h3>
                <p className="text-gray-600">此功能正在开发中...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}