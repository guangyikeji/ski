'use client'

import React, { useState } from 'react'
import {
  Calculator,
  Clock,
  Trophy,
  Target,
  BarChart3,
  ArrowRight,
  CheckCircle,
  Play,
  RefreshCw,
  Download
} from 'lucide-react'

// 导入四大积分系统
import { fourSystemsManager, FourSystemsUtils } from '@/utils/fourSystemsManager'
import { EventLevel } from '@/utils/chinaSkiPointsCalculatorV4'
import { PointsCategory } from '@/data/multiSportData'

// 示例数据
const demoData = {
  alpine: {
    athleteId: 'zhang_wei',
    discipline: 'ALPINE_GS',
    competitionId: 'chn_2024_gs_001',
    competitionDate: '2024-12-15',
    athleteTime: 128.45,
    winnerTime: 125.20,
    eventLevel: EventLevel.A,
    rank: 5
  },
  snowboardAlpine: {
    athleteId: 'wang_lei',
    discipline: 'SNOWBOARD_PSL',
    competitionId: 'chn_2024_psl_001',
    competitionDate: '2024-12-15',
    athleteTime: 45.20,
    winnerTime: 43.80,
    eventLevel: EventLevel.B,
    rank: 3
  },
  snowboardRanking: {
    athleteId: 'wang_xiaoli',
    discipline: 'SNOWBOARD_BA',
    competitionId: 'chn_2024_ba_001',
    competitionDate: '2024-12-15',
    finalRank: 2,
    pointsCategory: PointsCategory.CATEGORY_1,
    scoreResult: 87.5
  },
  freestyleRanking: {
    athleteId: 'li_ming',
    discipline: 'FREESTYLE_SS',
    competitionId: 'chn_2024_ss_001',
    competitionDate: '2024-12-15',
    finalRank: 1,
    pointsCategory: PointsCategory.CATEGORY_1,
    scoreResult: 94.2
  }
}

export default function FourSystemsDemoPage() {
  const [results, setResults] = useState<any>(null)
  const [isCalculating, setIsCalculating] = useState(false)
  const [selectedSystem, setSelectedSystem] = useState<string | null>(null)

  const calculateAllSystems = async () => {
    setIsCalculating(true)

    // 模拟计算延迟
    await new Promise(resolve => setTimeout(resolve, 1000))

    try {
      const alpineResult = fourSystemsManager.calculatePoints(demoData.alpine)
      const snowboardAlpineResult = fourSystemsManager.calculatePoints(demoData.snowboardAlpine)
      const snowboardRankingResult = fourSystemsManager.calculatePoints(demoData.snowboardRanking)
      const freestyleRankingResult = fourSystemsManager.calculatePoints(demoData.freestyleRanking)

      setResults({
        alpine: alpineResult,
        snowboardAlpine: snowboardAlpineResult,
        snowboardRanking: snowboardRankingResult,
        freestyleRanking: freestyleRankingResult
      })
    } catch (error) {
      console.error('计算错误:', error)
    } finally {
      setIsCalculating(false)
    }
  }

  const systemConfigs = [
    {
      id: 'alpine',
      title: '高山滑雪积分系统',
      subtitle: 'Alpine Points System',
      description: '基于时间的v4.0积分计算，积分越低越好',
      icon: Clock,
      color: 'blue',
      inputData: demoData.alpine,
      pointsDirection: '积分越低越好',
      calculationBasis: '基于比赛时间'
    },
    {
      id: 'snowboardAlpine',
      title: '单板平行项目积分系统',
      subtitle: 'Snowboard Alpine Points',
      description: '类似高山滑雪逻辑，积分越低越好',
      icon: Target,
      color: 'cyan',
      inputData: demoData.snowboardAlpine,
      pointsDirection: '积分越低越好',
      calculationBasis: '基于比赛时间'
    },
    {
      id: 'snowboardRanking',
      title: '单板技巧积分系统',
      subtitle: 'Snowboard Ranking Points',
      description: '基于排名的240/360/120分档积分体系',
      icon: Trophy,
      color: 'green',
      inputData: demoData.snowboardRanking,
      pointsDirection: '积分越高越好',
      calculationBasis: '基于最终排名'
    },
    {
      id: 'freestyleRanking',
      title: '自由式滑雪积分系统',
      subtitle: 'Freestyle Ranking Points',
      description: '基于排名的240/360/120分档积分体系',
      icon: BarChart3,
      color: 'purple',
      inputData: demoData.freestyleRanking,
      pointsDirection: '积分越高越好',
      calculationBasis: '基于最终排名'
    }
  ]

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'border-blue-500 bg-blue-50 text-blue-700',
      cyan: 'border-cyan-500 bg-cyan-50 text-cyan-700',
      green: 'border-green-500 bg-green-50 text-green-700',
      purple: 'border-purple-500 bg-purple-50 text-purple-700'
    }
    return colors[color as keyof typeof colors] || colors.blue
  }

  const formatInputData = (data: any, systemId: string) => {
    if (systemId === 'alpine' || systemId === 'snowboardAlpine') {
      return {
        '运动员时间': `${data.athleteTime}秒`,
        '冠军时间': `${data.winnerTime}秒`,
        '赛事级别': `${data.eventLevel}级`,
        '运动员排名': `第${data.rank}名`
      }
    } else {
      return {
        '最终排名': `第${data.finalRank}名`,
        '积分档次': data.pointsCategory === 'CATEGORY_1' ? '一类赛事(360分档)' :
                   data.pointsCategory === 'CATEGORY_2' ? '二类赛事(240分档)' : '三类赛事(120分档)',
        '评分成绩': data.scoreResult ? `${data.scoreResult}分` : '--'
      }
    }
  }

  const exportResults = () => {
    if (!results) return

    const exportData = {
      计算时间: new Date().toLocaleString('zh-CN'),
      四大积分系统结果: {
        高山滑雪积分系统: {
          运动员ID: results.alpine.athleteId,
          项目: results.alpine.discipline,
          积分: results.alpine.points.earnedPoints,
          积分方向: '积分越低越好'
        },
        单板平行项目积分系统: {
          运动员ID: results.snowboardAlpine.athleteId,
          项目: results.snowboardAlpine.discipline,
          积分: results.snowboardAlpine.points.earnedPoints,
          积分方向: '积分越低越好'
        },
        单板技巧积分系统: {
          运动员ID: results.snowboardRanking.athleteId,
          项目: results.snowboardRanking.discipline,
          积分: results.snowboardRanking.points.earnedPoints,
          积分方向: '积分越高越好'
        },
        自由式滑雪积分系统: {
          运动员ID: results.freestyleRanking.athleteId,
          项目: results.freestyleRanking.discipline,
          积分: results.freestyleRanking.points.earnedPoints,
          积分方向: '积分越高越好'
        }
      }
    }

    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: 'application/json;charset=utf-8'
    })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `四大积分系统计算结果_${new Date().toISOString().split('T')[0]}.json`
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-ski-blue to-blue-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              四大积分系统演示
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8">
              Four Scoring Systems Interactive Demo
            </p>
            <p className="text-lg text-blue-200 max-w-3xl mx-auto">
              实时演示中国滑雪赛事四大积分系统的计算过程，包括高山滑雪、单板平行项目、单板技巧、自由式滑雪的完整积分计算流程
            </p>
          </div>
        </div>
      </section>

      {/* Demo Controls */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={calculateAllSystems}
                disabled={isCalculating}
                className="inline-flex items-center px-6 py-3 bg-ski-blue text-white rounded-lg hover:bg-ski-blue/90 transition-colors font-semibold disabled:opacity-50"
              >
                {isCalculating ? (
                  <>
                    <RefreshCw className="h-5 w-5 mr-2 animate-spin" />
                    计算中...
                  </>
                ) : (
                  <>
                    <Play className="h-5 w-5 mr-2" />
                    开始演示计算
                  </>
                )}
              </button>

              {results && (
                <button
                  onClick={exportResults}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Download className="h-4 w-4 mr-2" />
                  导出结果
                </button>
              )}
            </div>

            {results && (
              <div className="flex items-center text-green-600">
                <CheckCircle className="h-5 w-5 mr-2" />
                <span className="font-medium">四大积分系统计算完成</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Systems Demo */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {systemConfigs.map((system) => {
              const IconComponent = system.icon
              const result = results?.[system.id]

              return (
                <div
                  key={system.id}
                  className={`bg-white rounded-lg shadow-lg overflow-hidden border-2 transition-all duration-200 ${
                    selectedSystem === system.id
                      ? getColorClasses(system.color)
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {/* System Header */}
                  <div className="p-6 border-b border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className={`p-3 rounded-full ${
                          selectedSystem === system.id
                            ? `bg-${system.color}-100`
                            : 'bg-gray-100'
                        }`}>
                          <IconComponent className={`h-6 w-6 ${
                            selectedSystem === system.id
                              ? `text-${system.color}-600`
                              : 'text-gray-600'
                          }`} />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {system.title}
                          </h3>
                          <p className="text-sm text-gray-600">{system.subtitle}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => setSelectedSystem(
                          selectedSystem === system.id ? null : system.id
                        )}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <ArrowRight className={`h-5 w-5 transition-transform ${
                          selectedSystem === system.id ? 'rotate-90' : ''
                        }`} />
                      </button>
                    </div>
                    <p className="text-gray-600 text-sm">{system.description}</p>
                  </div>

                  {/* Input Data */}
                  <div className="p-6 bg-gray-50">
                    <h4 className="font-medium text-gray-900 mb-3">输入数据</h4>
                    <div className="space-y-2">
                      {Object.entries(formatInputData(system.inputData, system.id)).map(([key, value]) => (
                        <div key={key} className="flex justify-between text-sm">
                          <span className="text-gray-600">{key}:</span>
                          <span className="font-medium text-gray-900">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Calculation Result */}
                  <div className="p-6">
                    {result ? (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-gray-900">计算结果</h4>
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        </div>

                        <div className="bg-gray-50 rounded-lg p-4">
                          <div className="text-center">
                            <div className={`text-3xl font-bold mb-2 ${
                              system.pointsDirection.includes('低') ? 'text-red-600' : 'text-green-600'
                            }`}>
                              {result.points.earnedPoints}
                            </div>
                            <div className="text-sm text-gray-600">积分</div>
                            <div className={`text-xs mt-1 px-2 py-1 rounded-full inline-block ${
                              system.pointsDirection.includes('低')
                                ? 'bg-red-100 text-red-700'
                                : 'bg-green-100 text-green-700'
                            }`}>
                              {system.pointsDirection}
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">计算基础:</span>
                            <span className="text-gray-900">{system.calculationBasis}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">运动员ID:</span>
                            <span className="text-gray-900">{result.athleteId}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">项目:</span>
                            <span className="text-gray-900">{result.discipline}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">计算时间:</span>
                            <span className="text-gray-900">
                              {new Date(result.calculatedAt).toLocaleString('zh-CN')}
                            </span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        <Calculator className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                        <p>点击"开始演示计算"查看结果</p>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Summary Section */}
      {results && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-ski-navy mb-4">计算结果汇总</h2>
              <p className="text-gray-600 text-lg">四大积分系统完整计算结果对比</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    title: '高山滑雪',
                    points: results.alpine.points.earnedPoints,
                    direction: '低分制',
                    color: 'blue',
                    athlete: results.alpine.athleteId
                  },
                  {
                    title: '单板平行项目',
                    points: results.snowboardAlpine.points.earnedPoints,
                    direction: '低分制',
                    color: 'cyan',
                    athlete: results.snowboardAlpine.athleteId
                  },
                  {
                    title: '单板技巧',
                    points: results.snowboardRanking.points.earnedPoints,
                    direction: '高分制',
                    color: 'green',
                    athlete: results.snowboardRanking.athleteId
                  },
                  {
                    title: '自由式滑雪',
                    points: results.freestyleRanking.points.earnedPoints,
                    direction: '高分制',
                    color: 'purple',
                    athlete: results.freestyleRanking.athleteId
                  }
                ].map((item, index) => (
                  <div key={index} className="bg-white rounded-lg p-6 text-center border border-gray-200">
                    <h3 className="font-medium text-gray-900 mb-2">{item.title}</h3>
                    <div className={`text-2xl font-bold mb-2 ${
                      item.direction === '低分制' ? 'text-red-600' : 'text-green-600'
                    }`}>
                      {item.points}
                    </div>
                    <div className="text-sm text-gray-600 mb-2">{item.direction}</div>
                    <div className="text-xs text-gray-500">{item.athlete}</div>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-lg">
                <h3 className="font-semibold text-blue-900 mb-3">系统特点总结</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800">
                  <div>
                    <strong>时间制系统 (低分制):</strong>
                    <ul className="list-disc list-inside mt-1 space-y-1">
                      <li>高山滑雪、单板平行项目</li>
                      <li>基于比赛时间计算积分</li>
                      <li>积分越低成绩越好</li>
                    </ul>
                  </div>
                  <div>
                    <strong>排名制系统 (高分制):</strong>
                    <ul className="list-disc list-inside mt-1 space-y-1">
                      <li>单板技巧、自由式滑雪</li>
                      <li>基于最终排名分配积分</li>
                      <li>积分越高成绩越好</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}