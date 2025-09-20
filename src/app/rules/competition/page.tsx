'use client'

import { useState } from 'react'
import { getImagePath } from '@/utils/paths'
import {
  BookOpen,
  Search,
  ChevronDown,
  ChevronRight,
  Users,
  Trophy,
  Clock,
  AlertTriangle,
  FileText,
  CheckCircle,
  Download
} from 'lucide-react'

interface RuleSection {
  id: string
  title: string
  content: string
  subsections?: RuleSection[]
}

const competitionRules: RuleSection[] = [
  {
    id: '100',
    title: '总则',
    content: '本规则适用于所有高山滑雪竞赛活动，包括但不限于全国锦标赛、地区性比赛、青少年比赛等。',
    subsections: [
      {
        id: '101',
        title: '规则适用范围',
        content: '本规则适用于中华人民共和国境内举办的所有高山滑雪竞赛活动，包括全国性比赛、地区性比赛、俱乐部比赛以及青少年比赛。'
      },
      {
        id: '102',
        title: '组织机构',
        content: '中国滑雪协会为国内高山滑雪竞赛的最高管理机构，负责制定竞赛规则、认证裁判员、管理运动员注册等工作。'
      },
      {
        id: '103',
        title: '规则修订',
        content: '本规则每两年修订一次，由技术委员会提出修订草案，经中国滑雪协会理事会审议通过后实施。'
      }
    ]
  },
  {
    id: '200',
    title: '参赛资格',
    content: '参赛运动员必须满足年龄、技术水平、健康状况等基本要求。',
    subsections: [
      {
        id: '201',
        title: '年龄分组',
        content: '运动员按以下年龄分组：\n• 少年乙组：14-15岁\n• 少年甲组：16-17岁\n• 青年组：18-20岁\n• 成年组：21岁及以上\n• 老将组：40岁及以上'
      },
      {
        id: '202',
        title: '技术等级要求',
        content: '参加全国性比赛的运动员必须达到相应的技术等级：\n• 全国锦标赛：运动健将及以上\n• 全国冠军赛：一级运动员及以上\n• 地区性比赛：二级运动员及以上'
      },
      {
        id: '203',
        title: '健康证明',
        content: '所有参赛运动员必须提供一年内的体检证明，确认身体健康，适合参加高山滑雪运动。未满18岁的运动员还需提供监护人同意书。'
      },
      {
        id: '204',
        title: '注册要求',
        content: '参赛运动员必须在中国滑雪协会注册，持有有效的运动员证。外籍运动员需要通过其所在国家的滑雪协会申请参赛。'
      }
    ]
  },
  {
    id: '300',
    title: '比赛项目',
    content: '高山滑雪比赛包括回转、大回转、超级大回转、速降和全能等项目。',
    subsections: [
      {
        id: '301',
        title: '回转(SL)',
        content: '回转是技术性最强的项目，要求运动员在密集的旗门间快速转弯。比赛分两轮进行，以两轮成绩之和排名。旗门数：男子55-75个，女子45-65个。'
      },
      {
        id: '302',
        title: '大回转(GS)',
        content: '大回转是速度与技术的结合，旗门间距较回转更大。比赛分两轮进行，赛道垂直落差：男子250-400米，女子250-350米。'
      },
      {
        id: '303',
        title: '超级大回转(SG)',
        content: '超级大回转强调高速滑行能力，只进行一轮比赛。赛道设置要求有节奏变化，包括跳跃、压缩和方向变化等元素。'
      },
      {
        id: '304',
        title: '速降(DH)',
        content: '速降是最具挑战性的项目，追求极限速度。比赛只进行一轮，赛道垂直落差：男子800-1100米，女子500-800米。'
      },
      {
        id: '305',
        title: '全能(AC)',
        content: '全能比赛包括一个速度项目(速降或超级大回转)和一个技术项目(回转或大回转)，以两个项目成绩之和排名。'
      }
    ]
  },
  {
    id: '400',
    title: '赛道要求',
    content: '比赛赛道必须符合安全性、技术性和挑战性的要求。',
    subsections: [
      {
        id: '401',
        title: '赛道认证',
        content: '承办重要比赛的雪场赛道必须通过中国滑雪协会认证。认证内容包括：雪道等级、安全措施、救援设施、计时设备等。'
      },
      {
        id: '402',
        title: '安全防护',
        content: '赛道必须设置充足的防护网、防护垫等安全设施。危险区域需要设置明显的警示标志，并配备专业救援人员。'
      },
      {
        id: '403',
        title: '雪况要求',
        content: '比赛要求雪况良好，雪面坚实。如遇恶劣天气，技术代表有权推迟或取消比赛。雪道宽度：回转最少30米，大回转最少40米。'
      }
    ]
  },
  {
    id: '500',
    title: '裁判与仲裁',
    content: '比赛设置技术代表、裁判长、计时长等关键岗位。',
    subsections: [
      {
        id: '501',
        title: '裁判员资质',
        content: '担任全国性比赛的裁判员必须持有中国滑雪协会颁发的相应等级裁判员证书，并参加年度培训和考核。'
      },
      {
        id: '502',
        title: '技术代表职责',
        content: '技术代表负责比赛的技术组织工作，包括：检查赛道条件、审核参赛资格、监督比赛进行、处理技术争议等。'
      },
      {
        id: '503',
        title: '申诉程序',
        content: '对比赛结果有异议的，可在成绩公布后30分钟内向仲裁委员会提出书面申诉，并缴纳申诉费。申诉处理需在1小时内完成。'
      }
    ]
  },
  {
    id: '600',
    title: '违规与处罚',
    content: '对违反竞赛规则的行为，将根据情节轻重给予相应处罚。',
    subsections: [
      {
        id: '601',
        title: '技术违规',
        content: '漏门、撞门、不按规定路线滑行等技术违规将被取消成绩。恶意违规或危及他人安全的行为将面临更严厉的处罚。'
      },
      {
        id: '602',
        title: '纪律违规',
        content: '对裁判员无礼、干扰比赛进行、违反体育道德等行为，将给予警告、禁赛或取消参赛资格等处罚。'
      },
      {
        id: '603',
        title: '兴奋剂违规',
        content: '严禁使用兴奋剂。一经查实，将取消所有成绩，并按照反兴奋剂条例给予禁赛处罚。'
      }
    ]
  }
]

export default function CompetitionRulesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [expandedSections, setExpandedSections] = useState<string[]>(['100'])

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev =>
      prev.includes(sectionId)
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    )
  }

  const filteredRules = competitionRules.filter(rule => {
    const searchLower = searchTerm.toLowerCase()
    return rule.title.toLowerCase().includes(searchLower) ||
           rule.content.toLowerCase().includes(searchLower) ||
           rule.subsections?.some(sub =>
             sub.title.toLowerCase().includes(searchLower) ||
             sub.content.toLowerCase().includes(searchLower)
           )
  })

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
      {/* 背景装饰 */}
      <div className="absolute top-0 right-0 w-40 h-40 opacity-15 rounded-full overflow-hidden">
        <img src={getImagePath("/images/ski-action-2.jpg")} alt="" className="w-full h-full object-cover" />
      </div>
      <div className="absolute bottom-20 left-10 w-32 h-32 opacity-15 rounded-full overflow-hidden">
        <img src={getImagePath("/images/giant-slalom.jpg")} alt="" className="w-full h-full object-cover" />
      </div>

      {/* Header */}
      <div className="text-center mb-8 relative z-10">
        <h1 className="section-title">竞赛规则</h1>
        <p className="text-gray-600 text-lg">
          高山滑雪竞赛组织管理和执行规范
        </p>
      </div>

      {/* 快速导航和统计 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8 relative z-10">
        <div className="card text-center">
          <FileText className="h-8 w-8 text-ski-blue mx-auto mb-2" />
          <div className="text-2xl font-bold text-ski-navy">6</div>
          <div className="text-sm text-gray-600">主要章节</div>
        </div>
        <div className="card text-center">
          <Users className="h-8 w-8 text-green-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-ski-navy">5</div>
          <div className="text-sm text-gray-600">比赛项目</div>
        </div>
        <div className="card text-center">
          <Trophy className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-ski-navy">4</div>
          <div className="text-sm text-gray-600">年龄组别</div>
        </div>
        <div className="card text-center">
          <CheckCircle className="h-8 w-8 text-purple-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-ski-navy">2024</div>
          <div className="text-sm text-gray-600">当前版本</div>
        </div>
      </div>

      {/* 搜索功能 */}
      <div className="card mb-8 relative z-10">
        <div className="flex items-center space-x-4">
          <div className="relative flex-1 max-w-md">
            <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="搜索规则内容..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ski-blue"
            />
          </div>
          <button className="btn-secondary flex items-center">
            <Download className="h-4 w-4 mr-2" />
            下载PDF
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 relative z-10">
        {/* 目录导航 */}
        <div className="lg:col-span-1">
          <div className="card sticky top-8">
            <h3 className="text-lg font-semibold text-ski-navy mb-4 flex items-center">
              <BookOpen className="h-5 w-5 mr-2" />
              规则目录
            </h3>
            <nav className="space-y-2">
              {competitionRules.map((section) => (
                <div key={section.id}>
                  <button
                    onClick={() => toggleSection(section.id)}
                    className="w-full text-left p-2 rounded hover:bg-gray-50 flex items-center justify-between"
                  >
                    <span className="text-sm font-medium text-gray-700">
                      {section.id}. {section.title}
                    </span>
                    {expandedSections.includes(section.id) ? (
                      <ChevronDown className="h-4 w-4 text-gray-400" />
                    ) : (
                      <ChevronRight className="h-4 w-4 text-gray-400" />
                    )}
                  </button>
                  {expandedSections.includes(section.id) && section.subsections && (
                    <div className="ml-4 mt-2 space-y-1">
                      {section.subsections.map((subsection) => (
                        <a
                          key={subsection.id}
                          href={`#section-${subsection.id}`}
                          className="block p-1 text-xs text-gray-600 hover:text-ski-blue rounded hover:bg-gray-50"
                        >
                          {subsection.id}. {subsection.title}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>
        </div>

        {/* 规则内容 */}
        <div className="lg:col-span-3">
          <div className="space-y-8">
            {filteredRules.map((section) => (
              <div key={section.id} className="card">
                <div
                  id={`section-${section.id}`}
                  className="flex items-center mb-4 cursor-pointer"
                  onClick={() => toggleSection(section.id)}
                >
                  <h2 className="text-2xl font-bold text-ski-navy">
                    {section.id}. {section.title}
                  </h2>
                  {expandedSections.includes(section.id) ? (
                    <ChevronDown className="h-6 w-6 text-gray-400 ml-2" />
                  ) : (
                    <ChevronRight className="h-6 w-6 text-gray-400 ml-2" />
                  )}
                </div>

                {expandedSections.includes(section.id) && (
                  <div>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                      {section.content}
                    </p>

                    {section.subsections && (
                      <div className="space-y-6">
                        {section.subsections.map((subsection) => (
                          <div
                            key={subsection.id}
                            id={`section-${subsection.id}`}
                            className="border-l-4 border-ski-blue pl-6"
                          >
                            <h3 className="text-lg font-semibold text-ski-navy mb-3">
                              {subsection.id}. {subsection.title}
                            </h3>
                            <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                              {subsection.content}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* 重要提醒 */}
          <div className="card mt-8 bg-yellow-50 border border-yellow-200">
            <div className="flex items-start">
              <AlertTriangle className="h-6 w-6 text-yellow-600 mr-3 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-yellow-800 mb-2">重要提醒</h3>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>• 本规则为2024年版本，如有更新请以最新版本为准</li>
                  <li>• 参赛前请仔细阅读相关规则，确保符合参赛要求</li>
                  <li>• 如有疑问请联系中国滑雪协会技术委员会</li>
                  <li>• 所有参赛者必须严格遵守竞赛规则和体育道德</li>
                </ul>
              </div>
            </div>
          </div>

          {/* 相关链接 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="card text-center hover:shadow-lg transition-shadow duration-200 cursor-pointer">
              <Trophy className="h-12 w-12 text-ski-blue mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-ski-navy mb-2">FIS积分规则</h3>
              <p className="text-sm text-gray-600">了解国际雪联积分计算规则</p>
            </div>

            <div className="card text-center hover:shadow-lg transition-shadow duration-200 cursor-pointer">
              <Users className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-ski-navy mb-2">运动员注册</h3>
              <p className="text-sm text-gray-600">查看运动员注册要求和流程</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}