'use client'

import { useState } from 'react'
import { getImagePath } from '@/utils/paths'
import {
  User,
  Calendar,
  MapPin,
  CreditCard,
  Check,
  Upload,
  FileText,
  Trophy,
  AlertCircle,
  Plus,
  X
} from 'lucide-react'

interface RegistrationForm {
  personalInfo: {
    name: string
    gender: string
    birthDate: string
    nationality: string
    region: string
    phone: string
    email: string
    fisCode: string
  }
  eventInfo: {
    competition: string
    disciplines: string[]
    category: string
    level: string
  }
  emergencyContact: {
    name: string
    relationship: string
    phone: string
  }
  documents: File[]
  specialRequests: string
}

const mockCompetitions = [
  {
    id: '1',
    name: '2024全国高山滑雪锦标赛',
    date: '2024-12-20~2024-12-22',
    location: '长白山万达滑雪场',
    fee: 1200,
    disciplines: ['大回转', '回转', '速降', '超级大回转'],
    categories: ['男子成年组', '女子成年组', '男子青年组', '女子青年组', '男子少年组', '女子少年组']
  },
  {
    id: '2',
    name: '北京市青少年滑雪公开赛',
    date: '2024-12-15',
    location: '北京南山滑雪场',
    fee: 800,
    disciplines: ['大回转', '回转'],
    categories: ['男子青年组', '女子青年组', '男子少年组', '女子少年组']
  }
]

export default function OnlineRegistrationPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [form, setForm] = useState<RegistrationForm>({
    personalInfo: {
      name: '',
      gender: '',
      birthDate: '',
      nationality: 'CHN',
      region: '',
      phone: '',
      email: '',
      fisCode: ''
    },
    eventInfo: {
      competition: '',
      disciplines: [],
      category: '',
      level: ''
    },
    emergencyContact: {
      name: '',
      relationship: '',
      phone: ''
    },
    documents: [],
    specialRequests: ''
  })

  const updatePersonalInfo = (field: string, value: string) => {
    setForm(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value }
    }))
  }

  const updateEventInfo = (field: string, value: any) => {
    setForm(prev => ({
      ...prev,
      eventInfo: { ...prev.eventInfo, [field]: value }
    }))
  }

  const updateEmergencyContact = (field: string, value: string) => {
    setForm(prev => ({
      ...prev,
      emergencyContact: { ...prev.emergencyContact, [field]: value }
    }))
  }

  const toggleDiscipline = (discipline: string) => {
    setForm(prev => ({
      ...prev,
      eventInfo: {
        ...prev.eventInfo,
        disciplines: prev.eventInfo.disciplines.includes(discipline)
          ? prev.eventInfo.disciplines.filter(d => d !== discipline)
          : [...prev.eventInfo.disciplines, discipline]
      }
    }))
  }

  const selectedCompetition = mockCompetitions.find(c => c.id === form.eventInfo.competition)
  const totalFee = selectedCompetition ? selectedCompetition.fee * form.eventInfo.disciplines.length : 0

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1)
  }

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  const submitRegistration = () => {
    alert('报名提交成功！我们将在24小时内审核并通知您。')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-ski-blue/10 to-white py-8 relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute top-0 right-0 w-40 h-40 opacity-15 rounded-full overflow-hidden">
        <img src={getImagePath("/images/ski-action-2.jpg")} alt="" className="w-full h-full object-cover" />
      </div>
      <div className="absolute bottom-20 left-10 w-32 h-32 opacity-15 rounded-full overflow-hidden">
        <img src={getImagePath("/images/giant-slalom.jpg")} alt="" className="w-full h-full object-cover" />
      </div>

      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        {/* 页面标题 */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-ski-navy mb-4">在线报名</h1>
          <p className="text-gray-600 text-lg">高山滑雪竞赛报名系统</p>
        </div>

        {/* 步骤指示器 */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-4">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold ${
                  step <= currentStep ? 'bg-ski-blue text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  {step < currentStep ? <Check className="h-5 w-5" /> : step}
                </div>
                {step < 4 && (
                  <div className={`w-12 h-1 mx-2 ${
                    step < currentStep ? 'bg-ski-blue' : 'bg-gray-200'
                  }`}></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 表单内容 */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* 步骤1: 个人信息 */}
          {currentStep === 1 && (
            <div>
              <div className="flex items-center mb-6">
                <User className="h-6 w-6 text-ski-blue mr-2" />
                <h2 className="text-2xl font-bold text-ski-navy">个人信息</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">姓名 *</label>
                  <input
                    type="text"
                    value={form.personalInfo.name}
                    onChange={(e) => updatePersonalInfo('name', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-ski-blue focus:border-transparent"
                    placeholder="请输入真实姓名"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">性别 *</label>
                  <select
                    value={form.personalInfo.gender}
                    onChange={(e) => updatePersonalInfo('gender', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-ski-blue focus:border-transparent"
                  >
                    <option value="">请选择</option>
                    <option value="male">男</option>
                    <option value="female">女</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">出生日期 *</label>
                  <input
                    type="date"
                    value={form.personalInfo.birthDate}
                    onChange={(e) => updatePersonalInfo('birthDate', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-ski-blue focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">所属地区 *</label>
                  <select
                    value={form.personalInfo.region}
                    onChange={(e) => updatePersonalInfo('region', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-ski-blue focus:border-transparent"
                  >
                    <option value="">请选择地区</option>
                    <option value="黑龙江">黑龙江</option>
                    <option value="吉林">吉林</option>
                    <option value="北京">北京</option>
                    <option value="河北">河北</option>
                    <option value="内蒙古">内蒙古</option>
                    <option value="新疆">新疆</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">联系电话 *</label>
                  <input
                    type="tel"
                    value={form.personalInfo.phone}
                    onChange={(e) => updatePersonalInfo('phone', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-ski-blue focus:border-transparent"
                    placeholder="请输入手机号码"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">电子邮箱 *</label>
                  <input
                    type="email"
                    value={form.personalInfo.email}
                    onChange={(e) => updatePersonalInfo('email', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-ski-blue focus:border-transparent"
                    placeholder="请输入邮箱地址"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">FIS编号（如有）</label>
                  <input
                    type="text"
                    value={form.personalInfo.fisCode}
                    onChange={(e) => updatePersonalInfo('fisCode', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-ski-blue focus:border-transparent"
                    placeholder="请输入FIS编号"
                  />
                </div>
              </div>
            </div>
          )}

          {/* 步骤2: 比赛信息 */}
          {currentStep === 2 && (
            <div>
              <div className="flex items-center mb-6">
                <Trophy className="h-6 w-6 text-ski-blue mr-2" />
                <h2 className="text-2xl font-bold text-ski-navy">比赛信息</h2>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">选择比赛 *</label>
                  <div className="space-y-3">
                    {mockCompetitions.map((comp) => (
                      <div key={comp.id} className="border border-gray-200 rounded-lg p-4">
                        <label className="flex items-start cursor-pointer">
                          <input
                            type="radio"
                            name="competition"
                            value={comp.id}
                            checked={form.eventInfo.competition === comp.id}
                            onChange={(e) => updateEventInfo('competition', e.target.value)}
                            className="mt-1 mr-3"
                          />
                          <div className="flex-1">
                            <div className="font-semibold text-ski-navy">{comp.name}</div>
                            <div className="text-sm text-gray-600 mt-1">
                              <div className="flex items-center mb-1">
                                <Calendar className="h-4 w-4 mr-1" />
                                {comp.date}
                              </div>
                              <div className="flex items-center mb-1">
                                <MapPin className="h-4 w-4 mr-1" />
                                {comp.location}
                              </div>
                              <div className="flex items-center">
                                <CreditCard className="h-4 w-4 mr-1" />
                                报名费: ¥{comp.fee}/项目
                              </div>
                            </div>
                          </div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {selectedCompetition && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">参赛项目 *</label>
                      <div className="grid grid-cols-2 gap-3">
                        {selectedCompetition.disciplines.map((discipline) => (
                          <label key={discipline} className="flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={form.eventInfo.disciplines.includes(discipline)}
                              onChange={() => toggleDiscipline(discipline)}
                              className="mr-2"
                            />
                            <span>{discipline}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">参赛组别 *</label>
                      <select
                        value={form.eventInfo.category}
                        onChange={(e) => updateEventInfo('category', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-ski-blue focus:border-transparent"
                      >
                        <option value="">请选择组别</option>
                        {selectedCompetition.categories.map((category) => (
                          <option key={category} value={category}>{category}</option>
                        ))}
                      </select>
                    </div>

                    {form.eventInfo.disciplines.length > 0 && (
                      <div className="bg-ski-ice rounded-lg p-4">
                        <h4 className="font-semibold text-ski-navy mb-2">费用明细</h4>
                        <div className="space-y-2 text-sm">
                          {form.eventInfo.disciplines.map((discipline) => (
                            <div key={discipline} className="flex justify-between">
                              <span>{discipline}</span>
                              <span>¥{selectedCompetition.fee}</span>
                            </div>
                          ))}
                          <div className="border-t pt-2 font-semibold flex justify-between">
                            <span>总费用</span>
                            <span className="text-ski-blue">¥{totalFee}</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          )}

          {/* 步骤3: 紧急联系人 */}
          {currentStep === 3 && (
            <div>
              <div className="flex items-center mb-6">
                <AlertCircle className="h-6 w-6 text-ski-blue mr-2" />
                <h2 className="text-2xl font-bold text-ski-navy">紧急联系人</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">联系人姓名 *</label>
                  <input
                    type="text"
                    value={form.emergencyContact.name}
                    onChange={(e) => updateEmergencyContact('name', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-ski-blue focus:border-transparent"
                    placeholder="请输入紧急联系人姓名"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">关系 *</label>
                  <select
                    value={form.emergencyContact.relationship}
                    onChange={(e) => updateEmergencyContact('relationship', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-ski-blue focus:border-transparent"
                  >
                    <option value="">请选择关系</option>
                    <option value="父亲">父亲</option>
                    <option value="母亲">母亲</option>
                    <option value="配偶">配偶</option>
                    <option value="兄弟">兄弟</option>
                    <option value="姐妹">姐妹</option>
                    <option value="朋友">朋友</option>
                    <option value="其他">其他</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">联系电话 *</label>
                  <input
                    type="tel"
                    value={form.emergencyContact.phone}
                    onChange={(e) => updateEmergencyContact('phone', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-ski-blue focus:border-transparent"
                    placeholder="请输入紧急联系人电话"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">特殊要求或备注</label>
                  <textarea
                    value={form.specialRequests}
                    onChange={(e) => setForm(prev => ({ ...prev, specialRequests: e.target.value }))}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-ski-blue focus:border-transparent"
                    placeholder="如有特殊饮食要求、医疗状况等请在此说明"
                  />
                </div>
              </div>
            </div>
          )}

          {/* 步骤4: 确认信息 */}
          {currentStep === 4 && (
            <div>
              <div className="flex items-center mb-6">
                <FileText className="h-6 w-6 text-ski-blue mr-2" />
                <h2 className="text-2xl font-bold text-ski-navy">确认信息</h2>
              </div>

              <div className="space-y-6">
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="font-semibold text-ski-navy mb-4">个人信息</h3>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div><span className="font-medium">姓名:</span> {form.personalInfo.name}</div>
                    <div><span className="font-medium">性别:</span> {form.personalInfo.gender === 'male' ? '男' : '女'}</div>
                    <div><span className="font-medium">出生日期:</span> {form.personalInfo.birthDate}</div>
                    <div><span className="font-medium">所属地区:</span> {form.personalInfo.region}</div>
                    <div><span className="font-medium">联系电话:</span> {form.personalInfo.phone}</div>
                    <div><span className="font-medium">电子邮箱:</span> {form.personalInfo.email}</div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="font-semibold text-ski-navy mb-4">比赛信息</h3>
                  <div className="text-sm space-y-2">
                    <div><span className="font-medium">比赛:</span> {selectedCompetition?.name}</div>
                    <div><span className="font-medium">参赛项目:</span> {form.eventInfo.disciplines.join('、')}</div>
                    <div><span className="font-medium">参赛组别:</span> {form.eventInfo.category}</div>
                    <div><span className="font-medium">总费用:</span> <span className="text-ski-blue font-semibold">¥{totalFee}</span></div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="font-semibold text-ski-navy mb-4">紧急联系人</h3>
                  <div className="text-sm space-y-2">
                    <div><span className="font-medium">姓名:</span> {form.emergencyContact.name}</div>
                    <div><span className="font-medium">关系:</span> {form.emergencyContact.relationship}</div>
                    <div><span className="font-medium">电话:</span> {form.emergencyContact.phone}</div>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start">
                    <AlertCircle className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                    <div className="text-sm text-blue-800">
                      <p className="font-medium mb-1">重要提醒:</p>
                      <ul className="space-y-1">
                        <li>• 请确认所有信息准确无误</li>
                        <li>• 提交后将发送确认邮件到您的邮箱</li>
                        <li>• 报名费需在确认后3个工作日内支付</li>
                        <li>• 如需修改信息请联系组委会</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 按钮区域 */}
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              上一步
            </button>

            {currentStep < 4 ? (
              <button
                onClick={nextStep}
                className="px-6 py-2 bg-ski-blue text-white rounded-md hover:bg-ski-blue/90 transition-colors"
              >
                下一步
              </button>
            ) : (
              <button
                onClick={submitRegistration}
                className="px-8 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors font-semibold"
              >
                提交报名
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}