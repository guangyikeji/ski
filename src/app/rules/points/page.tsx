import { Calculator, TrendingUp, Users, Clock, Award, FileText } from 'lucide-react'
import { getImagePath } from '@/utils/paths'

const disciplineFactors = [
  { discipline: '速降 (DH)', factor: 1250, description: '高速度项目，技术要求高' },
  { discipline: '回转 (SL)', factor: 730, description: '技术性强，转弯密集' },
  { discipline: '大回转 (GS)', factor: 1010, description: '速度与技术的平衡' },
  { discipline: '超级大回转 (SG)', factor: 1190, description: '高速技术项目' },
  { discipline: '全能 (AC)', factor: 1360, description: '综合项目积分' }
]

const maxPoints = [
  { discipline: '速降 (DH)', maxPoints: 330, usage: '缺乏足够FIS积分选手时使用' },
  { discipline: '超级大回转 (SG)', maxPoints: 270, usage: '缺乏足够FIS积分选手时使用' },
  { discipline: '回转 (SL)', maxPoints: 165, usage: '缺乏足够FIS积分选手时使用' },
  { discipline: '大回转 (GS)', maxPoints: 220, usage: '缺乏足够FIS积分选手时使用' },
  { discipline: '全能 (AC)', maxPoints: 270, usage: '缺乏足够FIS积分选手时使用' }
]

const calculationSteps = [
  {
    step: 1,
    title: '比赛积分计算',
    formula: 'P = F × (Tx/To - 1)',
    description: '使用获胜者时间和选手时间计算基础积分',
    icon: Calculator
  },
  {
    step: 2,
    title: '惩罚值计算',
    formula: '(Sum A + Sum B - Sum C) ÷ 10',
    description: '基于参赛选手实力计算比赛难度系数',
    icon: TrendingUp
  },
  {
    step: 3,
    title: '最终积分',
    formula: '比赛积分 + 惩罚值',
    description: '得到选手在该场比赛的最终积分',
    icon: Award
  }
]

export default function PointsRulesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
      {/* 背景装饰 */}
      <div className="absolute top-10 right-10 w-36 h-36 opacity-15 rounded-full overflow-hidden">
        <img
          src={getImagePath("/images/ski-bg.jpg")}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute bottom-20 left-10 w-32 h-32 opacity-15 rounded-full overflow-hidden">
        <img
          src={getImagePath("/images/giant-slalom.jpg")}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute top-1/2 right-1/4 w-24 h-24 opacity-10 rounded-full overflow-hidden">
        <img
          src={getImagePath("/images/ski-action-2.jpg")}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
      {/* Header */}
      <div className="mb-8 relative z-10">
        <h1 className="section-title">积分规则详解</h1>
        <p className="text-gray-600 text-lg">
          详细解读FIS积分计算规则，包括公式说明、计算步骤和特殊情况处理
        </p>
      </div>

      {/* Core Formula */}
      <div className="card mb-8 bg-gradient-to-r from-ski-blue to-primary-700 text-white relative z-10">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">核心计算公式</h2>
          <div className="text-3xl font-mono font-bold mb-4">
            P = F × (Tx/To - 1)
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <div className="font-semibold">P</div>
              <div>比赛积分</div>
            </div>
            <div>
              <div className="font-semibold">F</div>
              <div>项目系数</div>
            </div>
            <div>
              <div className="font-semibold">Tx</div>
              <div>选手时间</div>
            </div>
            <div>
              <div className="font-semibold">To</div>
              <div>获胜者时间</div>
            </div>
          </div>
        </div>
      </div>

      {/* Calculation Steps */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-ski-navy mb-6">计算步骤</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {calculationSteps.map((step) => (
            <div key={step.step} className="card text-center">
              <div className="w-12 h-12 bg-ski-blue text-white rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                {step.step}
              </div>
              <step.icon className="h-8 w-8 text-ski-blue mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-ski-navy mb-2">
                {step.title}
              </h3>
              <div className="bg-gray-50 rounded-lg p-3 mb-3">
                <code className="text-sm font-mono text-ski-blue">
                  {step.formula}
                </code>
              </div>
              <p className="text-sm text-gray-600">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Discipline Factors */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-ski-navy mb-6">项目系数 (F值)</h2>
        <div className="card">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">项目</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">系数 (F)</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">特点</th>
                </tr>
              </thead>
              <tbody>
                {disciplineFactors.map((item, index) => (
                  <tr key={index} className="border-b border-gray-100">
                    <td className="py-4 px-4 font-medium text-gray-900">
                      {item.discipline}
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-2xl font-bold text-ski-blue">
                        {item.factor}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-gray-600">
                      {item.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Max Points */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-ski-navy mb-6">最大积分值限制</h2>
        <div className="card">
          <p className="text-gray-600 mb-6">
            当缺乏足够FIS积分的选手参赛时，使用以下最大值进行计算：
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {maxPoints.map((item, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900">
                    {item.discipline}
                  </h3>
                  <span className="text-xl font-bold text-red-600">
                    {item.maxPoints}
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  {item.usage}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Penalty Calculation */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-ski-navy mb-6">惩罚值计算详解</h2>
        <div className="card">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-ski-navy mb-4">计算公式</h3>
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <code className="text-lg font-mono text-ski-blue">
                  惩罚值 = (Sum A + Sum B - Sum C) ÷ 10
                </code>
              </div>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="font-semibold">Sum A:</span> 前10名中最好5名选手的FIS积分总和
                </div>
                <div>
                  <span className="font-semibold">Sum B:</span> 所有参赛选手中最好5名的FIS积分总和
                </div>
                <div>
                  <span className="font-semibold">Sum C:</span> 最好5名选手的比赛积分总和
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-ski-navy mb-4">计算示例</h3>
              <div className="bg-blue-50 rounded-lg p-4 text-sm">
                <div className="space-y-2">
                  <div><span className="font-semibold">Sum A:</span> 45.2 + 47.8 + 52.1 + 55.3 + 58.7 = 259.1</div>
                  <div><span className="font-semibold">Sum B:</span> 45.2 + 47.8 + 52.1 + 55.3 + 58.7 = 259.1</div>
                  <div><span className="font-semibold">Sum C:</span> 0 + 15.2 + 28.6 + 35.1 + 42.3 = 121.2</div>
                  <hr className="my-2" />
                  <div className="font-semibold">
                    惩罚值 = (259.1 + 259.1 - 121.2) ÷ 10 = 39.7
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Point List Updates */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-ski-navy mb-6">积分表更新机制</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="card">
            <Clock className="h-8 w-8 text-green-600 mb-4" />
            <h3 className="text-lg font-semibold text-ski-navy mb-3">基础积分表 (BL)</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• 每年6月中旬发布</li>
              <li>• 基于过去赛季最好2个成绩的平均值</li>
              <li>• 单一成绩：增加20% (+标记)</li>
              <li>• 无成绩：在之前BL基础上增加50% ({'>'}标记)</li>
              <li>• 伤病保护：BL积分上调10% (#标记)</li>
            </ul>
          </div>
          <div className="card">
            <TrendingUp className="h-8 w-8 text-blue-600 mb-4" />
            <h3 className="text-lg font-semibold text-ski-navy mb-3">常规积分表 (NL)</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• 首次发布：7月1日</li>
              <li>• 赛季期间定期更新（每14天）</li>
              <li>• 基于当前期间最好2个成绩的平均值</li>
              <li>• 只有优于BL积分时才更新</li>
              <li>• 实时反映运动员当前状态</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Special Cases */}
      <div className="card">
        <h2 className="text-2xl font-bold text-ski-navy mb-6">特殊情况处理</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-ski-navy mb-4">积分状态标记</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <span className="w-8 h-6 bg-green-100 text-green-800 text-xs font-bold rounded flex items-center justify-center">+</span>
                <span className="text-sm">仅有一次成绩，增加20%</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="w-8 h-6 bg-yellow-100 text-yellow-800 text-xs font-bold rounded flex items-center justify-center">{'>'}</span>
                <span className="text-sm">无成绩，在之前BL基础上增加50%</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="w-8 h-6 bg-blue-100 text-blue-800 text-xs font-bold rounded flex items-center justify-center">#</span>
                <span className="text-sm">伤病保护，BL积分上调10%</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="w-8 h-6 bg-purple-100 text-purple-800 text-xs font-bold rounded flex items-center justify-center">C</span>
                <span className="text-sm">积分确认，退役选手4个赛季有效</span>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-ski-navy mb-4">并列情况处理</h3>
            <div className="space-y-3 text-sm text-gray-600">
              <div>
                <span className="font-semibold">第10名并列：</span>
                所有并列选手都参与惩罚值计算
              </div>
              <div>
                <span className="font-semibold">第5好FIS积分并列：</span>
                选择比赛积分更高者参与计算
              </div>
              <div>
                <span className="font-semibold">积分舍入：</span>
                0.0004向下舍入，0.0005向上舍入
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}