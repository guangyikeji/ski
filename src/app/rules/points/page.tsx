'use client'

import { Calculator, TrendingUp, Clock, Award, FileText, CheckCircle, Users, Trophy } from 'lucide-react'

// 项目系数配置
const disciplineFactors = [
  { discipline: '速降 (DH)', factor: 1250, description: '高速技术项目，考验选手勇气与技术', maxPoints: 300 },
  { discipline: '回转 (SL)', factor: 730, description: '技术性项目，要求精准的转弯技巧', maxPoints: 150 },
  { discipline: '大回转 (GS)', factor: 1010, description: '速度与技术并重的经典项目', maxPoints: 200 },
  { discipline: '超级大回转 (SG)', factor: 1190, description: '高速大转弯技术项目', maxPoints: 250 },
  { discipline: '全能 (AC)', factor: 1360, description: '综合多项目的全能比拼', maxPoints: 250 }
]

// 计算步骤说明
const calculationSteps = [
  {
    step: 1,
    title: '比赛积分计算',
    formula: 'P = (F × Tx/To) - F',
    description: '根据选手成绩与冠军成绩的差距计算基础积分',
    icon: Calculator,
    detail: '选手用时越接近冠军用时，获得的积分越低（积分越好）'
  },
  {
    step: 2,
    title: '比赛难度调整',
    formula: '惩罚值 = (前5名积分总和) ÷ 参数',
    description: '根据参赛选手整体水平调整比赛难度系数',
    icon: TrendingUp,
    detail: '参赛选手水平越高，比赛难度系数越小'
  },
  {
    step: 3,
    title: '最终积分确定',
    formula: '最终积分 = 比赛积分 + 惩罚值',
    description: '结合个人成绩与比赛难度得出最终积分',
    icon: Award,
    detail: '积分数值越小表示成绩越好，0分为理论最佳'
  }
]

// 计算示例
const calculationExample = {
  winnerTime: 65.43,
  athleteTime: 67.89,
  disciplineFactor: 1010,
  penaltyValue: 12.50
}

// 积分更新规则
const updateRules = [
  {
    title: '基础积分表 (BL)',
    period: '每年6月发布',
    description: '基于运动员过去赛季的最佳成绩制定',
    features: [
      '反映运动员历史最佳水平',
      '作为赛季开始的参考基准',
      '考虑运动员状态变化',
      '包含伤病保护机制'
    ],
    icon: FileText,
    color: 'text-blue-600'
  },
  {
    title: '当前积分表 (NL)',
    period: '赛季中定期更新',
    description: '反映运动员当前状态的动态积分',
    features: [
      '实时反映竞技状态',
      '用于赛事资格认定',
      '影响参赛排序',
      '决定积分排名'
    ],
    icon: TrendingUp,
    color: 'text-green-600'
  }
]

export default function PointsRulesPage() {
  // 计算示例结果
  const racePoints = (calculationExample.disciplineFactor * calculationExample.athleteTime / calculationExample.winnerTime) - calculationExample.disciplineFactor
  const finalPoints = racePoints + calculationExample.penaltyValue

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-ski-navy mb-4">积分规则详解</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
          了解高山滑雪积分计算规则，掌握积分系统的运作机制，为参赛和训练提供科学指导
        </p>
      </div>

      {/* 核心公式展示 */}
      <div className="bg-gradient-to-r from-ski-blue to-primary-700 text-white rounded-lg p-8 mb-12">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">积分计算公式</h2>
          <div className="text-4xl font-mono font-bold mb-6 bg-white/20 rounded-lg py-4">
            P = (F × Tx/To) - F
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="bg-white/20 rounded-lg p-3">
              <div className="font-bold text-lg">P</div>
              <div>比赛积分</div>
            </div>
            <div className="bg-white/20 rounded-lg p-3">
              <div className="font-bold text-lg">F</div>
              <div>项目系数</div>
            </div>
            <div className="bg-white/20 rounded-lg p-3">
              <div className="font-bold text-lg">Tx</div>
              <div>选手用时</div>
            </div>
            <div className="bg-white/20 rounded-lg p-3">
              <div className="font-bold text-lg">To</div>
              <div>冠军用时</div>
            </div>
          </div>
          <p className="mt-4 text-gray-100">
            积分数值越小表示成绩越好，冠军理论积分为0分
          </p>
        </div>
      </div>

      {/* 计算步骤详解 */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-ski-navy mb-8 text-center">计算步骤详解</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {calculationSteps.map((step) => (
            <div key={step.step} className="bg-white rounded-lg shadow-lg p-6 text-center">
              <div className="w-12 h-12 bg-ski-blue text-white rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                {step.step}
              </div>
              <step.icon className="h-8 w-8 text-ski-blue mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-ski-navy mb-3">
                {step.title}
              </h3>
              <div className="bg-gray-50 rounded-lg p-3 mb-4">
                <code className="text-sm font-mono text-ski-blue">
                  {step.formula}
                </code>
              </div>
              <p className="text-gray-600 text-sm mb-3">
                {step.description}
              </p>
              <p className="text-gray-500 text-xs">
                {step.detail}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 计算示例 */}
      <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
        <h2 className="text-2xl font-bold text-ski-navy mb-6 text-center">计算示例</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-ski-navy mb-4">示例：大回转项目</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between p-3 bg-gray-50 rounded">
                <span>冠军用时：</span>
                <span className="font-bold">{calculationExample.winnerTime}秒</span>
              </div>
              <div className="flex justify-between p-3 bg-gray-50 rounded">
                <span>选手用时：</span>
                <span className="font-bold">{calculationExample.athleteTime}秒</span>
              </div>
              <div className="flex justify-between p-3 bg-gray-50 rounded">
                <span>项目系数：</span>
                <span className="font-bold">{calculationExample.disciplineFactor}</span>
              </div>
              <div className="flex justify-between p-3 bg-gray-50 rounded">
                <span>比赛难度调整：</span>
                <span className="font-bold">+{calculationExample.penaltyValue}分</span>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-ski-navy mb-4">计算过程</h3>
            <div className="bg-blue-50 rounded-lg p-4 text-sm space-y-2">
              <div>比赛积分 = ({calculationExample.disciplineFactor} × {calculationExample.athleteTime}/{calculationExample.winnerTime}) - {calculationExample.disciplineFactor}</div>
              <div>比赛积分 = {racePoints.toFixed(2)}分</div>
              <div>难度调整 = +{calculationExample.penaltyValue}分</div>
              <div className="font-bold text-ski-blue border-t pt-2">
                最终积分 = {finalPoints.toFixed(2)}分
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 项目系数说明 */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-ski-navy mb-8 text-center">各项目系数</h2>
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">项目名称</th>
                  <th className="text-center py-4 px-6 font-semibold text-gray-700">系数 (F)</th>
                  <th className="text-center py-4 px-6 font-semibold text-gray-700">最大保护值</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">项目特点</th>
                </tr>
              </thead>
              <tbody>
                {disciplineFactors.map((item, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-6 font-medium text-gray-900">
                      {item.discipline}
                    </td>
                    <td className="py-4 px-6 text-center">
                      <span className="text-2xl font-bold text-ski-blue">
                        {item.factor}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <span className="text-lg font-semibold text-red-600">
                        {item.maxPoints}分
                      </span>
                    </td>
                    <td className="py-4 px-6 text-gray-600">
                      {item.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 积分更新机制 */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-ski-navy mb-8 text-center">积分更新机制</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {updateRules.map((rule, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center mb-4">
                <rule.icon className={`h-8 w-8 ${rule.color} mr-3`} />
                <div>
                  <h3 className="text-xl font-semibold text-ski-navy">{rule.title}</h3>
                  <p className="text-sm text-gray-500">{rule.period}</p>
                </div>
              </div>
              <p className="text-gray-600 mb-4">{rule.description}</p>
              <ul className="space-y-2">
                {rule.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* 积分应用场景 */}
      <div className="bg-gradient-to-r from-ski-navy to-gray-800 text-white rounded-lg p-8 mb-12">
        <h2 className="text-3xl font-bold mb-8 text-center">积分的应用</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <Users className="h-12 w-12 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-3">参赛资格</h3>
            <p className="text-gray-300 text-sm">
              根据积分确定运动员参加重要赛事的资格和排序
            </p>
          </div>
          <div className="text-center">
            <Trophy className="h-12 w-12 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-3">实力评估</h3>
            <p className="text-gray-300 text-sm">
              客观反映运动员的竞技水平和发展趋势
            </p>
          </div>
          <div className="text-center">
            <Award className="h-12 w-12 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-3">训练指导</h3>
            <p className="text-gray-300 text-sm">
              为教练员制定训练计划提供科学的数据支撑
            </p>
          </div>
        </div>
      </div>

      {/* 注意事项 */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-800 mb-4">积分规则要点</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-700">
          <div>
            <h4 className="font-semibold mb-2">积分特点</h4>
            <ul className="space-y-1">
              <li>• 积分越低表示成绩越好</li>
              <li>• 冠军理论积分为0分</li>
              <li>• 考虑比赛难度差异</li>
              <li>• 反映真实竞技水平</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">更新周期</h4>
            <ul className="space-y-1">
              <li>• 基础积分表：每年6月发布</li>
              <li>• 当前积分表：赛季中定期更新</li>
              <li>• 积分精度：保留2位小数</li>
              <li>• 有效期：当前赛季内有效</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}