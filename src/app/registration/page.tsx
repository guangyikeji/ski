'use client'

import { useState } from 'react'
import { getImagePath } from '@/utils/paths'
import {
  UserPlus,
  Calendar,
  MapPin,
  Clock,
  DollarSign,
  FileText,
  CheckCircle,
  AlertCircle,
  Users,
  Trophy,
  CreditCard,
  Upload,
  Download,
  Info,
  Star,
  Target,
  Shield
} from 'lucide-react'

// 模拟可报名比赛数据
const availableCompetitions = [
  {
    id: 1,
    name: '2024全国高山滑雪锦标赛',
    date: '2024-12-20',
    location: '长白山万达滑雪场',
    discipline: '大回转',
    level: 'national',
    fee: 800,
    deadline: '2024-12-18',
    maxParticipants: 150,
    currentParticipants: 87,
    requirements: ['FIS积分小于100', '年满18周岁', '有效保险'],
    status: 'open',
    image: '/images/ski-bg.jpg'
  },
  {
    id: 2,
    name: '北京市青少年滑雪公开赛',
    date: '2024-12-25',
    location: '北京南山滑雪场',
    discipline: '回转',
    level: 'youth',
    fee: 300,
    deadline: '2024-12-23',
    maxParticipants: 100,
    currentParticipants: 45,
    requirements: ['16-25周岁', '持有滑雪证书', '监护人同意书'],
    status: 'open',
    image: '/images/giant-slalom.jpg'
  },
  {
    id: 3,
    name: '张家口滑雪邀请赛',
    date: '2024-12-30',
    location: '崇礼云顶滑雪场',
    discipline: '超级大回转',
    level: 'invitational',
    fee: 500,
    deadline: '2024-12-28',
    maxParticipants: 80,
    currentParticipants: 76,
    requirements: ['邀请函', 'FIS积分证明', '专业装备'],
    status: 'almost_full',
    image: '/images/ski-action-2.jpg'
  }
]

const registrationSteps = [
  {
    step: 1,
    title: '选择比赛',
    description: '浏览可报名的比赛，查看详细信息',
    icon: Trophy,
    status: 'completed'
  },
  {
    step: 2,
    title: '填写信息',
    description: '完善个人资料和参赛信息',
    icon: UserPlus,
    status: 'current'
  },
  {
    step: 3,
    title: '资格审查',
    description: '系统验证参赛资格和材料',
    icon: Shield,
    status: 'pending'
  },
  {
    step: 4,
    title: '缴费确认',
    description: '支付报名费用，完成报名',
    icon: CreditCard,
    status: 'pending'
  }
]

const statusConfig = {
  open: { label: '开放报名', color: 'bg-green-100 text-green-800', icon: CheckCircle },
  almost_full: { label: '即将满员', color: 'bg-yellow-100 text-yellow-800', icon: AlertCircle },
  full: { label: '已满员', color: 'bg-red-100 text-red-800', icon: AlertCircle },
  closed: { label: '报名截止', color: 'bg-gray-100 text-gray-800', icon: Clock }
}

export default function RegistrationPage() {
  const [selectedCompetition, setSelectedCompetition] = useState<number | null>(null)
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    personalInfo: {
      name: '',
      gender: '',
      age: '',
      nationality: 'CHN',
      region: '',
      fisCode: '',
      phone: '',
      email: '',
      emergencyContact: '',
      emergencyPhone: ''
    },
    competitionInfo: {
      discipline: '',
      club: '',
      coach: '',
      experience: '',
      bestResult: '',
      medicalConditions: ''
    },
    documents: {
      idCard: null,
      fisLicense: null,
      insurance: null,
      medicalCert: null,
      guardianConsent: null
    }
  })

  const handleCompetitionSelect = (competitionId: number) => {
    setSelectedCompetition(competitionId)
    setCurrentStep(2)
  }

  const getStepStatus = (stepNumber: number) => {
    if (stepNumber < currentStep) return 'completed'
    if (stepNumber === currentStep) return 'current'
    return 'pending'
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
      {/* 背景装饰 */}
      <div className="absolute top-0 right-0 w-40 h-40 opacity-15 rounded-full overflow-hidden">
        <img
          src={getImagePath("/images/skiing-2.jpg")}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute bottom-20 left-10 w-32 h-32 opacity-15 rounded-full overflow-hidden">
        <img
          src={getImagePath("/images/ski-action-2.jpg")}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute top-1/3 left-1/2 w-24 h-24 opacity-10 rounded-full overflow-hidden">
        <img
          src={getImagePath("/images/ski-action-2.jpg")}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      {/* Header */}
      <div className="text-center mb-8 relative z-10">
        <h1 className="section-title">在线报名</h1>
        <p className="text-gray-600 text-lg">
          便捷的赛事报名平台，一站式完成比赛注册和资格验证
        </p>
      </div>

      {/* 进度指示器 */}
      <div className="card mb-8 relative z-10">
        <div className="flex items-center justify-between">
          {registrationSteps.map((step, index) => {
            const status = getStepStatus(step.step)
            const isCompleted = status === 'completed'
            const isCurrent = status === 'current'

            return (
              <div key={step.step} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 ${
                    isCompleted ? 'bg-green-500 border-green-500 text-white' :
                    isCurrent ? 'bg-ski-blue border-ski-blue text-white' :
                    'bg-gray-100 border-gray-300 text-gray-400'
                  }`}>
                    {isCompleted ? <CheckCircle className="h-6 w-6" /> : <step.icon className="h-6 w-6" />}
                  </div>
                  <div className="mt-2 text-center">
                    <div className={`text-sm font-medium ${isCurrent ? 'text-ski-blue' : 'text-gray-600'}`}>
                      {step.title}
                    </div>
                    <div className="text-xs text-gray-500 max-w-20">
                      {step.description}
                    </div>
                  </div>
                </div>
                {index < registrationSteps.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-4 ${
                    step.step < currentStep ? 'bg-green-500' : 'bg-gray-200'
                  }`}></div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {currentStep === 1 && (
        <div className="relative z-10">
          {/* 可报名比赛列表 */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-ski-navy mb-6">选择比赛项目</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {availableCompetitions.map((competition) => {
                const StatusConfig = statusConfig[competition.status as keyof typeof statusConfig]
                const availableSpots = competition.maxParticipants - competition.currentParticipants
                const fillPercentage = (competition.currentParticipants / competition.maxParticipants) * 100

                return (
                  <div key={competition.id} className="card hover:shadow-lg transition-shadow duration-200">
                    {/* 比赛图片 */}
                    <div className="relative h-48 rounded-lg overflow-hidden mb-4">
                      <img
                        src={competition.image}
                        alt={competition.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-3 left-3">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${StatusConfig.color}`}>
                          <StatusConfig.icon className="h-3 w-3 mr-1" />
                          {StatusConfig.label}
                        </span>
                      </div>
                      <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm rounded-lg px-2 py-1 text-white text-sm">
                        ¥{competition.fee}
                      </div>
                      <div className="absolute bottom-3 left-3 right-3">
                        <div className="bg-black/50 backdrop-blur-sm rounded-lg p-2 text-white">
                          <h3 className="font-bold text-lg truncate">{competition.name}</h3>
                          <div className="text-sm opacity-90">{competition.discipline}</div>
                        </div>
                      </div>
                    </div>

                    {/* 比赛信息 */}
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                          <span className="text-gray-600">{competition.date}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 text-gray-400 mr-2" />
                          <span className="text-gray-600">截止: {competition.deadline}</span>
                        </div>
                      </div>

                      <div className="flex items-center text-sm">
                        <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-gray-600">{competition.location}</span>
                      </div>

                      {/* 报名进度 */}
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-600">报名进度</span>
                          <span className="text-gray-600">
                            {competition.currentParticipants}/{competition.maxParticipants}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${
                              fillPercentage > 90 ? 'bg-red-500' :
                              fillPercentage > 70 ? 'bg-yellow-500' :
                              'bg-green-500'
                            }`}
                            style={{ width: `${fillPercentage}%` }}
                          ></div>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          剩余名额: {availableSpots}
                        </div>
                      </div>

                      {/* 参赛要求 */}
                      <div>
                        <h4 className="text-sm font-semibold text-gray-900 mb-2">参赛要求:</h4>
                        <ul className="text-xs text-gray-600 space-y-1">
                          {competition.requirements.map((req, index) => (
                            <li key={index} className="flex items-center">
                              <CheckCircle className="h-3 w-3 text-green-500 mr-1 flex-shrink-0" />
                              {req}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* 报名按钮 */}
                      <button
                        onClick={() => handleCompetitionSelect(competition.id)}
                        disabled={competition.status === 'full' || competition.status === 'closed'}
                        className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {competition.status === 'full' ? '已满员' :
                         competition.status === 'closed' ? '报名截止' :
                         '立即报名'}
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* 报名须知 */}
          <div className="card bg-blue-50 border-blue-200">
            <div className="flex items-start">
              <Info className="h-6 w-6 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold text-blue-900 mb-3">报名须知</h3>
                <ul className="space-y-2 text-sm text-blue-800">
                  <li>• 报名费用一经缴纳，不可退款，请谨慎选择</li>
                  <li>• 所有参赛者必须购买意外伤害保险</li>
                  <li>• 未满18周岁选手需监护人签署同意书</li>
                  <li>• 比赛期间必须佩戴安全头盔和护具</li>
                  <li>• 如遇恶劣天气，组委会有权调整比赛时间</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {currentStep === 2 && selectedCompetition && (
        <div className="relative z-10">
          {/* 报名表单 */}
          <div className="card">
            <h2 className="text-2xl font-bold text-ski-navy mb-6">填写报名信息</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* 个人信息 */}
              <div>
                <h3 className="text-lg font-semibold text-ski-navy mb-4">个人信息</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">姓名 *</label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ski-blue"
                        placeholder="请输入真实姓名"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">性别 *</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ski-blue">
                        <option value="">请选择</option>
                        <option value="male">男</option>
                        <option value="female">女</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">年龄 *</label>
                      <input
                        type="number"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ski-blue"
                        placeholder="请输入年龄"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">国籍</label>
                      <input
                        type="text"
                        value="CHN"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                        readOnly
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">所在地区 *</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ski-blue">
                      <option value="">请选择地区</option>
                      <option value="beijing">北京</option>
                      <option value="hebei">河北</option>
                      <option value="heilongjiang">黑龙江</option>
                      <option value="jilin">吉林</option>
                      <option value="liaoning">辽宁</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">FIS代码</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ski-blue"
                      placeholder="如有FIS注册号请填写"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">手机号码 *</label>
                      <input
                        type="tel"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ski-blue"
                        placeholder="请输入手机号码"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">电子邮箱 *</label>
                      <input
                        type="email"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ski-blue"
                        placeholder="请输入电子邮箱"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">紧急联系人 *</label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ski-blue"
                        placeholder="联系人姓名"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">联系人电话 *</label>
                      <input
                        type="tel"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ski-blue"
                        placeholder="联系人电话"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* 竞技信息 */}
              <div>
                <h3 className="text-lg font-semibold text-ski-navy mb-4">竞技信息</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">参赛项目 *</label>
                    <input
                      type="text"
                      value={availableCompetitions.find(c => c.id === selectedCompetition)?.discipline || ''}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                      readOnly
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">所属俱乐部/团队 *</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ski-blue"
                      placeholder="请输入俱乐部或团队名称"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">教练姓名</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ski-blue"
                      placeholder="请输入教练姓名"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">参赛经验 *</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ski-blue">
                      <option value="">请选择</option>
                      <option value="beginner">初学者（1年以下）</option>
                      <option value="intermediate">中级（1-3年）</option>
                      <option value="advanced">高级（3-5年）</option>
                      <option value="expert">专业级（5年以上）</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">个人最佳成绩</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ski-blue"
                      placeholder="如: 2024全国锦标赛第5名"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">健康状况及特殊说明</label>
                    <textarea
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ski-blue"
                      placeholder="如有伤病史、过敏史或其他需要注意的健康问题请详细说明"
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>

            {/* 文件上传 */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-ski-navy mb-4">文件上传</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-ski-blue transition-colors">
                  <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <div className="text-sm font-medium text-gray-700">身份证件 *</div>
                  <div className="text-xs text-gray-500">支持JPG、PNG格式</div>
                </div>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-ski-blue transition-colors">
                  <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <div className="text-sm font-medium text-gray-700">FIS执照</div>
                  <div className="text-xs text-gray-500">如有请上传</div>
                </div>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-ski-blue transition-colors">
                  <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <div className="text-sm font-medium text-gray-700">保险证明 *</div>
                  <div className="text-xs text-gray-500">运动意外险</div>
                </div>
              </div>
            </div>

            {/* 确认条款 */}
            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-start space-x-3">
                <input type="checkbox" className="mt-1" />
                <div className="text-sm text-gray-700">
                  <p className="font-medium mb-2">确认与同意</p>
                  <ul className="space-y-1 text-xs">
                    <li>• 我确认以上填写的信息真实有效，如有虚假信息愿承担相应责任</li>
                    <li>• 我已阅读并同意《参赛协议》和《免责声明》</li>
                    <li>• 我了解比赛的风险性，自愿参加并承担相应风险</li>
                    <li>• 我同意组委会使用我的比赛照片和视频用于宣传推广</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 操作按钮 */}
            <div className="flex justify-between mt-8">
              <button
                onClick={() => setCurrentStep(1)}
                className="btn-secondary"
              >
                返回选择比赛
              </button>
              <button
                onClick={() => setCurrentStep(3)}
                className="btn-primary"
              >
                提交资格审查
              </button>
            </div>
          </div>
        </div>
      )}

      {currentStep === 3 && (
        <div className="relative z-10">
          {/* 资格审查中 */}
          <div className="card text-center">
            <Shield className="h-16 w-16 text-ski-blue mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-ski-navy mb-4">资格审查中</h2>
            <p className="text-gray-600 mb-6">
              您的报名信息已提交，我们正在进行资格审查。审查通过后将进入缴费环节。
            </p>

            <div className="bg-blue-50 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-blue-900 mb-2">审查状态</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span>个人信息验证</span>
                  <CheckCircle className="h-4 w-4 text-green-500" />
                </div>
                <div className="flex items-center justify-between">
                  <span>参赛资格检查</span>
                  <div className="w-4 h-4 border-2 border-ski-blue border-t-transparent rounded-full animate-spin"></div>
                </div>
                <div className="flex items-center justify-between">
                  <span>文件材料审核</span>
                  <Clock className="h-4 w-4 text-gray-400" />
                </div>
              </div>
            </div>

            <p className="text-sm text-gray-500">
              预计审查时间: 1-2个工作日<br />
              如有问题我们会通过手机或邮箱联系您
            </p>
          </div>
        </div>
      )}
    </div>
  )
}