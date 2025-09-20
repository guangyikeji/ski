'use client'

import { useState } from 'react'
import { getImagePath } from '@/utils/paths'
import {
  CreditCard,
  DollarSign,
  TrendingUp,
  Calendar,
  Search,
  Filter,
  Download,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  RefreshCw
} from 'lucide-react'

interface FeeRecord {
  id: string
  registrationId: string
  participantName: string
  competition: string
  disciplines: string[]
  amount: number
  paymentMethod: 'bank_transfer' | 'alipay' | 'wechat' | 'cash'
  status: 'pending' | 'paid' | 'refunded' | 'failed'
  paymentDate?: string
  transactionId?: string
  refundDate?: string
  refundReason?: string
}

const mockFeeRecords: FeeRecord[] = [
  {
    id: 'FEE001',
    registrationId: 'REG001',
    participantName: '张伟',
    competition: '2024全国高山滑雪锦标赛',
    disciplines: ['大回转', '回转'],
    amount: 2400,
    paymentMethod: 'bank_transfer',
    status: 'paid',
    paymentDate: '2024-12-11',
    transactionId: 'TXN001234567'
  },
  {
    id: 'FEE002',
    registrationId: 'REG002',
    participantName: '李雪',
    competition: '2024全国高山滑雪锦标赛',
    disciplines: ['大回转'],
    amount: 1200,
    paymentMethod: 'alipay',
    status: 'pending'
  },
  {
    id: 'FEE003',
    registrationId: 'REG003',
    participantName: '王强',
    competition: '北京市青少年滑雪公开赛',
    disciplines: ['回转'],
    amount: 800,
    paymentMethod: 'wechat',
    status: 'paid',
    paymentDate: '2024-12-14',
    transactionId: 'WX001234567'
  },
  {
    id: 'FEE004',
    registrationId: 'REG004',
    participantName: '刘敏',
    competition: '2024全国高山滑雪锦标赛',
    disciplines: ['速降'],
    amount: 1200,
    paymentMethod: 'bank_transfer',
    status: 'refunded',
    paymentDate: '2024-12-08',
    refundDate: '2024-12-13',
    refundReason: '因伤无法参赛',
    transactionId: 'TXN001234568'
  }
]

const statusConfig = {
  pending: { label: '待付费', color: 'bg-yellow-100 text-yellow-800', icon: Clock },
  paid: { label: '已付费', color: 'bg-green-100 text-green-800', icon: CheckCircle },
  refunded: { label: '已退费', color: 'bg-gray-100 text-gray-800', icon: RefreshCw },
  failed: { label: '付费失败', color: 'bg-red-100 text-red-800', icon: XCircle }
}

const paymentMethodConfig = {
  bank_transfer: '银行转账',
  alipay: '支付宝',
  wechat: '微信支付',
  cash: '现金'
}

export default function FeesManagePage() {
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [selectedMethod, setSelectedMethod] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedRecord, setSelectedRecord] = useState<FeeRecord | null>(null)

  const filteredRecords = mockFeeRecords.filter(record => {
    const matchStatus = selectedStatus === 'all' || record.status === selectedStatus
    const matchMethod = selectedMethod === 'all' || record.paymentMethod === selectedMethod
    const matchSearch = record.participantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       record.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       record.registrationId.toLowerCase().includes(searchTerm.toLowerCase())
    return matchStatus && matchMethod && matchSearch
  })

  // 统计数据
  const totalAmount = mockFeeRecords.reduce((sum, record) =>
    record.status === 'paid' ? sum + record.amount : sum, 0
  )
  const pendingAmount = mockFeeRecords.reduce((sum, record) =>
    record.status === 'pending' ? sum + record.amount : sum, 0
  )
  const refundedAmount = mockFeeRecords.reduce((sum, record) =>
    record.status === 'refunded' ? sum + record.amount : sum, 0
  )

  const processRefund = (recordId: string) => {
    const reason = prompt('请输入退费原因:')
    if (reason) {
      alert(`已处理退费申请: ${recordId}`)
    }
  }

  const sendPaymentReminder = (recordId: string) => {
    alert(`已发送付费提醒: ${recordId}`)
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
        <h1 className="section-title">费用管理</h1>
        <p className="text-gray-600 text-lg">管理报名费用收缴和退费处理</p>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8 relative z-10">
        <div className="card text-center">
          <DollarSign className="h-8 w-8 text-green-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-ski-navy">¥{totalAmount.toLocaleString()}</div>
          <div className="text-sm text-gray-600">已收费用</div>
        </div>
        <div className="card text-center">
          <Clock className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-ski-navy">¥{pendingAmount.toLocaleString()}</div>
          <div className="text-sm text-gray-600">待收费用</div>
        </div>
        <div className="card text-center">
          <RefreshCw className="h-8 w-8 text-gray-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-ski-navy">¥{refundedAmount.toLocaleString()}</div>
          <div className="text-sm text-gray-600">已退费用</div>
        </div>
        <div className="card text-center">
          <TrendingUp className="h-8 w-8 text-ski-blue mx-auto mb-2" />
          <div className="text-2xl font-bold text-ski-navy">
            {mockFeeRecords.length}
          </div>
          <div className="text-sm text-gray-600">费用记录</div>
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
            <option value="pending">待付费</option>
            <option value="paid">已付费</option>
            <option value="refunded">已退费</option>
            <option value="failed">付费失败</option>
          </select>

          <select
            value={selectedMethod}
            onChange={(e) => setSelectedMethod(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ski-blue"
          >
            <option value="all">全部方式</option>
            <option value="bank_transfer">银行转账</option>
            <option value="alipay">支付宝</option>
            <option value="wechat">微信支付</option>
            <option value="cash">现金</option>
          </select>

          <div className="relative flex-1 max-w-md">
            <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="搜索参赛者、编号..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ski-blue"
            />
          </div>

          <button className="btn-secondary flex items-center">
            <Download className="h-4 w-4 mr-2" />
            导出账单
          </button>
        </div>
      </div>

      {/* 费用记录列表 */}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden relative z-10">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  费用编号
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  参赛者信息
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  比赛项目
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  金额
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  支付方式
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  状态
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  支付时间
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  操作
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredRecords.map((record) => {
                const StatusConfig = statusConfig[record.status]

                return (
                  <tr key={record.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{record.id}</div>
                      <div className="text-sm text-gray-500">关联: {record.registrationId}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-8 w-8">
                          <div className="h-8 w-8 rounded-full bg-ski-blue flex items-center justify-center text-white text-sm font-semibold">
                            {record.participantName.charAt(0)}
                          </div>
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">
                            {record.participantName}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 truncate max-w-xs">
                        {record.competition}
                      </div>
                      <div className="text-sm text-gray-500">
                        {record.disciplines.join('、')}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-semibold text-gray-900">
                        ¥{record.amount.toLocaleString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {paymentMethodConfig[record.paymentMethod]}
                      </div>
                      {record.transactionId && (
                        <div className="text-xs text-gray-500">
                          {record.transactionId}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${StatusConfig.color}`}>
                        <StatusConfig.icon className="h-3 w-3 mr-1" />
                        {StatusConfig.label}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {record.paymentDate || '-'}
                      {record.refundDate && (
                        <div className="text-xs text-red-600">
                          退费: {record.refundDate}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                      <button
                        onClick={() => setSelectedRecord(record)}
                        className="text-ski-blue hover:text-ski-blue/80"
                        title="查看详情"
                      >
                        <Eye className="h-4 w-4" />
                      </button>

                      {record.status === 'pending' && (
                        <button
                          onClick={() => sendPaymentReminder(record.id)}
                          className="text-yellow-600 hover:text-yellow-800"
                          title="发送付费提醒"
                        >
                          <Calendar className="h-4 w-4" />
                        </button>
                      )}

                      {record.status === 'paid' && (
                        <button
                          onClick={() => processRefund(record.id)}
                          className="text-red-600 hover:text-red-800"
                          title="处理退费"
                        >
                          <RefreshCw className="h-4 w-4" />
                        </button>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 详情弹窗 */}
      {selectedRecord && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-lg w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-ski-navy">费用记录详情</h3>
                <button
                  onClick={() => setSelectedRecord(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <Eye className="h-6 w-6" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div><span className="text-gray-500">费用编号:</span> {selectedRecord.id}</div>
                  <div><span className="text-gray-500">报名编号:</span> {selectedRecord.registrationId}</div>
                  <div><span className="text-gray-500">参赛者:</span> {selectedRecord.participantName}</div>
                  <div><span className="text-gray-500">费用金额:</span> ¥{selectedRecord.amount}</div>
                  <div><span className="text-gray-500">支付方式:</span> {paymentMethodConfig[selectedRecord.paymentMethod]}</div>
                  <div><span className="text-gray-500">状态:</span> {statusConfig[selectedRecord.status].label}</div>
                </div>

                <div className="text-sm">
                  <div className="text-gray-500 mb-1">比赛信息:</div>
                  <div>{selectedRecord.competition}</div>
                  <div className="text-gray-600">{selectedRecord.disciplines.join('、')}</div>
                </div>

                {selectedRecord.paymentDate && (
                  <div className="text-sm">
                    <span className="text-gray-500">支付时间:</span> {selectedRecord.paymentDate}
                  </div>
                )}

                {selectedRecord.transactionId && (
                  <div className="text-sm">
                    <span className="text-gray-500">交易号:</span> {selectedRecord.transactionId}
                  </div>
                )}

                {selectedRecord.refundDate && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                    <div className="text-sm">
                      <div className="text-red-800 font-medium">退费信息</div>
                      <div className="text-red-700 mt-1">
                        <div>退费时间: {selectedRecord.refundDate}</div>
                        <div>退费原因: {selectedRecord.refundReason}</div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex space-x-3 pt-4 border-t">
                  {selectedRecord.status === 'pending' && (
                    <button
                      onClick={() => sendPaymentReminder(selectedRecord.id)}
                      className="flex-1 bg-yellow-600 text-white py-2 px-4 rounded-md hover:bg-yellow-700 transition-colors"
                    >
                      发送付费提醒
                    </button>
                  )}
                  {selectedRecord.status === 'paid' && (
                    <button
                      onClick={() => processRefund(selectedRecord.id)}
                      className="flex-1 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors"
                    >
                      处理退费
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}