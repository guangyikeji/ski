'use client'

import { Trophy, Users, Clock, Shield, Award, CheckCircle, AlertTriangle, FileText } from 'lucide-react'

// 比赛项目介绍
const projectIntroductions = [
  {
    name: '回转(SL)',
    description: '技术性项目，考验选手精准转弯技巧',
    features: [
      '密集旗门设置，要求快速反应',
      '分两轮比赛，综合成绩排名',
      '最能体现滑雪技术水平',
      '适合技术型选手参与'
    ],
    icon: Trophy,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50'
  },
  {
    name: '大回转(GS)',
    description: '速度与技术并重的经典项目',
    features: [
      '旗门间距适中，节奏感强',
      '需要良好的技术基础',
      '比赛观赏性较高',
      '新手进阶的理想选择'
    ],
    icon: Award,
    color: 'text-green-600',
    bgColor: 'bg-green-50'
  },
  {
    name: '超级大回转(SG)',
    description: '高速大转弯技术项目',
    features: [
      '强调高速滑行能力',
      '赛道变化丰富多样',
      '考验选手适应能力',
      '单轮决胜负'
    ],
    icon: Clock,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50'
  },
  {
    name: '速降(DH)',
    description: '极限速度挑战项目',
    features: [
      '追求极限速度体验',
      '最具挑战性和刺激感',
      '对勇气和技术要求极高',
      '滑雪运动的巅峰挑战'
    ],
    icon: Shield,
    color: 'text-red-600',
    bgColor: 'bg-red-50'
  }
]

// 参赛指南
const participationGuide = [
  {
    title: '报名参赛',
    steps: [
      '在线注册平台账号',
      '完善个人基本信息',
      '上传健康证明文件',
      '选择合适的比赛项目',
      '缴纳相应报名费用'
    ],
    icon: Users,
    color: 'text-blue-600'
  },
  {
    title: '技术准备',
    steps: [
      '提升个人滑雪技术水平',
      '熟悉比赛项目特点',
      '参加训练营或培训',
      '准备合规的装备器材',
      '了解安全注意事项'
    ],
    icon: Trophy,
    color: 'text-green-600'
  },
  {
    title: '比赛当天',
    steps: [
      '提前到达比赛现场',
      '完成装备检查登记',
      '参加赛前技术说明',
      '按序号完成比赛',
      '关注成绩公布情况'
    ],
    icon: Clock,
    color: 'text-purple-600'
  },
  {
    title: '赛后流程',
    steps: [
      '查看个人比赛成绩',
      '了解积分变化情况',
      '参加颁奖仪式',
      '总结比赛经验心得',
      '规划下次参赛计划'
    ],
    icon: Award,
    color: 'text-orange-600'
  }
]

// 年龄分组说明 (扩展青少年体系)
const ageGroups = [
  { group: 'U12组别', age: '12岁以下', description: '基础阶段，技术动作学习和规范化训练（发展积分）' },
  { group: 'U15组别', age: '15岁以下', description: '发展阶段，竞技意识培养和技能提升（正式积分）' },
  { group: 'U18组别', age: '18岁以下', description: '提高阶段，专项技能强化和技术完善（正式积分）' },
  { group: 'U21组别', age: '21岁以下', description: '成熟阶段，向成年组过渡和适应高水平竞技（正式积分）' },
  { group: '成年组', age: '22岁以上', description: '最高竞技水平，技术成熟竞争激烈' }
]

export default function CompetitionRulesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-ski-navy mb-4">中国高山滑雪竞赛规则</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
          了解最新竞赛规则和扩展青少年体系，为您的滑雪竞赛之旅提供官方指导
        </p>
      </div>

      {/* 赛事概览 */}
      <div className="bg-gradient-to-r from-ski-blue to-primary-700 text-white rounded-lg p-8 mb-12">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">高山滑雪竞赛项目</h2>
          <p className="text-xl mb-6 text-gray-100">
            包含技术项目和速度项目，满足不同水平选手的参赛需求
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="bg-white/20 rounded-lg p-3">
              <div className="font-bold text-lg">回转(SL)</div>
              <div>技术项目</div>
            </div>
            <div className="bg-white/20 rounded-lg p-3">
              <div className="font-bold text-lg">大回转(GS)</div>
              <div>技术项目</div>
            </div>
            <div className="bg-white/20 rounded-lg p-3">
              <div className="font-bold text-lg">超大(SG)</div>
              <div>速度项目</div>
            </div>
            <div className="bg-white/20 rounded-lg p-3">
              <div className="font-bold text-lg">速降(DH)</div>
              <div>速度项目</div>
            </div>
          </div>
        </div>
      </div>

      {/* 比赛项目详解 */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-ski-navy mb-8 text-center">比赛项目介绍</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projectIntroductions.map((project, index) => (
            <div key={index} className={`bg-white rounded-lg shadow-lg p-6 border-l-4 border-${project.color.split('-')[1]}-500`}>
              <div className="flex items-center mb-4">
                <div className={`w-12 h-12 ${project.bgColor} rounded-lg flex items-center justify-center mr-4`}>
                  <project.icon className={`h-6 w-6 ${project.color}`} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-ski-navy">{project.name}</h3>
                  <p className="text-gray-600">{project.description}</p>
                </div>
              </div>
              <ul className="space-y-2">
                {project.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-sm text-gray-700">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* 参赛指南 */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-ski-navy mb-8 text-center">参赛指南</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {participationGuide.map((guide, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
                  <guide.icon className={`h-6 w-6 ${guide.color}`} />
                </div>
                <h3 className="text-lg font-semibold text-ski-navy">{guide.title}</h3>
              </div>
              <ol className="space-y-2">
                {guide.steps.map((step, stepIndex) => (
                  <li key={stepIndex} className="flex items-start text-sm text-gray-700">
                    <span className={`inline-block w-5 h-5 rounded-full text-xs text-white flex items-center justify-center mr-2 mt-0.5 flex-shrink-0 ${guide.color.replace('text-', 'bg-')}`}>
                      {stepIndex + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </div>

      {/* 年龄分组 */}
      <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
        <h2 className="text-2xl font-bold text-ski-navy mb-6 text-center">扩展青少年体系</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-4 px-6 font-semibold text-gray-700">组别名称</th>
                <th className="text-center py-4 px-6 font-semibold text-gray-700">年龄范围</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700">组别特点</th>
              </tr>
            </thead>
            <tbody>
              {ageGroups.map((group, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-6 font-medium text-gray-900">{group.group}</td>
                  <td className="py-4 px-6 text-center">
                    <span className="text-lg font-bold text-ski-blue">{group.age}</span>
                  </td>
                  <td className="py-4 px-6 text-gray-600">{group.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 安全与规范 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center mb-4">
            <Shield className="h-8 w-8 text-red-600 mr-3" />
            <h3 className="text-xl font-semibold text-ski-navy">安全要求</h3>
          </div>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
              <span>佩戴合规的滑雪头盔和护具</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
              <span>使用检验合格的滑雪板和固定器</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
              <span>提供有效的健康体检证明</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
              <span>购买合适的运动意外保险</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
              <span>遵守赛场纪律和安全规定</span>
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center mb-4">
            <FileText className="h-8 w-8 text-blue-600 mr-3" />
            <h3 className="text-xl font-semibold text-ski-navy">技术规范</h3>
          </div>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
              <span>按照指定路线完成滑行</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
              <span>不得漏门或故意撞门</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
              <span>尊重裁判员的现场判决</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
              <span>展现良好的体育道德风尚</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
              <span>服从赛事组织管理安排</span>
            </li>
          </ul>
        </div>
      </div>

      {/* 常见问题 */}
      <div className="bg-gradient-to-r from-ski-navy to-gray-800 text-white rounded-lg p-8 mb-12">
        <h2 className="text-3xl font-bold mb-8 text-center">常见问题解答</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Q: 如何选择适合的比赛项目？</h3>
            <p className="text-gray-300 text-sm mb-6">
              根据个人技术水平和兴趣选择。新手建议从大回转开始，技术型选手可尝试回转，喜欢速度感的选手可选择速降项目。
            </p>

            <h3 className="text-xl font-semibold mb-4">Q: 参赛需要哪些基本条件？</h3>
            <p className="text-gray-300 text-sm">
              需要具备基本的滑雪技能，通过平台注册认证，提供健康证明，购买保险，并缴纳相应的报名费用。
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Q: 积分是如何计算的？</h3>
            <p className="text-gray-300 text-sm mb-6">
              采用简化的三步计算公式：最终积分 = (基础积分 + 判罚分) × 赛事系数。去除了复杂的质量系数和人数系数。
            </p>

            <h3 className="text-xl font-semibold mb-4">Q: 如何提升竞技水平？</h3>
            <p className="text-gray-300 text-sm">
              建议多参加训练营，观摩高水平比赛，加强体能训练，并在实战中不断积累经验和改进技术。
            </p>
          </div>
        </div>
      </div>

      {/* 联系方式 */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-800 mb-4">需要帮助？</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-700">
          <div>
            <h4 className="font-semibold mb-2">技术咨询</h4>
            <ul className="space-y-1">
              <li>• 比赛规则解读</li>
              <li>• 技术要求说明</li>
              <li>• 装备规范指导</li>
              <li>• 安全注意事项</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">报名服务</h4>
            <ul className="space-y-1">
              <li>• 在线报名指导</li>
              <li>• 资格审查流程</li>
              <li>• 费用缴纳方式</li>
              <li>• 赛程安排查询</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}