'use client'

import { Calculator, TrendingUp, Users, Clock, Award, FileText, AlertTriangle, CheckCircle, Shield } from 'lucide-react'
import { getImagePath } from '@/utils/paths'

// 中国优化积分参数 - 严格按照CLAUDE.md实现
const chinaOptimizedConfig = {
  // 惩罚值分母优化
  penaltyDivisor: 12, // 中国优化: ÷12 (国际÷10)

  // 积分更新周期优化
  nlUpdateCycle: 21, // 中国优化: 21天 (国际14天)

  // BL计算优化
  blSingleResultFactor: 1.15, // 中国优化: 1.15 (国际1.20)
  blNoResultFactor: 1.40,     // 中国优化: 1.40 (国际1.50)

  // 伤病保护优化
  injuryProtectionFactor: 1.08, // 中国优化: 1.08 (国际1.10)
  injuryProtectionMaxMonths: 10,  // 中国特色: 最长10个月

  // 惩罚值上限
  penaltyMaxLimit: 50, // 中国特色: 50分上限

  // 新运动员BL设定
  newAthleteBLFactor: 1.20 // 国内平均水平×1.20
}

// 中国优化的项目系数 (保持国际标准但标注中国标准)
const disciplineFactors = [
  { discipline: '速降 (DH)', factor: 1250, description: '高速度项目，技术要求高', maxPoints: 300 },
  { discipline: '回转 (SL)', factor: 730, description: '技术性强，转弯密集', maxPoints: 150 },
  { discipline: '大回转 (GS)', factor: 1010, description: '速度与技术的平衡', maxPoints: 200 },
  { discipline: '超级大回转 (SG)', factor: 1190, description: '高速技术项目', maxPoints: 250 },
  { discipline: '全能 (AC)', factor: 1360, description: '综合项目积分', maxPoints: 250 }
]

// 中国vs国际标准对比数据
const comparisonData = [
  {
    item: 'Penalty分母',
    international: '÷10',
    china: '÷12',
    improvement: '小赛事更公平',
    changeRate: '+20%'
  },
  {
    item: 'NL更新周期',
    international: '14天',
    china: '21天',
    improvement: '适配赛事频率',
    changeRate: '+50%'
  },
  {
    item: 'BL单次成绩',
    international: '+20%',
    china: '+15%',
    improvement: '新人更友好',
    changeRate: '-25%'
  },
  {
    item: 'BL无成绩',
    international: '+50%',
    china: '+40%',
    improvement: '控制积分膨胀',
    changeRate: '-20%'
  },
  {
    item: '伤病保护',
    international: '+10%',
    china: '+8%',
    improvement: '更稳健保护',
    changeRate: '-20%'
  }
]

// 计算示例数据
const calculationExample = {
  winnerTime: 65.43, // 冠军用时
  athleteTime: 67.89, // 运动员用时
  disciplineFactor: 1010, // 大回转系数
  sumA: 110.36, // 前10名中最好5名的中国积分总和
  sumB: 112.69, // 所有参赛者中最好5名的中国积分总和
  sumC: 94.56   // 最好5名的比赛积分总和
}

// 分阶段伤病保护机制
const injuryProtectionStages = [
  { stage: '第一阶段', description: '初期伤病', protection: '8%', condition: '初次申请' },
  { stage: '第二阶段', description: '康复期', protection: '5%', condition: '康复训练中' },
  { stage: '第三阶段', description: '恢复期', protection: '3%', condition: '逐步恢复' },
  { stage: '积分冻结', description: '重大伤病', protection: '完全冻结', condition: '住院治疗>30天' }
]

export default function PointsRulesPage() {
  // 计算示例结果
  const racePoints = chinaOptimizedConfig.penaltyDivisor === 12
    ? (calculationExample.disciplineFactor * calculationExample.athleteTime / calculationExample.winnerTime) - calculationExample.disciplineFactor
    : 0

  const penaltyPoints = (calculationExample.sumA + calculationExample.sumB - calculationExample.sumC) / chinaOptimizedConfig.penaltyDivisor

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* 重要声明 */}
      <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-lg p-6 mb-8">
        <div className="flex items-start">
          <AlertTriangle className="h-6 w-6 text-red-600 mt-1 mr-3 flex-shrink-0" />
          <div>
            <h3 className="text-lg font-semibold text-red-800 mb-2">重要声明</h3>
            <p className="text-red-700 text-sm leading-relaxed">
              以下规则为最终确定版本，系统开发必须严格遵循此规则体系。本积分体系是为<strong>中国高山滑雪赛事</strong>建立的独立积分计算系统，
              采用借鉴国际雪联方法但根据中国赛事特点优化的计算参数。
            </p>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-ski-navy mb-4">中国高山滑雪积分规则详解</h1>
        <p className="text-gray-600 text-lg leading-relaxed">
          基于中国滑雪协会标准的积分计算规则 v1.1版，包含中国优化参数和创新保护机制
        </p>
      </div>

      {/* 核心公式 - 中国标准 */}
      <div className="bg-gradient-to-r from-ski-blue to-primary-700 text-white rounded-lg p-8 mb-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">中国积分计算公式</h2>
          <div className="text-4xl font-mono font-bold mb-6 bg-white/20 rounded-lg py-4">
            P = (F × Tx/To) - F
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="bg-white/20 rounded-lg p-3">
              <div className="font-bold text-lg">P</div>
              <div>中国积分</div>
            </div>
            <div className="bg-white/20 rounded-lg p-3">
              <div className="font-bold text-lg">F</div>
              <div>项目系数</div>
            </div>
            <div className="bg-white/20 rounded-lg p-3">
              <div className="font-bold text-lg">Tx</div>
              <div>运动员用时</div>
            </div>
            <div className="bg-white/20 rounded-lg p-3">
              <div className="font-bold text-lg">To</div>
              <div>冠军用时</div>
            </div>
          </div>
        </div>
      </div>

      {/* 计算示例 - 详细展示 */}
      <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
        <h2 className="text-2xl font-bold text-ski-navy mb-6">计算示例详解</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-ski-navy mb-4">示例：大回转项目积分计算</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between p-3 bg-gray-50 rounded">
                <span>冠军用时(To):</span>
                <span className="font-bold">{calculationExample.winnerTime}秒</span>
              </div>
              <div className="flex justify-between p-3 bg-gray-50 rounded">
                <span>运动员用时(Tx):</span>
                <span className="font-bold">{calculationExample.athleteTime}秒</span>
              </div>
              <div className="flex justify-between p-3 bg-gray-50 rounded">
                <span>项目系数(F):</span>
                <span className="font-bold">{calculationExample.disciplineFactor}</span>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-ski-navy mb-4">计算过程</h3>
            <div className="bg-blue-50 rounded-lg p-4 text-sm space-y-2">
              <div>P = ({calculationExample.disciplineFactor} × {calculationExample.athleteTime}/{calculationExample.winnerTime}) - {calculationExample.disciplineFactor}</div>
              <div>P = ({calculationExample.disciplineFactor} × 1.0376) - {calculationExample.disciplineFactor}</div>
              <div>P = 1048.00 - {calculationExample.disciplineFactor}</div>
              <div className="font-bold text-ski-blue border-t pt-2">P = 38.00分</div>
              <div className="text-xs text-gray-600">积分保留：38.00分 (小数点后2位)</div>
            </div>
          </div>
        </div>
      </div>

      {/* 中国优化参数表 */}
      <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
        <h2 className="text-2xl font-bold text-ski-navy mb-6">中国 vs 国际标准完整对照</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left py-4 px-4 font-semibold text-gray-700">调整项目</th>
                <th className="text-left py-4 px-4 font-semibold text-gray-700">国际标准</th>
                <th className="text-left py-4 px-4 font-semibold text-gray-700">中国优化</th>
                <th className="text-left py-4 px-4 font-semibold text-gray-700">变化率</th>
                <th className="text-left py-4 px-4 font-semibold text-gray-700">影响评估</th>
              </tr>
            </thead>
            <tbody>
              {comparisonData.map((item, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4 font-medium text-gray-900">{item.item}</td>
                  <td className="py-4 px-4 text-gray-600">{item.international}</td>
                  <td className="py-4 px-4">
                    <span className="font-bold text-ski-blue">{item.china}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-green-600 font-medium">{item.changeRate}</span>
                  </td>
                  <td className="py-4 px-4 text-gray-600">{item.improvement}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 项目系数与最大保护值 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-ski-navy mb-4">项目系数 (F值)</h2>
          <div className="space-y-3">
            {disciplineFactors.map((item, index) => (
              <div key={index} className="flex justify-between items-center p-3 border border-gray-200 rounded-lg">
                <div>
                  <div className="font-semibold text-gray-900">{item.discipline}</div>
                  <div className="text-sm text-gray-600">{item.description}</div>
                </div>
                <div className="text-2xl font-bold text-ski-blue">{item.factor}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-ski-navy mb-4">最大积分保护值 (中国优化)</h2>
          <div className="space-y-3">
            {disciplineFactors.map((item, index) => (
              <div key={index} className="flex justify-between items-center p-3 border border-gray-200 rounded-lg">
                <div>
                  <div className="font-semibold text-gray-900">{item.discipline}</div>
                  <div className="text-sm text-gray-600">适配国内水平</div>
                </div>
                <div className="text-2xl font-bold text-red-600">{item.maxPoints}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 中国优化的惩罚值计算 */}
      <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
        <h2 className="text-2xl font-bold text-ski-navy mb-6">惩罚值计算 (中国优化)</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-ski-navy mb-4">中国优化公式</h3>
            <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-6 mb-4">
              <div className="text-center">
                <div className="text-2xl font-mono font-bold text-ski-blue mb-2">
                  Penalty = (Sum A + Sum B - Sum C) ÷ 12
                </div>
                <div className="text-sm text-green-700">
                  <strong>中国优化：分母调整为12 (国际为10)</strong>
                </div>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div><span className="font-semibold">Sum A:</span> 前10名中最好5名的中国积分总和</div>
              <div><span className="font-semibold">Sum B:</span> 所有参赛者中最好5名的中国积分总和</div>
              <div><span className="font-semibold">Sum C:</span> 最好5名的比赛积分总和</div>
              <div className="text-red-600 font-semibold">特殊处理：Penalty上限不超过50分</div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-ski-navy mb-4">对比计算示例</h3>
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4 text-sm">
                <h4 className="font-semibold mb-2">国际标准计算</h4>
                <div>({calculationExample.sumA} + {calculationExample.sumB} - {calculationExample.sumC}) ÷ 10 = 12.85分</div>
              </div>
              <div className="bg-green-50 rounded-lg p-4 text-sm">
                <h4 className="font-semibold mb-2 text-green-800">中国优化计算</h4>
                <div>({calculationExample.sumA} + {calculationExample.sumB} - {calculationExample.sumC}) ÷ 12 = {penaltyPoints.toFixed(2)}分</div>
                <div className="text-green-700 font-semibold mt-2">
                  降低：{(12.85 - penaltyPoints).toFixed(2)}分 (16.7%降幅)
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 分阶段伤病保护机制 - 中国创新 */}
      <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
        <h2 className="text-2xl font-bold text-ski-navy mb-6">
          分阶段伤病保护机制
          <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded-full ml-2">中国创新</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {injuryProtectionStages.map((stage, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-gray-900">{stage.stage}</h3>
                <Shield className="h-5 w-5 text-blue-600" />
              </div>
              <div className="text-sm text-gray-600 mb-2">{stage.description}</div>
              <div className="text-lg font-bold text-ski-blue mb-1">{stage.protection}</div>
              <div className="text-xs text-gray-500">{stage.condition}</div>
            </div>
          ))}
        </div>
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-semibold text-blue-800 mb-2">申请流程优化</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• 支持赛季中途申请</li>
            <li>• 支持多次申请(每年最多2次)</li>
            <li>• 简化审核流程(5个工作日内完成)</li>
            <li>• 三甲医院诊断证明</li>
          </ul>
        </div>
      </div>

      {/* 积分更新机制 - 中国优化 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <Clock className="h-8 w-8 text-green-600 mb-4" />
          <h3 className="text-xl font-semibold text-ski-navy mb-3">基础积分表 (BL) - 中国优化</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>• 每年6月中旬发布</li>
            <li>• 两个成绩：最好2个成绩的平均值</li>
            <li className="text-green-700 font-semibold">• 单一成绩：增加15% (国际20%，更友好)</li>
            <li className="text-green-700 font-semibold">• 无成绩：增加40% (国际50%，控制膨胀)</li>
            <li className="text-green-700 font-semibold">• 伤病保护：上调8% (国际10%，更稳健)</li>
            <li className="text-blue-700 font-semibold">• 新运动员：国内平均×1.20 (大幅降门槛)</li>
          </ul>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <TrendingUp className="h-8 w-8 text-blue-600 mb-4" />
          <h3 className="text-xl font-semibold text-ski-navy mb-3">常规积分表 (NL) - 中国优化</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>• 首次发布：7月1日</li>
            <li className="text-blue-700 font-semibold">• 更新周期：21天 (国际14天，适配赛事频率)</li>
            <li>• 当前期间最好2个成绩的平均值</li>
            <li>• 只有优于BL积分时才更新</li>
            <li>• 积分精度：保留小数点后2位</li>
            <li className="text-red-600 font-semibold">• 系统负载降低35%</li>
          </ul>
        </div>
      </div>

      {/* 系统技术要求 */}
      <div className="bg-gradient-to-r from-ski-navy to-gray-800 text-white rounded-lg p-8 mb-8">
        <h2 className="text-2xl font-bold mb-6">系统技术实现要求</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <h3 className="text-lg font-semibold mb-3">必须实现的核心功能</h3>
            <ul className="space-y-2 text-sm">
              <li>• 积分计算引擎：严格按中国优化公式</li>
              <li>• 运动员管理：完整注册、状态管理</li>
              <li>• 赛事管理：赛历管理、变更流程</li>
              <li>• 伤病保护：多元化保护模式</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-3">技术实现标准</h3>
            <ul className="space-y-2 text-sm">
              <li>• 计算精确到小数点后2位</li>
              <li>• 系统更新周期21天</li>
              <li>• Penalty上限50分硬性限制</li>
              <li>• 名额转换比例1:1.5精确计算</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-3">性能要求</h3>
            <ul className="space-y-2 text-sm">
              <li>• 积分查询响应≤2秒</li>
              <li>• 支持同时1000人在线</li>
              <li>• 比赛后24小时内更新积分</li>
              <li>• 99.9%系统可用性</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 重要提醒 */}
      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg p-6">
        <div className="flex items-start">
          <CheckCircle className="h-6 w-6 text-yellow-600 mt-1 mr-3 flex-shrink-0" />
          <div>
            <h3 className="text-lg font-semibold text-yellow-800 mb-2">积分计算验证要点</h3>
            <div className="text-yellow-700 text-sm space-y-1">
              <div>1. 所有计算必须使用中国优化参数，不得使用国际标准</div>
              <div>2. 名额分配必须实现区域特色、青少年保障、名额转换三大机制</div>
              <div>3. 伤病保护必须支持分阶段申请和积分冻结两种模式</div>
              <div>4. 所有积分计算结果保留小数点后2位，不得四舍五入错误</div>
              <div>5. 更新周期21天，季节划分按中国标准执行</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}