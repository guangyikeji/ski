'use client'

import { Calculator, TrendingUp, Clock, Award, FileText, CheckCircle, Users, Trophy, Star, Target, Zap, Medal, Crown, Gift } from 'lucide-react'

// v4.0项目系数配置
const disciplineFactors = [
  { discipline: '速降 (DH)', factor: 1250, description: '高速技术项目，考验选手勇气与技术', maxPoints: 330 },
  { discipline: '回转 (SL)', factor: 730, description: '技术性项目，要求精准的转弯技巧', maxPoints: 165 },
  { discipline: '大回转 (GS)', factor: 1010, description: '速度与技术并重的经典项目', maxPoints: 220 },
  { discipline: '超级大回转 (SG)', factor: 1190, description: '高速大转弯技术项目', maxPoints: 270 },
  { discipline: '全能 (AC)', factor: 1360, description: '综合多项目的全能比拼', maxPoints: 270 }
]

// v4.0赛事等级系统
const eventLevels = [
  { level: 'A级', name: '全国锦标赛、冬运会等', coefficient: 1.0, color: 'text-red-600', bgColor: 'bg-red-50', description: '国家级顶级赛事，影响力最大' },
  { level: 'B级', name: '省级锦标赛、区域邀请赛等', coefficient: 0.6, color: 'text-orange-600', bgColor: 'bg-orange-50', description: '区域性重要赛事，竞技水平较高' },
  { level: 'C级', name: '地市级赛事等', coefficient: 0.3, color: 'text-yellow-600', bgColor: 'bg-yellow-50', description: '基层赛事，培养新人' }
]

// 青少年年龄组体系（根据v4.docx官方文档）
const youthGroups = [
  { group: 'U12', name: '12岁以下组', color: 'text-indigo-600', description: '基础阶段，发展积分，仅作记录和比较' },
  { group: 'U15', name: '15岁以下组', color: 'text-blue-600', description: '发展阶段，正式积分计算，竞技意识培养' },
  { group: 'U18', name: '18岁以下组', color: 'text-cyan-600', description: '提高阶段，正式积分计算，专项技能强化' },
  { group: 'U21', name: '21岁以下组', color: 'text-teal-600', description: '成熟阶段，正式积分计算，向成年组过渡' },
  { group: '成年', name: '成年组', color: 'text-gray-600', description: '最高竞技水平，完整积分计算体系' }
}

// v4.0基础公式组件
const formulaComponents = [
  {
    component: '基础比赛积分',
    formula: 'P = F × (Tx/To - 1)',
    description: 'F=项目系数, Tx=运动员用时, To=冠军用时',
    color: 'text-blue-600',
    icon: Calculator
  },
  {
    component: '判罚分',
    formula: '(Sum A + Sum B - Sum C) ÷ 10',
    description: 'Sum A=前10名最好5名积分总和, Sum B=全体最好5名积分总和, Sum C=最好5名比赛积分总和',
    color: 'text-orange-600',
    icon: Target
  },
  {
    component: '赛事系数',
    formula: 'A级1.0, B级0.6, C级0.3',
    description: '根据赛事的级别和重要性确定系数',
    color: 'text-green-600',
    icon: Trophy
  }
]

// v4.0计算示例
const calculationExample = {
  scenario: 'B级大回转比赛示例',
  winnerTime: 65.43,
  competitorTime: 67.89,
  disciplineFactor: 1010,
  eventCoefficient: 0.6,
  penalty: 0,
  steps: [
    { step: 1, description: '计算基础比赛积分', calculation: 'P = 1010 × (67.89/65.43 - 1) = 38.00分' },
    { step: 2, description: '加上判罚分', calculation: '假设判罚分 = 0分' },
    { step: 3, description: '乘以赛事系数', calculation: '最终积分 = (38.00 + 0) × 0.6 = 22.80分' }
  ]
}

export default function PointsRulesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-ski-navy mb-4">
          中国高山滑雪赛事积分规则
        </h1>
        <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
          全新简化的积分计算体系，基于国际先进经验，结合中国实际情况，
          为中国高山滑雪运动发展提供科学、公平、高效的积分标准
        </p>
        <div className="flex justify-center items-center space-x-4 mt-4 text-sm text-gray-500">
          <span className="flex items-center">
            <Award className="h-4 w-4 mr-1" />
官方最新标准
          </span>
          <span className="flex items-center">
            <Users className="h-4 w-4 mr-1" />
            扩展青少年体系
          </span>
          <span className="flex items-center">
            <Calculator className="h-4 w-4 mr-1" />
            简化计算公式
          </span>
        </div>
      </div>

      {/* v4.0核心公式展示 */}
      <div className="bg-gradient-to-r from-ski-blue to-primary-700 text-white rounded-lg p-8 mb-12">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">简化积分计算公式</h2>
          <div className="text-2xl font-mono font-bold mb-6 bg-white/20 rounded-lg py-4">
            最终积分 = (基础比赛积分 + 判罚分) × 赛事系数
          </div>
          <div className="text-lg mb-4 opacity-90">
            Final Points = (Base Race Points + Penalty) × Event Coefficient
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="bg-white/20 rounded-lg p-4">
              <div className="font-bold text-lg">基础比赛积分</div>
              <div>P = F × (Tx/To - 1)</div>
              <div className="text-xs opacity-80 mt-1">F=项目系数, Tx=运动员用时, To=冠军用时</div>
            </div>
            <div className="bg-white/20 rounded-lg p-4">
              <div className="font-bold text-lg">判罚分</div>
              <div>(Sum A + Sum B - Sum C) ÷ 10</div>
              <div className="text-xs opacity-80 mt-1">基于前10名和全体选手最好5名积分计算</div>
            </div>
            <div className="bg-white/20 rounded-lg p-4">
              <div className="font-bold text-lg">赛事系数</div>
              <div>A级1.0, B级0.6, C级0.3</div>
              <div className="text-xs opacity-80 mt-1">根据赛事级别确定系数</div>
            </div>
          </div>
        </div>
      </div>

      {/* v4.0青少年体系说明 */}
      <div className="bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-lg p-6 mb-12">
        <h3 className="text-2xl font-bold mb-4 text-center">扩展青少年体系</h3>
        <div className="text-center">
          <p className="text-lg opacity-90 mb-3">
最新规则扩展了青少年年龄组别，增加了U10、U12、U21组别
          </p>
          <p className="text-base opacity-80">
            完整年龄组：U10 → U12 → U15 → U18 → U21 → 成年组
          </p>
        </div>
      </div>

      {/* 赛事等级系统 */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-ski-navy mb-8 text-center">赛事等级系统</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {eventLevels.map((event, index) => (
            <div key={index} className={`${event.bgColor} rounded-lg p-6 text-center`}>
              <div className={`text-3xl font-bold ${event.color} mb-2`}>
                {event.level}
              </div>
              <div className="text-lg font-semibold text-gray-800 mb-2">
                系数 ×{event.coefficient}
              </div>
              <div className="text-sm font-medium text-gray-700 mb-3">
                {event.name}
              </div>
              <div className="text-xs text-gray-600">
                {event.description}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 青少年体系介绍 */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-ski-navy mb-8 text-center">扩展青少年体系</h2>
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">年龄组别</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">培养目标</th>
                </tr>
              </thead>
              <tbody>
                {youthGroups.map((group, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-6">
                      <div className="flex items-center">
                        <div className={`w-3 h-3 rounded-full ${group.color.replace('text-', 'bg-')} mr-3`}></div>
                        <div>
                          <div className="font-bold text-gray-900">{group.group}</div>
                          <div className="text-sm text-gray-600">{group.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-gray-600 text-sm">
                      {group.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-semibold text-blue-800 mb-2">青少年体系特点</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-blue-700">
            <div>• 扩展至U10-U21全年龄段覆盖</div>
            <div>• 分阶段培养，尊重发展规律</div>
            <div>• 简化管理，提高参与积极性</div>
          </div>
        </div>
      </div>

      {/* 公式组件详解 */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-ski-navy mb-8 text-center">公式组件详解</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {formulaComponents.map((component, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center mb-6">
                <component.icon className={`h-8 w-8 ${component.color} mr-3`} />
                <h3 className="text-xl font-semibold text-ski-navy">{component.component}</h3>
              </div>
              <div className="space-y-4">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="font-mono text-lg font-bold text-gray-900 mb-2">
                    {component.formula}
                  </div>
                  <div className="text-sm text-gray-600">
                    {component.description}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 计算示例 */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-ski-navy mb-8 text-center">计算示例</h2>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-semibold text-ski-navy mb-6 text-center">
            {calculationExample.scenario}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-3">
              <div className="text-sm text-gray-600">比赛数据</div>
              <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                <div>冠军用时: {calculationExample.winnerTime}秒</div>
                <div>运动员用时: {calculationExample.competitorTime}秒</div>
                <div>项目系数(GS): {calculationExample.disciplineFactor}</div>
                <div>赛事系数(B级): {calculationExample.eventCoefficient}</div>
                <div>判罚分: {calculationExample.penalty}分</div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="text-sm text-gray-600">计算步骤</div>
              <div className="space-y-3">
                {calculationExample.steps.map((step, index) => (
                  <div key={index} className="bg-blue-50 rounded-lg p-3">
                    <div className="text-sm font-semibold text-blue-800 mb-1">
                      步骤 {step.step}: {step.description}
                    </div>
                    <div className="text-sm text-blue-600 font-mono">
                      {step.calculation}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-lg font-bold text-green-800">
              最终结果: 该运动员获得 22.80 分
            </div>
            <div className="text-sm text-green-600 mt-1">
              积分越低表示成绩越好
            </div>
          </div>
        </div>
      </div>

      {/* 项目系数详情 */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-ski-navy mb-8 text-center">各项目系数详情</h2>
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">项目名称</th>
                  <th className="text-center py-4 px-6 font-semibold text-gray-700">系数 (F)</th>
                  <th className="text-center py-4 px-6 font-semibold text-gray-700">最大积分值</th>
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

      {/* v4.0核心特点 */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-ski-navy mb-8 text-center">最新规则特点</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <Calculator className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-ski-navy mb-3">简化计算</h3>
            <p className="text-sm text-gray-600">
              三步计算公式，去除复杂系数，提高计算效率和透明度
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <Users className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-ski-navy mb-3">扩展体系</h3>
            <p className="text-sm text-gray-600">
              U10-U21完整年龄组覆盖，为青少年发展提供全程支持
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <Target className="h-12 w-12 text-orange-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-ski-navy mb-3">标准化</h3>
            <p className="text-sm text-gray-600">
              统一标准，与国际接轨，确保积分的科学性和权威性
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <Trophy className="h-12 w-12 text-purple-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-ski-navy mb-3">公平竞争</h3>
            <p className="text-sm text-gray-600">
              三级赛事体系，合理的系数设置，保证不同级别赛事的公平性
            </p>
          </div>
        </div>
      </div>

      {/* 积分应用场景 */}
      <div className="bg-gradient-to-r from-ski-navy to-gray-800 text-white rounded-lg p-8 mb-12">
        <h2 className="text-3xl font-bold mb-8 text-center">积分应用场景</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <Trophy className="h-12 w-12 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-3">参赛资格认定</h3>
            <p className="text-gray-300 text-sm">
基于最新积分规则确定重要赛事参赛资格，青少年享受扩展政策支持
            </p>
          </div>
          <div className="text-center">
            <Star className="h-12 w-12 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-3">运动员排名</h3>
            <p className="text-gray-300 text-sm">
              基于统一标准的积分排名系统，客观反映运动员竞技水平
            </p>
          </div>
          <div className="text-center">
            <Medal className="h-12 w-12 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-3">人才选拔培养</h3>
            <p className="text-gray-300 text-sm">
              为各级国家队选拔和青少年培养计划提供科学数据支撑
            </p>
          </div>
        </div>
      </div>

      {/* 重要规则说明 */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-800 mb-4">规则要点</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-blue-700">
          <div>
            <h4 className="font-semibold mb-2">🎯 计算原则</h4>
            <ul className="space-y-1">
              <li>• 最终积分 = (基础积分 + 判罚分) × 系数</li>
              <li>• 基础积分 = F × (Tx/To - 1)</li>
              <li>• 积分越低表示成绩越好</li>
              <li>• 所有结果保留2位小数</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">🏆 赛事分级</h4>
            <ul className="space-y-1">
              <li>• A级赛事：系数1.0</li>
              <li>• B级赛事：系数0.6</li>
              <li>• C级赛事：系数0.3</li>
              <li>• 三级体系，简化管理</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">👶 青少年支持</h4>
            <ul className="space-y-1">
              <li>• U10-U21全年龄段覆盖</li>
              <li>• 分阶段培养目标设定</li>
              <li>• 简化参赛流程和要求</li>
              <li>• 鼓励青少年积极参与</li>
            </ul>
          </div>
        </div>
        <div className="mt-6 p-4 bg-blue-100 rounded-lg">
          <p className="text-blue-800 text-sm">
            <strong>🚀 亮点介绍：</strong>
            相比以前复杂的体系，最新规则简化了计算流程，去除了质量系数、人数系数、附加分等复杂要素，
            采用三步计算法，同时扩展了青少年年龄组体系，为中国高山滑雪运动发展提供更加高效、透明的技术支撑。
          </p>
        </div>
      </div>
    </div>
  )
}