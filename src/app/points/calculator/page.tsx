'use client'

import { useState } from 'react'
import { getImagePath } from '@/utils/paths'
import { Calculator, Info, RotateCcw, TrendingUp } from 'lucide-react'
import { chinaPointsCalculator, CHINA_DISCIPLINE_FACTORS, DisciplineCode } from '@/utils/chinaPointsCalculator'

const disciplineFactors = {
  DH: { name: '速降', factor: CHINA_DISCIPLINE_FACTORS.DH, description: '高速度项目，技术要求高' },
  SL: { name: '回转', factor: CHINA_DISCIPLINE_FACTORS.SL, description: '技术性强，转弯密集' },
  GS: { name: '大回转', factor: CHINA_DISCIPLINE_FACTORS.GS, description: '速度与技术的平衡' },
  SG: { name: '超级大回转', factor: CHINA_DISCIPLINE_FACTORS.SG, description: '高速技术项目' },
  AC: { name: '全能', factor: CHINA_DISCIPLINE_FACTORS.AC, description: '综合项目积分' }
}

export default function CalculatorPage() {
  const [discipline, setDiscipline] = useState('GS')
  const [winnerTime, setWinnerTime] = useState('')
  const [competitorTime, setCompetitorTime] = useState('')
  const [penalty, setPenalty] = useState('')
  const [result, setResult] = useState<number | null>(null)
  const [racePoints, setRacePoints] = useState<number | null>(null)

  const calculatePoints = () => {
    const winner = parseFloat(winnerTime)
    const competitor = parseFloat(competitorTime)
    const penaltyValue = parseFloat(penalty) || 0

    if (!winner || !competitor || winner <= 0 || competitor <= 0) {
      alert('请输入有效的时间数据')
      return
    }

    if (competitor < winner) {
      alert('选手时间不能小于获胜者时间')
      return
    }

    // 使用中国积分计算器
    const racePointsValue = chinaPointsCalculator.calculateRacePoints(
      competitor,
      winner,
      discipline as DisciplineCode
    )

    // 计算最终积分（比赛积分 + 罚分值）
    const finalPoints = chinaPointsCalculator.calculateFinalPoints(
      racePointsValue,
      penaltyValue,
      discipline as DisciplineCode
    )

    setRacePoints(racePointsValue)
    setResult(finalPoints)
  }

  const resetForm = () => {
    setWinnerTime('')
    setCompetitorTime('')
    setPenalty('')
    setResult(null)
    setRacePoints(null)
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
      {/* 背景装饰 */}
      <div className="absolute top-10 right-10 w-32 h-32 opacity-20 rounded-full overflow-hidden">
        <img
          src={getImagePath("/images/skiing-2.jpg")}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute bottom-20 left-10 w-24 h-24 opacity-20 rounded-full overflow-hidden">
        <img
          src={getImagePath("/images/ski-action-2.jpg")}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      {/* Header */}
      <div className="text-center mb-8 relative z-10">
        <h1 className="section-title">中国积分计算器</h1>
        <p className="text-gray-600 text-lg">
          根据中国高山滑雪积分体系标准计算比赛积分
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 计算器表单 */}
        <div className="card">
          <div className="flex items-center mb-6">
            <Calculator className="h-6 w-6 text-ski-blue mr-2" />
            <h2 className="text-xl font-semibold text-ski-navy">积分计算</h2>
          </div>

          <div className="space-y-6">
            {/* 项目选择 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                比赛项目
              </label>
              <select
                value={discipline}
                onChange={(e) => setDiscipline(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ski-blue focus:border-transparent"
              >
                {Object.entries(disciplineFactors).map(([key, value]) => (
                  <option key={key} value={key}>
                    {value.name} ({key}) - F={value.factor}
                  </option>
                ))}
              </select>
              <p className="text-xs text-gray-500 mt-1">
                {disciplineFactors[discipline as keyof typeof disciplineFactors].description}
              </p>
            </div>

            {/* 获胜者时间 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                获胜者时间 (To) - 秒
              </label>
              <input
                type="number"
                step="0.01"
                value={winnerTime}
                onChange={(e) => setWinnerTime(e.target.value)}
                placeholder="例如: 92.45"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ski-blue focus:border-transparent"
              />
            </div>

            {/* 选手时间 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                选手时间 (Tx) - 秒
              </label>
              <input
                type="number"
                step="0.01"
                value={competitorTime}
                onChange={(e) => setCompetitorTime(e.target.value)}
                placeholder="例如: 95.23"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ski-blue focus:border-transparent"
              />
            </div>

            {/* 惩罚值 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                惩罚值 (可选)
              </label>
              <input
                type="number"
                step="0.01"
                value={penalty}
                onChange={(e) => setPenalty(e.target.value)}
                placeholder="例如: 15.80"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ski-blue focus:border-transparent"
              />
              <p className="text-xs text-gray-500 mt-1">
                基于参赛选手中国积分实力计算的比赛难度系数（采用÷12计算方法）
              </p>
            </div>

            {/* 按钮 */}
            <div className="flex space-x-4">
              <button
                onClick={calculatePoints}
                className="btn-primary flex-1"
              >
                <Calculator className="h-4 w-4 mr-2" />
                计算积分
              </button>
              <button
                onClick={resetForm}
                className="btn-secondary"
              >
                <RotateCcw className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* 计算结果 */}
        <div className="space-y-6">
          {/* 公式展示 */}
          <div className="card bg-gradient-to-r from-ski-blue to-primary-700 text-white">
            <h3 className="text-lg font-semibold mb-4">计算公式</h3>
            <div className="bg-white/10 rounded-lg p-4 mb-4">
              <div className="text-2xl font-mono font-bold text-center">
                P = F × (Tx/To - 1)
              </div>
            </div>
            <div className="text-sm space-y-2">
              <div className="flex justify-between">
                <span>P (比赛积分):</span>
                <span>{racePoints !== null ? `${racePoints} 分` : '待计算'}</span>
              </div>
              <div className="flex justify-between">
                <span>F (项目系数):</span>
                <span>{disciplineFactors[discipline as keyof typeof disciplineFactors].factor}</span>
              </div>
              <div className="flex justify-between">
                <span>Tx (选手时间):</span>
                <span>{competitorTime || '0'} 秒</span>
              </div>
              <div className="flex justify-between">
                <span>To (获胜者时间):</span>
                <span>{winnerTime || '0'} 秒</span>
              </div>
            </div>
          </div>

          {/* 最终结果 */}
          {result !== null && (
            <div className="card">
              <div className="flex items-center mb-4">
                <TrendingUp className="h-6 w-6 text-green-600 mr-2" />
                <h3 className="text-lg font-semibold text-ski-navy">计算结果</h3>
              </div>
              <div className="space-y-4">
                <div className="bg-green-50 rounded-lg p-4">
                  <div className="text-sm text-gray-600 mb-1">比赛积分</div>
                  <div className="text-2xl font-bold text-green-700">
                    {racePoints} 分
                  </div>
                </div>
                {penalty && (
                  <div className="bg-yellow-50 rounded-lg p-4">
                    <div className="text-sm text-gray-600 mb-1">惩罚值</div>
                    <div className="text-xl font-bold text-yellow-700">
                      +{penalty} 分
                    </div>
                  </div>
                )}
                <div className="bg-ski-ice rounded-lg p-4">
                  <div className="text-sm text-gray-600 mb-1">最终积分</div>
                  <div className="text-3xl font-bold text-ski-blue">
                    {result} 分
                  </div>
                </div>

                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-start">
                    <Info className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                    <div className="text-sm text-blue-800">
                      <p className="font-semibold mb-1">中国积分说明：</p>
                      <p>积分越低代表成绩越好。0分为该项目中国最佳水平，积分值代表与中国最佳的差距。积分每21天更新一次。</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 使用说明 */}
          <div className="card">
            <h3 className="text-lg font-semibold text-ski-navy mb-4">使用说明</h3>
            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex items-start">
                <div className="w-6 h-6 bg-ski-blue text-white rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5">1</div>
                <div>选择比赛项目，系统会自动使用对应的F值</div>
              </div>
              <div className="flex items-start">
                <div className="w-6 h-6 bg-ski-blue text-white rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5">2</div>
                <div>输入获胜者时间和选手时间（单位：秒）</div>
              </div>
              <div className="flex items-start">
                <div className="w-6 h-6 bg-ski-blue text-white rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5">3</div>
                <div>如有惩罚值可填入，没有则留空</div>
              </div>
              <div className="flex items-start">
                <div className="w-6 h-6 bg-ski-blue text-white rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5">4</div>
                <div>点击计算按钮获得结果</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}