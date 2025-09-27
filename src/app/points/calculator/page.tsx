'use client'

import { useState } from 'react'
import { Calculator, RefreshCw } from 'lucide-react'

export default function PointsCalculatorPage() {
  const [calculation, setCalculation] = useState({
    discipline: 'GS',
    winnerTime: '',
    competitorTime: '',
    penalty: '',
    raceLevel: 'A',
    result: null as number | null
  })

  const disciplineFactors = {
    DH: 1250,   // 速降
    SL: 730,    // 回转
    GS: 1010,   // 大回转
    SG: 1190,   // 超级大回转
    AC: 1360    // 全能
  }

  const raceCoefficients = {
    A: 1.0,
    B: 0.6,
    C: 0.3
  }

  const calculatePoints = () => {
    const { discipline, winnerTime, competitorTime, penalty, raceLevel } = calculation

    if (!winnerTime || !competitorTime) {
      alert('请输入获胜者时间和参赛者时间')
      return
    }

    const F = disciplineFactors[discipline as keyof typeof disciplineFactors]
    const To = parseFloat(winnerTime)
    const Tx = parseFloat(competitorTime)
    const penaltyPoints = parseFloat(penalty) || 0
    const coefficient = raceCoefficients[raceLevel as keyof typeof raceCoefficients]

    // 基础积分计算: P = F × (Tx/To - 1)
    const basePoints = F * (Tx / To - 1)

    // 最终积分 = (基础积分 + 判罚分) × 赛事系数
    const finalPoints = (basePoints + penaltyPoints) * coefficient

    setCalculation(prev => ({
      ...prev,
      result: Math.round(finalPoints * 100) / 100
    }))
  }

  const resetCalculation = () => {
    setCalculation({
      discipline: 'GS',
      winnerTime: '',
      competitorTime: '',
      penalty: '',
      raceLevel: 'A',
      result: null
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Calculator className="h-8 w-8 text-ski-blue" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">积分计算器</h1>
          <p className="text-xl text-gray-600">
            基于中国高山滑雪积分规则v4.0的在线计算工具
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 计算表单 */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">积分计算</h2>

            <div className="space-y-6">
              {/* 项目选择 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  项目
                </label>
                <select
                  value={calculation.discipline}
                  onChange={(e) => setCalculation(prev => ({ ...prev, discipline: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ski-blue"
                >
                  <option value="DH">速降 (Downhill)</option>
                  <option value="SL">回转 (Slalom)</option>
                  <option value="GS">大回转 (Giant Slalom)</option>
                  <option value="SG">超级大回转 (Super-G)</option>
                  <option value="AC">全能 (Alpine Combined)</option>
                </select>
                <p className="text-sm text-gray-500 mt-1">
                  项目系数: {disciplineFactors[calculation.discipline as keyof typeof disciplineFactors]}
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
                  value={calculation.winnerTime}
                  onChange={(e) => setCalculation(prev => ({ ...prev, winnerTime: e.target.value }))}
                  placeholder="例如: 125.30"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ski-blue"
                />
              </div>

              {/* 参赛者时间 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  参赛者时间 (Tx) - 秒
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={calculation.competitorTime}
                  onChange={(e) => setCalculation(prev => ({ ...prev, competitorTime: e.target.value }))}
                  placeholder="例如: 128.75"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ski-blue"
                />
              </div>

              {/* 判罚分 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  判罚分 (可选)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={calculation.penalty}
                  onChange={(e) => setCalculation(prev => ({ ...prev, penalty: e.target.value }))}
                  placeholder="例如: 0.00"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ski-blue"
                />
                <p className="text-sm text-gray-500 mt-1">
                  如不知道判罚分，可留空默认为0
                </p>
              </div>

              {/* 赛事级别 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  赛事级别
                </label>
                <select
                  value={calculation.raceLevel}
                  onChange={(e) => setCalculation(prev => ({ ...prev, raceLevel: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ski-blue"
                >
                  <option value="A">A级赛事 (系数 1.0)</option>
                  <option value="B">B级赛事 (系数 0.6)</option>
                  <option value="C">C级赛事 (系数 0.3)</option>
                </select>
              </div>

              {/* 按钮 */}
              <div className="flex space-x-4">
                <button
                  onClick={calculatePoints}
                  className="flex-1 bg-ski-blue text-white py-3 px-4 rounded-md hover:bg-ski-blue/90 focus:outline-none focus:ring-2 focus:ring-ski-blue transition-colors"
                >
                  计算积分
                </button>
                <button
                  onClick={resetCalculation}
                  className="px-4 py-3 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-colors"
                >
                  <RefreshCw className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          {/* 计算结果和说明 */}
          <div className="space-y-6">
            {/* 计算结果 */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">计算结果</h3>
              {calculation.result !== null ? (
                <div className="text-center">
                  <div className="text-4xl font-bold text-ski-blue mb-2">
                    {calculation.result}
                  </div>
                  <div className="text-gray-600">积分</div>
                </div>
              ) : (
                <div className="text-center text-gray-500">
                  请输入参数后点击计算
                </div>
              )}
            </div>

            {/* 计算公式说明 */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">计算公式</h3>
              <div className="space-y-4 text-sm">
                <div>
                  <div className="font-semibold text-gray-700">基础积分公式:</div>
                  <div className="bg-gray-100 p-3 rounded mt-1 font-mono">
                    P = F × (Tx/To - 1)
                  </div>
                </div>
                <div>
                  <div className="font-semibold text-gray-700">最终积分公式:</div>
                  <div className="bg-gray-100 p-3 rounded mt-1 font-mono">
                    最终积分 = (P + 判罚分) × 赛事系数
                  </div>
                </div>
                <div className="text-gray-600">
                  <div><strong>P:</strong> 基础比赛积分</div>
                  <div><strong>F:</strong> 项目系数</div>
                  <div><strong>To:</strong> 获胜者时间</div>
                  <div><strong>Tx:</strong> 参赛者时间</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}