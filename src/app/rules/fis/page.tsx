import { FileText, Download, ExternalLink, Calculator, Clock, Award } from 'lucide-react'
import { getImagePath } from '@/utils/paths'

const ruleCategories = [
  {
    title: '中国高山滑雪积分规则 v4.0',
    icon: Calculator,
    description: '简化的v4.0积分计算体系，去除复杂系数，提高透明度',
    rules: [
      { name: '简化计算公式', description: '最终积分 = (基础积分 + 判罚分) × 赛事系数', status: 'active' },
      { name: '项目系数表', description: '各项目的F系数值（v4.0标准）', status: 'active' },
      { name: '判罚分计算', description: '(Sum A + Sum B - Sum C) ÷ 10', status: 'active' },
      { name: '赛事级别系数', description: 'A级1.0、B级0.6、C级0.3', status: 'active' }
    ]
  },
  {
    title: '青少年体系 (根据v4.docx)',
    icon: Clock,
    description: 'U12-U21四个年龄组，完善人才培养体系',
    rules: [
      { name: 'U12组别', description: '12岁以下，发展积分，仅作记录和比较', status: 'active' },
      { name: 'U15组别', description: '15岁以下，正式积分计算', status: 'active' },
      { name: 'U18/U21组别', description: '正式积分，逐步过渡到成年组', status: 'active' },
      { name: '分阶段培养', description: '尊重青少年发展规律', status: 'active' }
    ]
  },
  {
    title: '赛事管理 v4.0',
    icon: Award,
    description: '简化的赛事分级和管理流程',
    rules: [
      { name: '三级赛事体系', description: 'A/B/C三级赛事分类体系', status: 'active' },
      { name: '赛事系数设定', description: 'A级(1.0)、B级(0.6)、C级(0.3)', status: 'active' },
      { name: '积分有效期', description: '积分的有效期管理', status: 'active' },
      { name: '最大积分值', description: '各项目最大积分保护值', status: 'active' }
    ]
  }
]

const downloadableRules = [
  {
    title: '中国高山滑雪赛事积分规则 v4.0',
    description: '全新简化的v4.0积分计算规则文档',
    size: '1.8 MB',
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

export default function ChinaSkiRulesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="section-title">中国高山滑雪积分规则 v4.0</h1>
        <p className="text-gray-600 text-lg">
          查看最新的v4.0简化积分规则文档，了解三步计算公式和扩展青少年体系
        </p>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="card text-center">
          <Calculator className="h-12 w-12 text-ski-blue mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-ski-navy mb-2">v4.0积分计算器</h3>
          <p className="text-gray-600 text-sm mb-4">使用简化公式计算积分</p>
          <a href="/points/calculator" className="btn-primary text-sm w-full inline-block text-center">
            使用计算器
          </a>
        </div>
        <div className="card text-center">
          <FileText className="h-12 w-12 text-green-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-ski-navy mb-2">v4.0规则详解</h3>
          <p className="text-gray-600 text-sm mb-4">查看v4.0简化规则说明</p>
          <a href="/rules/points" className="btn-primary text-sm w-full inline-block text-center">
            查看v4.0规则
          </a>
        </div>
        <div className="card text-center">
          <ExternalLink className="h-12 w-12 text-purple-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-ski-navy mb-2">中国滑雪协会</h3>
          <p className="text-gray-600 text-sm mb-4">访问中国滑雪协会官网</p>
          <a
            href="https://www.csa.org.cn"
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
              Q: v4.0积分是如何计算的？
            </h3>
            <p className="text-gray-600">
              A: v4.0使用简化的三步计算公式：最终积分 = (基础比赛积分 + 判罚分) × 赛事系数。
              基础积分使用 P = F × (Tx/To - 1)，去除了复杂的质量系数、人数系数等要素。
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-2">
              Q: v4.0的赛事级别是如何划分的？
            </h3>
            <p className="text-gray-600">
              A: v4.0采用三级赛事体系：A级赛事（系数1.0，全国锦标赛、冬运会等）、
              B级赛事（系数0.6，省级锦标赛等）、C级赛事（系数0.3，地市级赛事）。
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-2">
              Q: v4.0青少年体系有什么特点？
            </h3>
            <p className="text-gray-600">
              A: v4.0扩展了青少年年龄组别，新增了U10、U12、U21组别，
              实现U10-U21全年龄段覆盖，为青少年发展提供更好的支持。
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-2">
              Q: v4.0相比v2.0有什么优势？
            </h3>
            <p className="text-gray-600">
              A: v4.0简化了计算流程，去除了质量系数、人数系数、附加分等复杂要素，
              提高了计算效率和透明度，同时扩展了青少年体系，更加高效、透明。
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}