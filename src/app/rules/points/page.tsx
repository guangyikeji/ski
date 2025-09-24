'use client'

import { Calculator, TrendingUp, Clock, Award, FileText, CheckCircle, Users, Trophy, Star, Target, Zap, Medal, Crown, Gift } from 'lucide-react'

// v2.0项目系数配置
const disciplineFactors = [
  { discipline: '速降 (DH)', factor: 1250, description: '高速技术项目，考验选手勇气与技术', maxPoints: 300 },
  { discipline: '回转 (SL)', factor: 730, description: '技术性项目，要求精准的转弯技巧', maxPoints: 150 },
  { discipline: '大回转 (GS)', factor: 1010, description: '速度与技术并重的经典项目', maxPoints: 200 },
  { discipline: '超级大回转 (SG)', factor: 1190, description: '高速大转弯技术项目', maxPoints: 250 },
  { discipline: '全能 (AC)', factor: 1360, description: '综合多项目的全能比拼', maxPoints: 250 }
]

// v2.0赛事等级系统
const eventLevels = [
  { level: 'A级', name: '全国锦标赛、冬运会', coefficient: 1.0, color: 'text-red-600', bgColor: 'bg-red-50', description: '国家级顶级赛事，影响力最大' },
  { level: 'B级', name: '青年冠军赛、巡回赛分站', coefficient: 0.8, color: 'text-orange-600', bgColor: 'bg-orange-50', description: '省部级重要赛事，竞技水平高' },
  { level: 'C级', name: '省级锦标赛、区域邀请赛', coefficient: 0.6, color: 'text-yellow-600', bgColor: 'bg-yellow-50', description: '区域性赛事，参与面广' },
  { level: 'D级', name: '市级比赛、俱乐部赛事', coefficient: 0.4, color: 'text-green-600', bgColor: 'bg-green-50', description: '基层赛事，培养新人' }
]

// v2.0青少年年龄组体系
const youthGroups = [
  { group: 'U10', name: '10岁以下组', coefficient: 0.40, progressBonus: 3.0, color: 'text-purple-600', description: '启蒙阶段，重在兴趣培养' },
  { group: 'U12', name: '12岁以下组', coefficient: 0.55, progressBonus: 2.5, color: 'text-indigo-600', description: '基础阶段，技术动作学习' },
  { group: 'U15', name: '15岁以下组', coefficient: 0.70, progressBonus: 2.0, color: 'text-blue-600', description: '发展阶段，竞技意识培养' },
  { group: 'U18', name: '18岁以下组', coefficient: 0.85, progressBonus: 1.5, color: 'text-cyan-600', description: '提高阶段，专项技能强化' },
  { group: 'U21', name: '21岁以下组', coefficient: 0.95, progressBonus: 1.0, color: 'text-teal-600', description: '成熟阶段，向成年组过渡' },
  { group: '成年', name: '成年组', coefficient: 1.0, progressBonus: 0, color: 'text-gray-600', description: '最高竞技水平，完全积分' }
]

// v2.0附加分激励体系
const bonusTypes = [
  {
    category: '突破类奖励',
    icon: Target,
    color: 'text-red-600',
    items: [
      { name: '刷新个人最佳', points: 5, description: '在该项目中创造个人历史最好成绩' },
      { name: '项目首次完赛', points: 3, description: '首次在该项目中完成比赛' },
      { name: '年度进步奖', points: 8, description: '年度积分提升超过30%' }
    ]
  },
  {
    category: '连续完赛奖励',
    icon: Zap,
    color: 'text-orange-600',
    items: [
      { name: '单日双项完赛', points: 3, description: '同一天完成两个项目的比赛' },
      { name: '连续两站全勤', points: 5, description: '连续参加两站比赛并完赛' },
      { name: '赛季全勤奖', points: 10, description: '参加赛季80%以上的赛事' }
    ]
  },
  {
    category: '战胜高手奖励',
    icon: Crown,
    color: 'text-purple-600',
    items: [
      { name: '战胜高积分选手', points: '动态', description: '(对手积分-自己积分)/100×赛事系数' },
      { name: '最高奖励限制', points: '10分', description: '单场比赛战胜高手最高可获得10分' }
    ]
  }
]

// v2.0人数系数精确分档
const participantCoefficients = [
  { range: '8-15人', coefficient: 0.8, description: '小规模比赛' },
  { range: '16-31人', coefficient: 1.0, description: '标准规模比赛' },
  { range: '32-63人', coefficient: 1.1, description: '中大规模比赛' },
  { range: '64-127人', coefficient: 1.2, description: '大规模比赛' },
  { range: '128-255人', coefficient: 1.3, description: '超大规模比赛' },
  { range: '256人以上', coefficient: 1.4, description: '顶级规模比赛' }
]

export default function PointsRulesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-ski-navy mb-4">
          中国高山滑雪赛事积分规则 v2.0
        </h1>
        <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
          全面升级的综合积分体系，包含多重系数计算、青少年分层管理、附加分激励机制，
          为中国高山滑雪运动发展提供科学、公平、激励性的积分标准
        </p>
        <div className="flex justify-center items-center space-x-4 mt-4 text-sm text-gray-500">
          <span className="flex items-center">
            <Award className="h-4 w-4 mr-1" />
            官方v2.0标准
          </span>
          <span className="flex items-center">
            <Users className="h-4 w-4 mr-1" />
            青少年分层体系
          </span>
          <span className="flex items-center">
            <Gift className="h-4 w-4 mr-1" />
            附加分激励
          </span>
        </div>
      </div>

      {/* v2.0核心公式展示 */}
      <div className="bg-gradient-to-r from-ski-blue to-primary-700 text-white rounded-lg p-8 mb-12">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">v2.0综合积分计算公式</h2>
          <div className="text-2xl font-mono font-bold mb-6 bg-white/20 rounded-lg py-4">
            总积分 = 基础积分 × 赛事系数 × 质量系数 × 人数系数 + 附加分
          </div>
          <div className="text-lg mb-4 opacity-90">
            Comprehensive Points = Basic Points × Event Coeff × Quality Coeff × Participant Coeff + Bonus
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-sm">
            <div className="bg-white/20 rounded-lg p-3">
              <div className="font-bold text-lg">基础积分</div>
              <div>F×(Tx/To)-F</div>
            </div>
            <div className="bg-white/20 rounded-lg p-3">
              <div className="font-bold text-lg">赛事系数</div>
              <div>A级1.0~D级0.4</div>
            </div>
            <div className="bg-white/20 rounded-lg p-3">
              <div className="font-bold text-lg">质量系数</div>
              <div>1+(前8名均分/500)</div>
            </div>
            <div className="bg-white/20 rounded-lg p-3">
              <div className="font-bold text-lg">人数系数</div>
              <div>0.8~1.4精确分档</div>
            </div>
            <div className="bg-white/20 rounded-lg p-3">
              <div className="font-bold text-lg">附加分</div>
              <div>激励机制</div>
            </div>
          </div>
        </div>
      </div>

      {/* 青少年专用公式 */}
      <div className="bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-lg p-6 mb-12">
        <h3 className="text-2xl font-bold mb-4 text-center">青少年最终积分公式</h3>
        <div className="text-xl font-mono font-bold text-center bg-white/20 rounded-lg py-3">
          青少年积分 = 综合积分 × 年龄系数 + 进步奖励分
        </div>
        <p className="text-center mt-3 opacity-90">
          U10(×0.40) → U12(×0.55) → U15(×0.70) → U18(×0.85) → U21(×0.95) → 成年(×1.0)
        </p>
      </div>

      {/* 赛事等级系统 */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-ski-navy mb-8 text-center">赛事等级系统</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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

      {/* 青少年分层体系 */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-ski-navy mb-8 text-center">青少年分层积分体系</h2>
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">年龄组别</th>
                  <th className="text-center py-4 px-6 font-semibold text-gray-700">积分系数</th>
                  <th className="text-center py-4 px-6 font-semibold text-gray-700">进步奖励</th>
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
                    <td className="py-4 px-6 text-center">
                      <span className={`text-2xl font-bold ${group.color}`}>
                        ×{group.coefficient}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <span className="text-lg font-semibold text-orange-600">
                        +{group.progressBonus}分
                      </span>
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
          <h4 className="font-semibold text-blue-800 mb-2">青少年积分优势</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-blue-700">
            <div>• 降低参赛门槛，鼓励积极参与</div>
            <div>• 差异化培养，尊重成长规律</div>
            <div>• 进步奖励机制，激发提升动力</div>
          </div>
        </div>
      </div>

      {/* 附加分激励体系 */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-ski-navy mb-8 text-center">附加分激励体系</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {bonusTypes.map((category, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center mb-6">
                <category.icon className={`h-8 w-8 ${category.color} mr-3`} />
                <h3 className="text-xl font-semibold text-ski-navy">{category.category}</h3>
              </div>
              <div className="space-y-4">
                {category.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">{item.name}</div>
                      <div className="text-sm text-gray-600">{item.description}</div>
                    </div>
                    <div className={`text-lg font-bold ${category.color} ml-3`}>
                      +{item.points}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 人数系数精确分档 */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-ski-navy mb-8 text-center">人数系数精确分档</h2>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {participantCoefficients.map((item, index) => (
              <div key={index} className="text-center p-4 bg-gradient-to-b from-gray-50 to-gray-100 rounded-lg">
                <div className="text-sm text-gray-600 mb-1">{item.range}</div>
                <div className="text-2xl font-bold text-ski-blue mb-1">×{item.coefficient}</div>
                <div className="text-xs text-gray-500">{item.description}</div>
              </div>
            ))}
          </div>
          <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
            <p className="text-sm text-yellow-800">
              <strong>系数说明：</strong>参赛人数越多，比赛竞争越激烈，人数系数越高，最终积分权重越大。
              体现了大规模赛事的高含金量和竞技价值。
            </p>
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

      {/* 24个月滚动积分机制 */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg p-8 mb-12">
        <h2 className="text-3xl font-bold mb-6 text-center">24个月滚动积分机制</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
          <div className="bg-white/20 rounded-lg p-4">
            <div className="text-2xl font-bold mb-2">0-6个月</div>
            <div className="text-lg mb-1">100%权重</div>
            <div className="text-sm opacity-90">最新成绩，完全计入</div>
          </div>
          <div className="bg-white/20 rounded-lg p-4">
            <div className="text-2xl font-bold mb-2">7-12个月</div>
            <div className="text-lg mb-1">90%权重</div>
            <div className="text-sm opacity-90">较新成绩，高权重</div>
          </div>
          <div className="bg-white/20 rounded-lg p-4">
            <div className="text-2xl font-bold mb-2">13-18个月</div>
            <div className="text-lg mb-1">80%权重</div>
            <div className="text-sm opacity-90">中期成绩，中权重</div>
          </div>
          <div className="bg-white/20 rounded-lg p-4">
            <div className="text-2xl font-bold mb-2">19-24个月</div>
            <div className="text-lg mb-1">70%权重</div>
            <div className="text-sm opacity-90">较旧成绩，低权重</div>
          </div>
        </div>
        <div className="mt-6 text-center">
          <p className="text-lg opacity-90">
            <strong>核心原则：</strong>最好8场成绩计入最终积分，其中A/B级赛事最多5场，C/D级赛事最多3场
          </p>
        </div>
      </div>

      {/* v2.0技术革新 */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-ski-navy mb-8 text-center">v2.0技术革新</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <Calculator className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-ski-navy mb-3">多重系数计算</h3>
            <p className="text-sm text-gray-600">
              赛事等级、比赛质量、参赛人数全面考虑，积分更加科学准确
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <Users className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-ski-navy mb-3">分层培养体系</h3>
            <p className="text-sm text-gray-600">
              U10-U21五个年龄组，差异化积分系数，尊重青少年成长规律
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <Award className="h-12 w-12 text-yellow-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-ski-navy mb-3">激励机制升级</h3>
            <p className="text-sm text-gray-600">
              突破、连续完赛、战胜高手三大类附加分，激发参赛积极性
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <TrendingUp className="h-12 w-12 text-purple-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-ski-navy mb-3">动态权重管理</h3>
            <p className="text-sm text-gray-600">
              24个月滚动积分，时间权重衰减，最新成绩更具价值
            </p>
          </div>
        </div>
      </div>

      {/* 积分应用场景 */}
      <div className="bg-gradient-to-r from-ski-navy to-gray-800 text-white rounded-lg p-8 mb-12">
        <h2 className="text-3xl font-bold mb-8 text-center">v2.0积分体系应用</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <Trophy className="h-12 w-12 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-3">参赛资格认定</h3>
            <p className="text-gray-300 text-sm">
              基于综合积分确定重要赛事参赛资格，青少年享受特殊政策支持
            </p>
          </div>
          <div className="text-center">
            <Star className="h-12 w-12 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-3">俱乐部评级</h3>
            <p className="text-gray-300 text-sm">
              基于运动员综合积分进行俱乐部五星级评定和资源配置
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
        <h3 className="text-lg font-semibold text-blue-800 mb-4">v2.0规则要点</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-blue-700">
          <div>
            <h4 className="font-semibold mb-2">🎯 计算原则</h4>
            <ul className="space-y-1">
              <li>• 综合积分 = 基础积分×系数+附加分</li>
              <li>• 青少年积分 = 综合积分×年龄系数</li>
              <li>• 积分越低表示成绩越好</li>
              <li>• 所有结果保留2位小数</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">⏰ 时间管理</h4>
            <ul className="space-y-1">
              <li>• 24个月滚动积分机制</li>
              <li>• 最新成绩权重最高</li>
              <li>• 最好8场成绩计入</li>
              <li>• 21天积分更新周期</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">🏆 特色功能</h4>
            <ul className="space-y-1">
              <li>• U10组免注册费政策</li>
              <li>• 三大类附加分激励</li>
              <li>• 俱乐部五星评级体系</li>
              <li>• 动态质量系数调整</li>
            </ul>
          </div>
        </div>
        <div className="mt-6 p-4 bg-blue-100 rounded-lg">
          <p className="text-blue-800 text-sm">
            <strong>🚀 v2.0升级亮点：</strong>
            相比v1.x版本，新增青少年分层体系、多重系数计算、附加分激励机制、24个月滚动积分等核心功能，
            全面提升了积分体系的科学性、公平性和激励性，为中国高山滑雪运动发展提供更强有力的技术支撑。
          </p>
        </div>
      </div>
    </div>
  )
}