'use client'

import { useState } from 'react'
import { getImagePath } from '@/utils/paths'
import {
  Users,
  Search,
  Filter,
  Check,
  X,
  Eye,
  Edit,
  Download,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Mail,
  Phone
} from 'lucide-react'

interface Registration {
  id: string
  name: string
  gender: string
  age: number
  region: string
  phone: string
  email: string
  competition: string
  disciplines: string[]
  category: string
  status: 'pending' | 'approved' | 'rejected' | 'paid' | 'confirmed'
  submitDate: string
  paymentStatus: 'unpaid' | 'paid' | 'refunded'
  totalFee: number
  emergencyContact: {
    name: string
    phone: string
    relationship: string
  }
}

const mockRegistrations: Registration[] = [
  {
    id: 'REG001',
    name: '张伟',
    gender: 'male',
    age: 24,
    region: '黑龙江',
    phone: '138****1234',
    email: 'zhangwei@email.com',
    competition: '2024全国高山滑雪锦标赛',
    disciplines: ['大回转', '回转'],
    category: '男子成年组',
    status: 'confirmed',
    submitDate: '2024-12-10',
    paymentStatus: 'paid',
    totalFee: 2400,
    emergencyContact: {
      name: '张父',
      phone: '139****5678',
      relationship: '父亲'
    }
  },
  {
    id: 'REG002',
    name: '李雪',
    gender: 'female',
    age: 22,
    region: '吉林',
    phone: '187****9876',
    email: 'lixue@email.com',
    competition: '2024全国高山滑雪锦标赛',
    disciplines: ['大回转'],
    category: '女子成年组',
    status: 'approved',
    submitDate: '2024-12-12',
    paymentStatus: 'unpaid',
    totalFee: 1200,
    emergencyContact: {
      name: '李母',
      phone: '186****4321',
      relationship: '母亲'
    }
  },
  {
    id: 'REG003',
    name: '王强',
    gender: 'male',
    age: 17,
    region: '北京',
    phone: '150****2468',
    email: 'wangqiang@email.com',
    competition: '北京市青少年滑雪公开赛',
    disciplines: ['回转'],
    category: '男子青年组',
    status: 'pending',
    submitDate: '2024-12-14',
    paymentStatus: 'unpaid',
    totalFee: 800,
    emergencyContact: {
      name: '王父',
      phone: '151****1357',
      relationship: '父亲'
    }
  }
]

const statusConfig = {
  pending: { label: '待审核', color: 'bg-yellow-100 text-yellow-800', icon: Clock },
  approved: { label: '已通过', color: 'bg-green-100 text-green-800', icon: CheckCircle },
  rejected: { label: '已拒绝', color: 'bg-red-100 text-red-800', icon: XCircle },
  paid: { label: '已付费', color: 'bg-blue-100 text-blue-800', icon: CheckCircle },
  confirmed: { label: '已确认', color: 'bg-purple-100 text-purple-800', icon: CheckCircle }
}

const paymentStatusConfig = {
  unpaid: { label: '未付费', color: 'text-red-600' },
  paid: { label: '已付费', color: 'text-green-600' },
  refunded: { label: '已退费', color: 'text-gray-600' }
}

export default function RegistrationManagePage() {
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [selectedCompetition, setSelectedCompetition] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedRegistration, setSelectedRegistration] = useState<Registration | null>(null)

  const filteredRegistrations = mockRegistrations.filter(reg => {
    const matchStatus = selectedStatus === 'all' || reg.status === selectedStatus
    const matchCompetition = selectedCompetition === 'all' || reg.competition === selectedCompetition
    const matchSearch = reg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       reg.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       reg.email.toLowerCase().includes(searchTerm.toLowerCase())
    return matchStatus && matchCompetition && matchSearch
  })

  const updateRegistrationStatus = (regId: string, newStatus: Registration['status']) => {
    // 实际应用中这里会调用API
    alert(`报名 ${regId} 状态已更新为: ${statusConfig[newStatus].label}`)
  }

  const sendNotification = (regId: string, type: 'email' | 'sms') => {
    alert(`已发送${type === 'email' ? '邮件' : '短信'}通知给报名 ${regId}`)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
      {/* 背景装饰 */}
      <div className="absolute top-0 right-0 w-40 h-40 opacity-15 rounded-full overflow-hidden">
        <img src={getImagePath("/images/ski-action-2.jpg")} alt="" className="w-full h-full object-cover" />
      </div>
      <div className="absolute bottom-20 left-10 w-32 h-32 opacity-15 rounded-full overflow-hidden">
        <img src={getImagePath("/images/giant-slalom.jpg")} alt="" className="w-full h-full object-cover" />
      </div>

      {/* Header */}
      <div className="text-center mb-8 relative z-10">
        <h1 className="section-title">报名管理</h1>
        <p className="text-gray-600 text-lg">管理和审核竞赛报名申请</p>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8 relative z-10">
        <div className="card text-center">
          <Users className="h-8 w-8 text-ski-blue mx-auto mb-2" />
          <div className="text-2xl font-bold text-ski-navy">
            {mockRegistrations.length}
          </div>
          <div className="text-sm text-gray-600">总报名人数</div>
        </div>
        <div className="card text-center">
          <Clock className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-ski-navy">
            {mockRegistrations.filter(r => r.status === 'pending').length}
          </div>
          <div className="text-sm text-gray-600">待审核</div>
        </div>
        <div className="card text-center">
          <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-ski-navy">
            {mockRegistrations.filter(r => r.status === 'confirmed').length}
          </div>
          <div className="text-sm text-gray-600">已确认</div>
        </div>
        <div className="card text-center">
          <AlertCircle className="h-8 w-8 text-red-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-ski-navy">
            {mockRegistrations.filter(r => r.paymentStatus === 'unpaid').length}
          </div>
          <div className="text-sm text-gray-600">未付费</div>
        </div>
      </div>

      {/* 筛选和搜索 */}
      <div className="card mb-8 relative z-10">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">筛选条件:</span>
          </div>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ski-blue"
          >
            <option value="all">全部状态</option>
            <option value="pending">待审核</option>
            <option value="approved">已通过</option>
            <option value="rejected">已拒绝</option>
            <option value="paid">已付费</option>
            <option value="confirmed">已确认</option>
          </select>

          <select
            value={selectedCompetition}
            onChange={(e) => setSelectedCompetition(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ski-blue"
          >
            <option value="all">全部比赛</option>
            <option value="2024全国高山滑雪锦标赛">2024全国高山滑雪锦标赛</option>
            <option value="北京市青少年滑雪公开赛">北京市青少年滑雪公开赛</option>
          </select>

          <div className="relative flex-1 max-w-md">
            <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="搜索姓名、编号或邮箱..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ski-blue"
            />
          </div>

          <button className="btn-secondary flex items-center">
            <Download className="h-4 w-4 mr-2" />
            导出数据
          </button>
        </div>
      </div>

      {/* 报名列表 */}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden relative z-10">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  报名信息
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  比赛项目
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  状态
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  费用
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  提交时间
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  操作
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredRegistrations.map((registration) => {
                const StatusConfig = statusConfig[registration.status]
                const PaymentConfig = paymentStatusConfig[registration.paymentStatus]

                return (
                  <tr key={registration.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-ski-blue flex items-center justify-center text-white font-semibold">
                            {registration.name.charAt(0)}
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {registration.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {registration.id} • {registration.region}
                          </div>
                          <div className="text-xs text-gray-400">
                            {registration.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {registration.competition}
                      </div>
                      <div className="text-sm text-gray-500">
                        {registration.disciplines.join('、')} • {registration.category}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${StatusConfig.color}`}>
                        <StatusConfig.icon className="h-3 w-3 mr-1" />
                        {StatusConfig.label}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        ¥{registration.totalFee}
                      </div>
                      <div className={`text-xs ${PaymentConfig.color}`}>
                        {PaymentConfig.label}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {registration.submitDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                      <button
                        onClick={() => setSelectedRegistration(registration)}
                        className="text-ski-blue hover:text-ski-blue/80"
                      >
                        <Eye className="h-4 w-4" />
                      </button>

                      {registration.status === 'pending' && (
                        <>
                          <button
                            onClick={() => updateRegistrationStatus(registration.id, 'approved')}
                            className="text-green-600 hover:text-green-800"
                            title="通过审核"
                          >
                            <Check className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => updateRegistrationStatus(registration.id, 'rejected')}
                            className="text-red-600 hover:text-red-800"
                            title="拒绝申请"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </>
                      )}

                      <button
                        onClick={() => sendNotification(registration.id, 'email')}
                        className="text-blue-600 hover:text-blue-800"
                        title="发送邮件"
                      >
                        <Mail className="h-4 w-4" />
                      </button>

                      <button
                        onClick={() => sendNotification(registration.id, 'sms')}
                        className="text-purple-600 hover:text-purple-800"
                        title="发送短信"
                      >
                        <Phone className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 详情弹窗 */}
      {selectedRegistration && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-ski-navy">报名详情</h3>
                <button
                  onClick={() => setSelectedRegistration(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">基本信息</h4>
                    <div className="space-y-2 text-sm">
                      <div><span className="text-gray-500">姓名:</span> {selectedRegistration.name}</div>
                      <div><span className="text-gray-500">性别:</span> {selectedRegistration.gender === 'male' ? '男' : '女'}</div>
                      <div><span className="text-gray-500">年龄:</span> {selectedRegistration.age}岁</div>
                      <div><span className="text-gray-500">地区:</span> {selectedRegistration.region}</div>
                      <div><span className="text-gray-500">电话:</span> {selectedRegistration.phone}</div>
                      <div><span className="text-gray-500">邮箱:</span> {selectedRegistration.email}</div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">比赛信息</h4>
                    <div className="space-y-2 text-sm">
                      <div><span className="text-gray-500">比赛:</span> {selectedRegistration.competition}</div>
                      <div><span className="text-gray-500">项目:</span> {selectedRegistration.disciplines.join('、')}</div>
                      <div><span className="text-gray-500">组别:</span> {selectedRegistration.category}</div>
                      <div><span className="text-gray-500">费用:</span> ¥{selectedRegistration.totalFee}</div>
                      <div><span className="text-gray-500">提交时间:</span> {selectedRegistration.submitDate}</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-3">紧急联系人</h4>
                  <div className="space-y-2 text-sm">
                    <div><span className="text-gray-500">姓名:</span> {selectedRegistration.emergencyContact.name}</div>
                    <div><span className="text-gray-500">关系:</span> {selectedRegistration.emergencyContact.relationship}</div>
                    <div><span className="text-gray-500">电话:</span> {selectedRegistration.emergencyContact.phone}</div>
                  </div>
                </div>

                <div className="flex space-x-3 pt-4 border-t">
                  <button
                    onClick={() => updateRegistrationStatus(selectedRegistration.id, 'approved')}
                    className="flex-1 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
                  >
                    通过审核
                  </button>
                  <button
                    onClick={() => updateRegistrationStatus(selectedRegistration.id, 'rejected')}
                    className="flex-1 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors"
                  >
                    拒绝申请
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}