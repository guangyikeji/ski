import { FileText, Download, ExternalLink, Calculator, Clock, Award } from 'lucide-react'
import { getImagePath } from '@/utils/paths'

const ruleCategories = [
  {
    title: '积分计算规则',
    icon: Calculator,
    description: '详细的中国积分计算公式和方法',
    rules: [
      { name: '基础积分公式', description: 'P = F × (Tx/To - 1)', status: 'active' },
      { name: '项目系数表', description: '各项目的F系数值', status: 'active' },
      { name: '惩罚值计算', description: '比赛难度系数计算方法', status: 'active' },
      { name: '特殊情况处理', description: '并列、缺席等情况的处理', status: 'active' }
    ]
  },
  {
    title: '积分更新机制',
    icon: Clock,
    description: '积分表更新周期和规则',
    rules: [
      { name: '基础积分表(BL)', description: '每年6月发布的基础积分', status: 'active' },
      { name: '常规积分表(NL)', description: '赛季期间定期更新', status: 'active' },
      { name: '评估周期', description: '北半球和南半球的赛季周期', status: 'active' },
      { name: '伤病保护', description: '运动员伤病期间的积分保护', status: 'active' }
    ]
  },
  {
    title: '参赛资格',
    icon: Award,
    description: '运动员参赛资格和配额规则',
    rules: [
      { name: '配额分配', description: '各国运动员参赛配额计算', status: 'coming-soon' },
      { name: '年龄限制', description: '不同级别比赛的年龄要求', status: 'coming-soon' },
      { name: '积分门槛', description: '参加不同级别比赛的积分要求', status: 'coming-soon' },
      { name: '资格确认', description: '参赛资格的确认程序', status: 'coming-soon' }
    ]
  }
]

const downloadableRules = [
  {
    title: '中国积分规则2024-2025版',
    description: '完整的中国积分计算规则文档',
    size: '2.3 MB',
    format: 'PDF',
    language: '中英对照',
    url: '#'
  },
  {
    title: '高山滑雪竞赛规则',
    description: '中国滑雪协会高山滑雪竞赛规则',
    size: '5.8 MB',
    format: 'PDF',
    language: '中英对照',
    url: '#'
  },
  {
    title: '积分计算示例',
    description: '实际比赛积分计算案例',
    size: '1.2 MB',
    format: 'PDF',
    language: '中文',
    url: '#'
  }
]

export default function FISRulesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="section-title">FIS规则文档</h1>
        <p className="text-gray-600 text-lg">
          查看中国滑雪协会官方规则文档和积分计算规则，确保比赛的公平性和准确性
        </p>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="card text-center">
          <Calculator className="h-12 w-12 text-ski-blue mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-ski-navy mb-2">积分计算器</h3>
          <p className="text-gray-600 text-sm mb-4">在线计算比赛积分</p>
          <button className="btn-secondary text-sm w-full" disabled>
            即将上线
          </button>
        </div>
        <div className="card text-center">
          <FileText className="h-12 w-12 text-green-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-ski-navy mb-2">积分规则详解</h3>
          <p className="text-gray-600 text-sm mb-4">查看详细规则说明</p>
          <button className="btn-primary text-sm w-full">
            查看规则
          </button>
        </div>
        <div className="card text-center">
          <ExternalLink className="h-12 w-12 text-purple-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-ski-navy mb-2">FIS官网</h3>
          <p className="text-gray-600 text-sm mb-4">访问中国滑雪协会官网</p>
          <a
            href="https://www.fis-ski.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary text-sm w-full inline-block text-center"
          >
            访问官网
          </a>
        </div>
      </div>

      {/* Rule Categories */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-ski-navy mb-6">规则分类</h2>
        <div className="space-y-8">
          {ruleCategories.map((category, index) => (
            <div key={index} className="card">
              <div className="flex items-start mb-6">
                <div className="p-3 bg-ski-ice rounded-lg mr-4">
                  <category.icon className="h-6 w-6 text-ski-blue" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-ski-navy mb-2">
                    {category.title}
                  </h3>
                  <p className="text-gray-600">{category.description}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {category.rules.map((rule, ruleIndex) => (
                  <div
                    key={ruleIndex}
                    className={`p-4 border rounded-lg ${
                      rule.status === 'active'
                        ? 'border-green-200 bg-green-50'
                        : 'border-gray-200 bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900">{rule.name}</h4>
                      {rule.status === 'active' ? (
                        <span className="badge badge-active text-xs">可查看</span>
                      ) : (
                        <span className="badge badge-coming-soon text-xs">即将上线</span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{rule.description}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Downloadable Documents */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-ski-navy mb-6">规则文档下载</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {downloadableRules.map((doc, index) => (
            <div key={index} className="card">
              <div className="flex items-start mb-4">
                <FileText className="h-8 w-8 text-red-600 mr-3 flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">{doc.title}</h3>
                  <p className="text-sm text-gray-600">{doc.description}</p>
                </div>
              </div>

              <div className="space-y-2 text-sm text-gray-500 mb-4">
                <div className="flex justify-between">
                  <span>格式:</span>
                  <span>{doc.format}</span>
                </div>
                <div className="flex justify-between">
                  <span>大小:</span>
                  <span>{doc.size}</span>
                </div>
                <div className="flex justify-between">
                  <span>语言:</span>
                  <span>{doc.language}</span>
                </div>
              </div>

              <button className="btn-primary w-full text-sm flex items-center justify-center">
                <Download className="h-4 w-4 mr-2" />
                下载文档
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="card">
        <h2 className="text-2xl font-bold text-ski-navy mb-6">常见问题</h2>
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">
              Q: 中国积分是如何计算的？
            </h3>
            <p className="text-gray-600">
              A: 中国积分使用公式 P = F × (Tx/To - 1) 计算，其中P是积分，F是项目系数，
              Tx是选手时间，To是获胜者时间。不同项目有不同的F系数。
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-2">
              Q: 积分多长时间更新一次？
            </h3>
            <p className="text-gray-600">
              A: 中国积分每14天更新一次。基础积分表(BL)每年6月发布一次，
              常规积分表(NL)在赛季期间定期更新。
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-2">
              Q: 什么是惩罚值？
            </h3>
            <p className="text-gray-600">
              A: 惩罚值用于调整比赛难度。计算公式为：(Sum A + Sum B - Sum C) ÷ 10，
              其中Sum A、B、C分别代表参赛选手中最好选手的积分总和。
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-2">
              Q: 如何获得参赛资格？
            </h3>
            <p className="text-gray-600">
              A: 参赛资格基于运动员的中国积分和各国配额。不同级别的比赛有不同的积分门槛要求，
              具体要求请参考竞赛规则文档。
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}