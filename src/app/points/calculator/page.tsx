'use client'

import { useState } from 'react'
import { getImagePath } from '@/utils/paths'
import { Calculator, Info, RotateCcw, TrendingUp, Users, Award } from 'lucide-react'
import {
  comprehensivePointsCalculator,
  DISCIPLINE_FACTORS,
  EventLevel,
  AgeGroup,
  BonusType,
  type AthleteResult,
  type RaceConfig,
  type BonusPoint
} from '@/utils/comprehensivePointsCalculator'

const disciplineFactors = {
  DH: { name: '速降', factor: DISCIPLINE_FACTORS.DH, description: '高速度项目，技术要求高' },
  SL: { name: '回转', factor: DISCIPLINE_FACTORS.SL, description: '技术性强，转弯密集' },
  GS: { name: '大回转', factor: DISCIPLINE_FACTORS.GS, description: '速度与技术的平衡' },
  SG: { name: '超级大回转', factor: DISCIPLINE_FACTORS.SG, description: '高速技术项目' },
  AC: { name: '全能', factor: DISCIPLINE_FACTORS.AC, description: '综合项目积分' }
}

const eventLevels = {
  [EventLevel.A]: { name: 'A级赛事', description: '全国锦标赛、冬运会等', coefficient: 1.0 },
  [EventLevel.B]: { name: 'B级赛事', description: '青年冠军赛、巡回赛分站等', coefficient: 0.8 },
  [EventLevel.C]: { name: 'C级赛事', description: '省级锦标赛、区域邀请赛', coefficient: 0.6 },
  [EventLevel.D]: { name: 'D级赛事', description: '市级比赛、俱乐部赛事', coefficient: 0.4 }
}

const ageGroups = {
  [AgeGroup.ADULT]: { name: '成年组', description: '成年运动员', coefficient: 1.0 },
  [AgeGroup.U21]: { name: 'U21组', description: '21岁以下', coefficient: 0.95 },
  [AgeGroup.U18]: { name: 'U18组', description: '18岁以下', coefficient: 0.85 },
  [AgeGroup.U15]: { name: 'U15组', description: '15岁以下', coefficient: 0.70 },
  [AgeGroup.U12]: { name: 'U12组', description: '12岁以下', coefficient: 0.55 },
  [AgeGroup.U10]: { name: 'U10组', description: '10岁以下', coefficient: 0.40 }
}

export default function CalculatorPage() {
  // 基础比赛信息
  const [discipline, setDiscipline] = useState('GS')
  const [eventLevel, setEventLevel] = useState(EventLevel.B)
  const [participantCount, setParticipantCount] = useState('32')
  const [top8AveragePoints, setTop8AveragePoints] = useState('180')
  const [winnerTime, setWinnerTime] = useState('')
  const [competitorTime, setCompetitorTime] = useState('')

  // 运动员信息
  const [athleteName, setAthleteName] = useState('张三')
  const [ageGroup, setAgeGroup] = useState(AgeGroup.ADULT)
  const [previousRank, setPreviousRank] = useState('')
  const [currentPoints, setCurrentPoints] = useState('')

  // 附加分选项
  const [isPersonalBest, setIsPersonalBest] = useState(false)
  const [isFirstCompletion, setIsFirstCompletion] = useState(false)
  const [isAnnualProgress, setIsAnnualProgress] = useState(false)
  const [consecutiveCount, setConsecutiveCount] = useState('')
  const [isDoubleEventSameDay, setIsDoubleEventSameDay] = useState(false)
  const [isFullAttendance, setIsFullAttendance] = useState(false)

  // 计算结果
  const [result, setResult] = useState<any>(null)

  const calculatePoints = () => {
    const winner = parseFloat(winnerTime)
    const competitor = parseFloat(competitorTime)
    const participants = parseInt(participantCount)
    const avgPoints = parseFloat(top8AveragePoints)

    if (!winner || !competitor || winner <= 0 || competitor <= 0) {
      alert('请输入有效的时间数据')
      return
    }

    if (competitor < winner) {
      alert('选手时间不能小于获胜者时间')
      return
    }

    if (!participants || participants < 1) {
      alert('请输入有效的参赛人数')
      return
    }

    // 构建运动员信息
    const athlete: AthleteResult = {
      athleteId: '001',
      name: athleteName || '张三',
      time: competitor,
      previousRank: previousRank ? parseInt(previousRank) : undefined,
      currentPoints: currentPoints ? parseFloat(currentPoints) : undefined,
      ageGroup: ageGroup
    }

    // 构建比赛配置
    const raceConfig: RaceConfig = {
      eventLevel: eventLevel,
      discipline: discipline as keyof typeof DISCIPLINE_FACTORS,
      participantCount: participants,
      winnerTime: winner,
      top8AveragePoints: avgPoints
    }

    // 构建附加分
    const bonusPoints: BonusPoint[] = []

    // 连续完赛附加分
    const consecutiveBonus = comprehensivePointsCalculator.calculateConsecutiveCompletionBonus(
      consecutiveCount ? parseInt(consecutiveCount) : 0,
      isDoubleEventSameDay,
      isFullAttendance
    )
    bonusPoints.push(...consecutiveBonus)

    // 突破类附加分
    const breakthroughBonus = comprehensivePointsCalculator.calculateBreakthroughBonus(
      isPersonalBest,
      isFirstCompletion,
      isAnnualProgress
    )
    bonusPoints.push(...breakthroughBonus)

    // 战胜高手附加分
    if (currentPoints && athlete.currentPoints) {
      const defeatBonus = comprehensivePointsCalculator.calculateDefeatHigherRankBonus(
        athlete.currentPoints,
        athlete.currentPoints + 50, // 模拟被击败对手积分
        eventLevel
      )
      if (defeatBonus) {
        bonusPoints.push(defeatBonus)
      }
    }

    // 计算综合积分
    const calculation = comprehensivePointsCalculator.calculateComprehensivePoints(
      athlete,
      raceConfig,
      bonusPoints
    )

    setResult({
      ...calculation,
      athlete,
      raceConfig,
      bonusPoints
    })
  }

  const resetForm = () => {
    setWinnerTime('')
    setCompetitorTime('')
    setParticipantCount('32')
    setTop8AveragePoints('180')
    setAthleteName('张三')
    setAgeGroup(AgeGroup.ADULT)
    setPreviousRank('')
    setCurrentPoints('')
    setIsPersonalBest(false)
    setIsFirstCompletion(false)
    setIsAnnualProgress(false)
    setConsecutiveCount('')
    setIsDoubleEventSameDay(false)
    setIsFullAttendance(false)
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
        <h1 className="section-title">综合积分计算器</h1>
        <p className="text-gray-600 text-lg">
          中国高山滑雪赛事积分规则v2.0 - 多重系数综合计算
        </p>
        <div className="flex justify-center space-x-6 mt-4 text-sm text-gray-500">
          <span className="flex items-center">
            <Calculator className="h-4 w-4 mr-1" />
            基础积分×多重系数
          </span>
          <span className="flex items-center">
            <Users className="h-4 w-4 mr-1" />
            青少年分层体系
          </span>
          <span className="flex items-center">
            <Award className="h-4 w-4 mr-1" />
            附加分激励
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
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

            {/* 参赛人数 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                参赛人数
              </label>
              <input
                type="number"
                value={participantCount}
                onChange={(e) => setParticipantCount(e.target.value)}
                placeholder="例如: 65"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ski-blue focus:border-transparent"
              />
              <p className="text-xs text-gray-500 mt-1">
                影响人数系数：8-15人(×0.8)到256+人(×1.4)
              </p>
            </div>

            {/* 前8名平均积分 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                前8名平均积分
              </label>
              <input
                type="number"
                step="0.01"
                value={top8AveragePoints}
                onChange={(e) => setTop8AveragePoints(e.target.value)}
                placeholder="例如: 180.50"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ski-blue focus:border-transparent"
              />
              <p className="text-xs text-gray-500 mt-1">
                用于计算质量系数：1+(平均积分/500)
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
                onChange={(e) => setAgeGroup(e.target.value as AgeGroup)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ski-blue focus:border-transparent"
              >
                {Object.entries(ageGroups).map(([key, value]) => (
                  <option key={key} value={key}>
                    {value.name} (×{value.coefficient})
                  </option>
                ))}
              </select>
              <p className="text-xs text-gray-500 mt-1">
                {ageGroups[ageGroup].description}
              </p>
            </div>

            {/* 上次排名 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                上次排名 (可选)
              </label>
              <input
                type="number"
                value={previousRank}
                onChange={(e) => setPreviousRank(e.target.value)}
                placeholder="例如: 15"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ski-blue focus:border-transparent"
              />
              <p className="text-xs text-gray-500 mt-1">
                用于计算青少年进步奖励分
              </p>
            </div>

            {/* 当前积分 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                当前积分 (可选)
              </label>
              <input
                type="number"
                step="0.01"
                value={currentPoints}
                onChange={(e) => setCurrentPoints(e.target.value)}
                placeholder="例如: 120.50"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ski-blue focus:border-transparent"
              />
              <p className="text-xs text-gray-500 mt-1">
                用于计算战胜高手附加分
              </p>
            </div>
          </div>
        </div>

        {/* 附加分选项 */}
        <div className="card">
          <div className="flex items-center mb-6">
            <Award className="h-6 w-6 text-yellow-600 mr-2" />
            <h2 className="text-xl font-semibold text-ski-navy">附加分选项</h2>
          </div>

          <div className="space-y-4">
            {/* 突破类奖励 */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-2">突破类奖励</h3>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={isPersonalBest}
                    onChange={(e) => setIsPersonalBest(e.target.checked)}
                    className="mr-2 text-ski-blue"
                  />
                  <span className="text-sm">刷新个人最佳 (+5分)</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={isFirstCompletion}
                    onChange={(e) => setIsFirstCompletion(e.target.checked)}
                    className="mr-2 text-ski-blue"
                  />
                  <span className="text-sm">项目首次完赛 (+3分)</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={isAnnualProgress}
                    onChange={(e) => setIsAnnualProgress(e.target.checked)}
                    className="mr-2 text-ski-blue"
                  />
                  <span className="text-sm">年度进步奖 (+8分)</span>
                </label>
              </div>
            </div>

            {/* 连续完赛奖励 */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-2">连续完赛奖励</h3>
              <div className="space-y-2">
                <div>
                  <label className="block text-xs text-gray-600 mb-1">
                    连续参赛次数
                  </label>
                  <input
                    type="number"
                    value={consecutiveCount}
                    onChange={(e) => setConsecutiveCount(e.target.value)}
                    placeholder="次数"
                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-ski-blue"
                  />
                </div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={isDoubleEventSameDay}
                    onChange={(e) => setIsDoubleEventSameDay(e.target.checked)}
                    className="mr-2 text-ski-blue"
                  />
                  <span className="text-sm">单日双项 (+3分)</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={isFullAttendance}
                    onChange={(e) => setIsFullAttendance(e.target.checked)}
                    className="mr-2 text-ski-blue"
                  />
                  <span className="text-sm">赛季全勤 (+10分)</span>
                </label>
              </div>
            </div>
          </div>

          {/* 计算按钮 */}
          <div className="flex space-x-2 mt-6">
            <button
              onClick={calculatePoints}
              className="btn-primary flex-1"
            >
              <Calculator className="h-4 w-4 mr-2" />
              计算综合积分
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
          <div className="xl:col-span-3 space-y-6">
            {/* 综合公式展示 */}
            <div className="card bg-gradient-to-r from-ski-blue to-primary-700 text-white">
              <h3 className="text-lg font-semibold mb-4">v2.0综合积分公式</h3>
              <div className="bg-white/10 rounded-lg p-4 mb-4">
                <div className="text-xl font-mono font-bold text-center mb-2">
                  总积分 = 基础积分 × 赛事系数 × 质量系数 × 人数系数 + 附加分
                </div>
                <div className="text-sm text-center opacity-90">
                  Basic Points × Event Coeff × Quality Coeff × Participant Coeff + Bonus
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <div className="text-white/80">基础积分</div>
                  <div className="font-bold">{result.basicPoints} 分</div>
                </div>
                <div>
                  <div className="text-white/80">赛事系数</div>
                  <div className="font-bold">×{result.eventCoefficient}</div>
                </div>
                <div>
                  <div className="text-white/80">质量系数</div>
                  <div className="font-bold">×{result.qualityCoefficient}</div>
                </div>
                <div>
                  <div className="text-white/80">人数系数</div>
                  <div className="font-bold">×{result.participantCoefficient}</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* 计算结果详情 */}
              <div className="card">
                <div className="flex items-center mb-4">
                  <TrendingUp className="h-6 w-6 text-green-600 mr-2" />
                  <h3 className="text-lg font-semibold text-ski-navy">积分详情</h3>
                </div>
                <div className="space-y-4">
                  <div className="bg-green-50 rounded-lg p-4">
                    <div className="text-sm text-gray-600 mb-1">综合积分</div>
                    <div className="text-3xl font-bold text-green-700">
                      {result.comprehensivePoints} 分
                    </div>
                  </div>

                  {result.youthFinalPoints !== undefined && (
                    <div className="bg-blue-50 rounded-lg p-4">
                      <div className="text-sm text-gray-600 mb-1">青少年最终积分</div>
                      <div className="text-2xl font-bold text-blue-700">
                        {result.youthFinalPoints} 分
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {ageGroups[ageGroup].name} 系数: ×{ageGroups[ageGroup].coefficient}
                      </div>
                    </div>
                  )}

                  {result.totalBonus > 0 && (
                    <div className="bg-yellow-50 rounded-lg p-4">
                      <div className="text-sm text-gray-600 mb-1">附加分总计</div>
                      <div className="text-xl font-bold text-yellow-700">
                        +{result.totalBonus} 分
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="bg-gray-50 rounded p-3">
                      <div className="text-gray-600">基础积分</div>
                      <div className="font-bold">{result.basicPoints}</div>
                    </div>
                    <div className="bg-gray-50 rounded p-3">
                      <div className="text-gray-600">运动员</div>
                      <div className="font-bold">{result.athlete.name}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 附加分明细 */}
              {result.bonusPoints.length > 0 && (
                <div className="card">
                  <div className="flex items-center mb-4">
                    <Award className="h-6 w-6 text-yellow-600 mr-2" />
                    <h3 className="text-lg font-semibold text-ski-navy">附加分明细</h3>
                  </div>
                  <div className="space-y-3">
                    {result.bonusPoints.map((bonus: BonusPoint, index: number) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                        <div>
                          <div className="font-medium text-gray-900">{bonus.description}</div>
                          <div className="text-sm text-gray-600">{bonus.type}</div>
                        </div>
                        <div className="text-lg font-bold text-yellow-700">
                          +{bonus.points}分
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* v2.0说明 */}
            <div className="card">
              <div className="flex items-start">
                <Info className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-blue-800">
                  <p className="font-semibold mb-2">中国高山滑雪赛事积分规则v2.0核心特点：</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="font-medium mb-1">🏆 多重系数计算</p>
                      <p className="text-xs text-gray-600">赛事等级、比赛质量、参赛人数全面考虑</p>
                    </div>
                    <div>
                      <p className="font-medium mb-1">👶 青少年分层体系</p>
                      <p className="text-xs text-gray-600">U10-U21五个年龄组，差异化积分系数</p>
                    </div>
                    <div>
                      <p className="font-medium mb-1">🎯 附加分激励</p>
                      <p className="text-xs text-gray-600">连续完赛、战胜高手、突破奖励</p>
                    </div>
                    <div>
                      <p className="font-medium mb-1">📊 24个月滚动</p>
                      <p className="text-xs text-gray-600">时间权重衰减，最新成绩优先</p>
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
          <h3 className="text-lg font-semibold text-ski-navy mb-4">v2.0综合计算器使用指南</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-600">
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">📊 比赛信息</h4>
              <div className="space-y-2">
                <div className="flex items-start">
                  <div className="w-5 h-5 bg-ski-blue text-white rounded-full flex items-center justify-center text-xs font-bold mr-2 mt-0.5">1</div>
                  <div>选择项目和赛事等级</div>
                </div>
                <div className="flex items-start">
                  <div className="w-5 h-5 bg-ski-blue text-white rounded-full flex items-center justify-center text-xs font-bold mr-2 mt-0.5">2</div>
                  <div>填入参赛人数和前8名平均积分</div>
                </div>
                <div className="flex items-start">
                  <div className="w-5 h-5 bg-ski-blue text-white rounded-full flex items-center justify-center text-xs font-bold mr-2 mt-0.5">3</div>
                  <div>输入获胜者时间和选手时间</div>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">👤 运动员信息</h4>
              <div className="space-y-2">
                <div className="flex items-start">
                  <div className="w-5 h-5 bg-green-600 text-white rounded-full flex items-center justify-center text-xs font-bold mr-2 mt-0.5">1</div>
                  <div>填写运动员基本信息</div>
                </div>
                <div className="flex items-start">
                  <div className="w-5 h-5 bg-green-600 text-white rounded-full flex items-center justify-center text-xs font-bold mr-2 mt-0.5">2</div>
                  <div>选择对应年龄组别</div>
                </div>
                <div className="flex items-start">
                  <div className="w-5 h-5 bg-green-600 text-white rounded-full flex items-center justify-center text-xs font-bold mr-2 mt-0.5">3</div>
                  <div>可选填上次排名和当前积分</div>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">🏅 附加分选项</h4>
              <div className="space-y-2">
                <div className="flex items-start">
                  <div className="w-5 h-5 bg-yellow-600 text-white rounded-full flex items-center justify-center text-xs font-bold mr-2 mt-0.5">1</div>
                  <div>选择适用的突破类奖励</div>
                </div>
                <div className="flex items-start">
                  <div className="w-5 h-5 bg-yellow-600 text-white rounded-full flex items-center justify-center text-xs font-bold mr-2 mt-0.5">2</div>
                  <div>填写连续完赛相关信息</div>
                </div>
                <div className="flex items-start">
                  <div className="w-5 h-5 bg-yellow-600 text-white rounded-full flex items-center justify-center text-xs font-bold mr-2 mt-0.5">3</div>
                  <div>点击计算获得综合积分</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}