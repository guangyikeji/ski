'use client'

import { useState } from 'react'
import { getImagePath } from '@/utils/paths'
import { Calculator, Info, RotateCcw, TrendingUp, Users, Award } from 'lucide-react'
import {
  chinaSkiPointsCalculatorV4,
  DISCIPLINE_FACTORS_V4,
  EventLevel,
  AgeGroupV4,
  EVENT_COEFFICIENTS_V4,
  type AthleteResultV4,
  type RaceConfigV4,
  type CalculationResultV4
} from '@/utils/chinaSkiPointsCalculatorV4'

const disciplineFactors = {
  DH: { name: '速降', factor: DISCIPLINE_FACTORS_V4.DH, description: '高速度项目，技术要求高' },
  SL: { name: '回转', factor: DISCIPLINE_FACTORS_V4.SL, description: '技术性强，转弯密集' },
  GS: { name: '大回转', factor: DISCIPLINE_FACTORS_V4.GS, description: '速度与技术的平衡' },
  SG: { name: '超级大回转', factor: DISCIPLINE_FACTORS_V4.SG, description: '高速技术项目' },
  AC: { name: '全能', factor: DISCIPLINE_FACTORS_V4.AC, description: '综合项目积分' }
}

const eventLevels = {
  [EventLevel.A]: { name: 'A级赛事', description: '全国锦标赛、冬运会等', coefficient: 1.0 },
  [EventLevel.B]: { name: 'B级赛事', description: '省级锦标赛、区域邀请赛等', coefficient: 0.6 },
  [EventLevel.C]: { name: 'C级赛事', description: '地市级赛事等', coefficient: 0.3 }
}

const ageGroups = {
  [AgeGroupV4.ADULT]: { name: '成年组', description: '成年运动员' },
  [AgeGroupV4.U21]: { name: 'U21组', description: '21岁以下' },
  [AgeGroupV4.U18]: { name: 'U18组', description: '18岁以下' },
  [AgeGroupV4.U15]: { name: 'U15组', description: '15岁以下' },
  [AgeGroupV4.U12]: { name: 'U12组', description: '12岁以下（发展积分）' },
  [AgeGroupV4.U10]: { name: 'U10组', description: '10岁以下（发展积分）' }
}

export default function CalculatorPage() {
  // 基础比赛信息
  const [discipline, setDiscipline] = useState('GS')
  const [eventLevel, setEventLevel] = useState(EventLevel.B)
  const [winnerTime, setWinnerTime] = useState('')
  const [competitorTime, setCompetitorTime] = useState('')
  const [penalty, setPenalty] = useState('0')

  // 运动员信息
  const [athleteName, setAthleteName] = useState('张三')
  const [ageGroup, setAgeGroup] = useState(AgeGroupV4.ADULT)

  // 计算结果
  const [result, setResult] = useState<CalculationResultV4 | null>(null)

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

    // 使用v4.0简化计算
    const calculation = chinaSkiPointsCalculatorV4.calculateSimplifiedPoints(
      competitor,
      winner,
      discipline as keyof typeof DISCIPLINE_FACTORS_V4,
      eventLevel,
      penaltyValue
    )

    setResult(calculation)
  }

  const resetForm = () => {
    setWinnerTime('')
    setCompetitorTime('')
    setPenalty('0')
    setAthleteName('张三')
    setAgeGroup(AgeGroupV4.ADULT)
    setResult(null)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
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
        <h1 className="section-title">积分计算器</h1>
        <p className="text-gray-600 text-lg">
          中国高山滑雪赛事积分规则v4.0 - 简化精准计算
        </p>
        <div className="flex justify-center space-x-6 mt-4 text-sm text-gray-500">
          <span className="flex items-center">
            <Calculator className="h-4 w-4 mr-1" />
            简化计算公式
          </span>
          <span className="flex items-center">
            <Users className="h-4 w-4 mr-1" />
            三级赛事体系
          </span>
          <span className="flex items-center">
            <Award className="h-4 w-4 mr-1" />
            判罚分机制
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* 基础比赛信息 */}
        <div className="card">
          <div className="flex items-center mb-6">
            <Calculator className="h-6 w-6 text-ski-blue mr-2" />
            <h2 className="text-xl font-semibold text-ski-navy">比赛信息</h2>
          </div>

          <div className="space-y-4">
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
                    {value.name} (F={value.factor})
                  </option>
                ))}
              </select>
            </div>

            {/* 赛事等级 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                赛事等级
              </label>
              <select
                value={eventLevel}
                onChange={(e) => setEventLevel(e.target.value as EventLevel)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ski-blue focus:border-transparent"
              >
                {Object.entries(eventLevels).map(([key, value]) => (
                  <option key={key} value={key}>
                    {value.name} (×{value.coefficient})
                  </option>
                ))}
              </select>
              <p className="text-xs text-gray-500 mt-1">
                {eventLevels[eventLevel].description}
              </p>
            </div>

            {/* 判罚分 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                判罚分（可选）
              </label>
              <input
                type="number"
                step="0.01"
                value={penalty}
                onChange={(e) => setPenalty(e.target.value)}
                placeholder="例如: 1.25"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ski-blue focus:border-transparent"
              />
              <p className="text-xs text-gray-500 mt-1">
                用于平衡比赛难度差异，可为正值或负值
              </p>
            </div>

            {/* 获胜者时间 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                获胜者时间 (秒)
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
                选手时间 (秒)
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
          </div>
        </div>

        {/* 运动员信息 */}
        <div className="card">
          <div className="flex items-center mb-6">
            <Users className="h-6 w-6 text-green-600 mr-2" />
            <h2 className="text-xl font-semibold text-ski-navy">运动员信息</h2>
          </div>

          <div className="space-y-4">
            {/* 运动员姓名 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                运动员姓名
              </label>
              <input
                type="text"
                value={athleteName}
                onChange={(e) => setAthleteName(e.target.value)}
                placeholder="例如: 张三"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ski-blue focus:border-transparent"
              />
            </div>

            {/* 年龄组别 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                年龄组别
              </label>
              <select
                value={ageGroup}
                onChange={(e) => setAgeGroup(e.target.value as AgeGroupV4)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ski-blue focus:border-transparent"
              >
                {Object.entries(ageGroups).map(([key, value]) => (
                  <option key={key} value={key}>
                    {value.name}
                  </option>
                ))}
              </select>
              <p className="text-xs text-gray-500 mt-1">
                {ageGroups[ageGroup].description}
              </p>
            </div>

            {/* 说明文字 */}
            <div className="bg-blue-50 p-3 rounded-lg">
              <h4 className="text-sm font-semibold text-blue-800 mb-2">v4.0 简化说明</h4>
              <ul className="text-xs text-blue-700 space-y-1">
                <li>• U15/U18/U21：使用正式积分计算</li>
                <li>• U12/U10：使用发展积分，不计入正式排名</li>
                <li>• 满13岁后U12发展积分可转为正式积分</li>
              </ul>
            </div>
          </div>

          {/* 计算按钮 */}
          <div className="flex space-x-2 mt-6">
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

        {/* 计算结果 */}
        {result && (
          <div className="xl:col-span-2 space-y-6">
            {/* v4.0简化公式展示 */}
            <div className="card bg-gradient-to-r from-ski-blue to-primary-700 text-white">
              <h3 className="text-lg font-semibold mb-4">v4.0简化积分公式</h3>
              <div className="bg-white/10 rounded-lg p-4 mb-4">
                <div className="text-xl font-mono font-bold text-center mb-2">
                  最终积分 = (基础积分 + 判罚分) × 赛事系数
                </div>
                <div className="text-sm text-center opacity-90">
                  Final Points = (Base Race Points + Penalty) × Event Coefficient
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <div className="text-white/80">基础积分</div>
                  <div className="font-bold">{result.baseRacePoints} 分</div>
                </div>
                <div>
                  <div className="text-white/80">判罚分</div>
                  <div className="font-bold">{result.penalty > 0 ? '+' : ''}{result.penalty} 分</div>
                </div>
                <div>
                  <div className="text-white/80">赛事系数</div>
                  <div className="font-bold">×{result.eventCoefficient}</div>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="flex items-center mb-4">
                <TrendingUp className="h-6 w-6 text-green-600 mr-2" />
                <h3 className="text-lg font-semibold text-ski-navy">v4.0积分详情</h3>
              </div>
              <div className="space-y-4">
                <div className="bg-green-50 rounded-lg p-4">
                  <div className="text-sm text-gray-600 mb-1">最终积分</div>
                  <div className="text-3xl font-bold text-green-700">
                    {result.finalPoints} 分
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="text-sm text-gray-600 mb-1">基础积分</div>
                    <div className="text-xl font-bold text-blue-700">
                      {result.baseRacePoints} 分
                    </div>
                  </div>
                  <div className="bg-orange-50 rounded-lg p-4">
                    <div className="text-sm text-gray-600 mb-1">判罚分</div>
                    <div className="text-xl font-bold text-orange-700">
                      {result.penalty > 0 ? '+' : ''}{result.penalty} 分
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-gray-600">运动员</div>
                      <div className="font-bold">{athleteName}</div>
                    </div>
                    <div>
                      <div className="text-gray-600">年龄组别</div>
                      <div className="font-bold">{ageGroups[ageGroup].name}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* v4.0说明 */}
            <div className="card">
              <div className="flex items-start">
                <Info className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-blue-800">
                  <p className="font-semibold mb-2">中国高山滑雪赛事积分规则v4.0核心特点：</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="font-medium mb-1">🎯 简化计算公式</p>
                      <p className="text-xs text-gray-600">去除复杂系数，采用简洁明确的三步计算</p>
                    </div>
                    <div>
                      <p className="font-medium mb-1">🏆 三级赛事体系</p>
                      <p className="text-xs text-gray-600">A级(1.0)、B级(0.6)、C级(0.3)三级系数体系</p>
                    </div>
                    <div>
                      <p className="font-medium mb-1">👶 扩展U系列体系</p>
                      <p className="text-xs text-gray-600">新增U21和U12组别，独立积分排名</p>
                    </div>
                    <div>
                      <p className="font-medium mb-1">⚖️ 完善判罚机制</p>
                      <p className="text-xs text-gray-600">明确判罚分计算方法，确保积分公平性</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 使用说明 */}
      {!result && (
        <div className="mt-8 card">
          <h3 className="text-lg font-semibold text-ski-navy mb-4">v4.0简化计算器使用指南</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600">
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">📊 比赛信息</h4>
              <div className="space-y-2">
                <div className="flex items-start">
                  <div className="w-5 h-5 bg-ski-blue text-white rounded-full flex items-center justify-center text-xs font-bold mr-2 mt-0.5">1</div>
                  <div>选择项目和赛事等级</div>
                </div>
                <div className="flex items-start">
                  <div className="w-5 h-5 bg-ski-blue text-white rounded-full flex items-center justify-center text-xs font-bold mr-2 mt-0.5">2</div>
                  <div>输入获胜者时间和选手时间</div>
                </div>
                <div className="flex items-start">
                  <div className="w-5 h-5 bg-ski-blue text-white rounded-full flex items-center justify-center text-xs font-bold mr-2 mt-0.5">3</div>
                  <div>可选输入判罚分（默认0分）</div>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">👤 运动员信息</h4>
              <div className="space-y-2">
                <div className="flex items-start">
                  <div className="w-5 h-5 bg-green-600 text-white rounded-full flex items-center justify-center text-xs font-bold mr-2 mt-0.5">1</div>
                  <div>填写运动员姓名</div>
                </div>
                <div className="flex items-start">
                  <div className="w-5 h-5 bg-green-600 text-white rounded-full flex items-center justify-center text-xs font-bold mr-2 mt-0.5">2</div>
                  <div>选择对应年龄组别</div>
                </div>
                <div className="flex items-start">
                  <div className="w-5 h-5 bg-green-600 text-white rounded-full flex items-center justify-center text-xs font-bold mr-2 mt-0.5">3</div>
                  <div>点击计算获得积分结果</div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-2">v4.0简化说明</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-blue-700">
              <div>
                <p className="font-medium mb-1">• 计算公式：</p>
                <p>最终积分 = (基础积分 + 判罚分) × 赛事系数</p>
              </div>
              <div>
                <p className="font-medium mb-1">• 赛事系数：</p>
                <p>A级(1.0) &gt; B级(0.6) &gt; C级(0.3)</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}